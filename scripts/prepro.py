import sys; sys.path.append('..')
import os
import json
import glob

from aletheia import api, parsing


RAW_DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'db'))
PUBLIC_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public'))
BUILD_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'BUILD'))


def process_sections(raw_sections):
    gcp_results = api.run_google_cloud(raw_sections)
    textrazor_results =api.run_textrazor(raw_sections)
    allennlp_results = api.run_allennlp(raw_sections)
    return [
        dict(text=text, 
            gcp=gcp_results[i], 
            textrazor=textrazor_results[i], 
            allennlp=allennlp_results[i])
        for i, text in enumerate(raw_sections)
    ]


def process_doc(name, meta, raw_doc):
    poem, book, version = name.split('.')
    word_cnt = raw_doc.count(' ')
    section_cnt = raw_doc.count('\n')
    sections = process_sections(raw_doc.split('\n'))
    doc_data = dict(
        name=name, 
        poem=poem,
        book=book,
        translator=meta[0],
        version=version,
        word_cnt=word_cnt,
        section_cnt=section_cnt,
        sections=sections,
        corenlp=api.run_corenlp([raw_doc])[0],
        allennlp=api.run_allennlp([raw_doc])[0]
    )
    return doc_data


def process_all():
    docs = []
    aligners = {}
    for fn in glob.iglob(os.path.join(RAW_DB_PATH, '*.*.*.txt')):
        with open(fn, 'r', encoding='utf-8') as f:
            raw = f.read()
        with open(fn.replace('.txt', '.meta'), 'r', encoding='utf-8') as f:
            meta = f.read().strip().split('\n')
        parsed = parsing.standardize_text(raw)
        align_key = '.'.join(fn.split('.')[:2])
        if align_key not in aligners:
            aligners[align_key] = parsed
        else:
            parsed = parsing.realign(parsed, aligners[align_key])
        try:
            print('Processing ', fn)
            docs.append(process_doc(os.path.basename(fn.replace('.txt', '')), meta, parsed))
        except Exception as e:
            print(e)
    return docs


if __name__ == '__main__':
    db = process_all()
    with open(os.path.join(PUBLIC_PATH, 'db.json'), 'w') as f:
        json.dump(db, f, indent=2)
    if os.path.exists(BUILD_PATH):
        with open(os.path.join(BUILD_PATH, 'db.json'), 'w') as f:
            json.dump(db, f, indent=2)