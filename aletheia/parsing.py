import re


def standardize_text(text):

    raw = text.replace('\r', '').replace('“', '\"')\
        .replace('”', '\"').replace('’', '\'').replace('–', '-')
    raw = re.sub('\n\s*\n', '\n\n', raw, flags=re.MULTILINE|re.DOTALL)
    raw = re.sub('\n{3,}', '\n\n', raw, flags=re.MULTILINE|re.DOTALL)

    lines = raw.split('\n')
    lines = [line.strip() for line in lines]
    lines = [re.sub(r'\s+\d+$', '', line) for line in lines]
    lines = [re.sub(r'\s+\[\d+\]$', '', line) for line in lines]
    lines = [re.sub(r'\s+\d+$', '', line) for line in lines]
    lines = [re.sub(r'^\[\d+\]\s+', '', line) for line in lines]

    parsed = '\n'.join(lines)
    parsed = re.sub('\n\n', '!TEMPTOKEN!', parsed, flags=re.MULTILINE|re.DOTALL)
    parsed = re.sub('\n', ' ', parsed, flags=re.MULTILINE|re.DOTALL)
    parsed = re.sub('!TEMPTOKEN!', '\n', parsed, flags=re.MULTILINE|re.DOTALL)
    parsed = re.sub(':\n', ': ', parsed, flags=re.MULTILINE|re.DOTALL)
    parsed = re.sub('\n"', ' \"', parsed, flags=re.MULTILINE|re.DOTALL)

    return parsed