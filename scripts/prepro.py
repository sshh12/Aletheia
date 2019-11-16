import sys; sys.path.append('..')
import os
import json
import glob

from aletheia import api, parsing


RAW_DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'db'))
PUBLIC_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public'))


def process_sections(raw_sections):
    # gcp_results = api.run_google_cloud(raw_sections)
    return [
        dict(text=text)
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
        sections=sections
    )
    return doc_data


def process_all():
    docs = []
    for fn in glob.iglob(os.path.join(RAW_DB_PATH, '*.*.*.txt')):
        with open(fn, 'r', encoding='utf-8') as f:
            raw = f.read()
        with open(fn.replace('.txt', '.meta'), 'r', encoding='utf-8') as f:
            meta = f.read().strip().split('\n')
        parsed = parsing.standardize_text(raw)
        docs.append(process_doc(os.path.basename(fn.replace('.txt', '')), meta, parsed))
    return docs


if __name__ == '__main__':
    with open(os.path.join(PUBLIC_PATH, 'db.json'), 'w') as f:
        json.dump(process_all(), f, indent=2)