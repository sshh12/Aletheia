from google.cloud import language_v1 as language
from google.cloud.language_v1 import enums
from allennlp.predictors.predictor import Predictor
import syntok.segmenter as segmenter
import readability
import textrazor
import tempfile
import json
import os

CORE_NLP_ANNOTS = 'tokenize,ssplit,pos,lemma,ner,depparse,coref,quote'
CORE_NLP_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'stanford-corenlp-full-2018-10-05', '*'))

textrazor.api_key = os.environ.get('TEXTRAZOR_KEY', '')
textrazor_client = textrazor.TextRazor(extractors=['entities'])

gcp_client = language.LanguageServiceClient()

event2mind_predictor = Predictor.from_path("https://storage.googleapis.com/allennlp-public-models/event2mind-2018.10.26.tar.gz")
qa_predictor = Predictor.from_path("https://storage.googleapis.com/allennlp-public-models/bidaf-elmo-model-2018.11.30-charpad.tar.gz")
sent_predictor = Predictor.from_path("https://s3-us-west-2.amazonaws.com/allennlp/models/sst-2-basic-classifier-glove-2019.06.27.tar.gz")


def run_corenlp(texts, java_args='-Xmx8g'):

    temp_dir_file = tempfile.TemporaryFile(delete=False, suffix='.txt')
    temp_files = [tempfile.TemporaryFile(delete=False, suffix='.txt') for _ in texts]
    cleanup_fns = [temp.name for temp in temp_files] + [temp_dir_file.name]

    for i, text in enumerate(texts):
        temp_files[i].write(bytes(text, 'utf-8'))
        temp_dir_file.write(bytes(temp_files[i].name + '\n', 'utf-8'))
    for temp_file in temp_files + [temp_dir_file]:
        temp_file.close()

    cmd = 'java {} -cp "{}" edu.stanford.nlp.pipeline.StanfordCoreNLP  [ -annotators {} -outputFormat json ] -filelist {}'.format(java_args, CORE_NLP_PATH, CORE_NLP_ANNOTS, temp_dir_file.name)
    os.system(cmd)

    out = []
    for temp_file in temp_files:
        output_fn = os.path.basename(temp_file.name) + '.json'
        cleanup_fns.append(output_fn)
        with open(output_fn, 'r') as f:
            out.append(json.load(f))
    for fn in cleanup_fns:
        os.remove(fn)
    return out


def run_textrazor(texts):
    out = []
    for text in texts:
        resp = textrazor_client.analyze(text)
        out.append([
            dict(id=ent.id, relevance=ent.relevance_score, conf=ent.confidence_score, 
                freebase_types=ent.freebase_types, text=ent.matched_text, wiki=ent.wikipedia_link) 
            for ent in resp.entities()
        ])
    return out


def run_google_cloud(texts):
    out = []
    for text in texts:
        text_result = {}
        document = {'content': text, 'type': enums.Document.Type.PLAIN_TEXT, 'language': 'en'}
        doc_resp = gcp_client.analyze_sentiment(document, encoding_type=enums.EncodingType.UTF8)
        text_result['sent_score'] = doc_resp.document_sentiment.score
        text_result['sent_mag'] = doc_resp.document_sentiment.magnitude
        text_result['sentences'] = [
            dict(text=sen.text.content, sent_score=sen.sentiment.score, sent_mag=sen.sentiment.magnitude)
            for sen in doc_resp.sentences
        ]
        ent_resp = gcp_client.analyze_entity_sentiment(document, encoding_type=enums.EncodingType.UTF8)
        text_result['entities'] = [
            dict(name=ent.name, type=enums.Entity.Type(ent.type).name,
                salience=ent.salience, sent_score=ent.sentiment.score,
                sent_mag=ent.sentiment.magnitude, meta=list(ent.metadata.items()))
            for ent in ent_resp.entities
        ]
        out.append(text_result)
    return out


def run_allennlp(texts):
    out = []
    for text in texts:
        data = {}
        data['event_to_mind'] = event2mind_predictor.predict(source=text)
        data['qa_what'] = qa_predictor.predict(passage=text, question='What?')
        data['qa_why'] = qa_predictor.predict(passage=text, question='Why?')
        data['sent'] = sent_predictor.predict(sentence=text)
        out.append(data)
    return out


def run_readability(texts):
    out = []
    for text in texts:
        tokenized = '\n\n'.join(
            '\n'.join(
            ' '.join(token.value for token in sentence) 
            for sentence in paragraph) 
            for paragraph in segmenter.analyze(text))
        results = readability.getmeasures(tokenized, lang='en')
        data = {}
        for key in results:
            data[key.replace(' ', '')] = dict(results[key])
        out.append(data)
    return out