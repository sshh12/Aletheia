import tempfile
import json
import os

CORE_NLP_ANNOTS = 'tokenize,ssplit,pos,lemma,ner,depparse,coref,quote'
CORE_NLP_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'stanford-corenlp-full-2018-10-05', '*'))
CORE_NLP_JAVA_ARGS = '-Xmx8g'


def run_corenlp(texts):

    temp_dir_file = tempfile.TemporaryFile(delete=False, suffix='.txt')
    temp_files = [tempfile.TemporaryFile(delete=False, suffix='.txt') for _ in texts]
    cleanup_fns = [temp.name for temp in temp_files] + [temp_dir_file.name]

    for i, text in enumerate(texts):
        temp_files[i].write(bytes(text, 'utf-8'))
        temp_dir_file.write(bytes(temp_files[i].name + '\n', 'utf-8'))
    for temp_file in temp_files + [temp_dir_file]:
        temp_file.close()

    cmd = 'java {} -cp "{}" edu.stanford.nlp.pipeline.StanfordCoreNLP  [ -annotators {} -outputFormat json ] -filelist {}'.format(CORE_NLP_JAVA_ARGS, CORE_NLP_PATH, CORE_NLP_ANNOTS, temp_dir_file.name)
    os.system(cmd)

    output = []
    for temp_file in temp_files:
        output_fn = os.path.basename(temp_file.name) + '.json'
        cleanup_fns.append(output_fn)
        with open(output_fn, 'r') as f:
            output.append(json.load(f))
    for fn in cleanup_fns:
        os.remove(fn)
    return output
    