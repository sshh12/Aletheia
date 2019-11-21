import React, { useState } from 'react';


const COMMON_WORDS = new Set([
  'the', 'and', 'of', 'to', 'with', 'her', 'in', 'a', 'his', 'i', 'she', 'my', 'from', 
  'on', 'you', 'that', 'he', 'your', 'for', 'is', '-', 'as', 'by', 'not', 'all', 'me', 
  'this', 'have', 'or', 'was', 'it', 'their', 'will', 'him', 'now', 'at', 'be', 'when', 
  'do', 'what', 'while', 'but', 'has', 'shall', 'were', 'are', 'through', '', 'there', 
  'one', 'out', 'these', 'so', 'had', 'nor', 'down', 'such', 'into', 'our', 'away', 
  'if', 'who', 'they', 'up', 'first', 'own', 'thus', 'spoke', 'whom', 'them', 'its', 
  'once', 'over', 'then', 'went', 'upon', 'said', 'may', 'we', 'which'
]);

const EMOTION_MAP = {
  sad: '😢',
  upset: '😩',
  angry: '😠',
  scared: '😨',
  hurt: '🤕',
  disappointed: '😞',
  pained: '😧',
  happy: '😄',
  excited: '🤩',
  satisfied: '😊',
  disgusted: '😒',
  dead: '💀',
  none: '',
  '@@UNKNOWN@@': ''
};
  

function heatHSL(val) {
  return `hsl(${55 + val}, 75%, 75%)`
}

function extractQuotes(doc) {
  let quotes = doc.corenlp.quotes;
  let secs = doc.sections;
  let quotesBySpeaker = {};
  for(let quote of quotes) {
    let sec = secs.find(sec => sec.text.includes(quote.text));
    if(!sec) {
      continue;
    }
    let startIdx = sec.gcp.sentences
      .findIndex(s => s.text.includes(quote.text.substring(0, 10)));
    let endIdx = sec.gcp.sentences
      .findIndex(s => s.text.includes(quote.text.substring(quote.text.length - 10)));
    if(startIdx == -1 || endIdx == -1) {
      continue;
    }
    let sumSent = 0;
    for(let i = startIdx; i <= endIdx; i++) {
      sumSent += sec.gcp.sentences[i].sent_score * sec.gcp.sentences[i].sent_mag;
    }
    quote.sent = sumSent / (endIdx - startIdx + 1);
    if(!(quote.speaker in quotesBySpeaker)) {
      quotesBySpeaker[quote.speaker] = [];
    }
    if(!(quote.canonicalSpeaker in quotesBySpeaker)) {
      quotesBySpeaker[quote.canonicalSpeaker] = [];
    }
    quotesBySpeaker[quote.speaker].push(quote);
    quotesBySpeaker[quote.canonicalSpeaker].push(quote);
  }
  let speakers = [];
  for(let speaker in quotesBySpeaker) {
    let quoteData = {
      name: speaker,
      quotes: quotesBySpeaker[speaker]
    };
    quoteData.sent = quoteData.quotes
      .map(quote => quote.sent)
      .reduce((acc, curr) => acc + curr * (1 / quoteData.quotes.length), 0);
    speakers.push(quoteData);
  }
  speakers.sort((a, b) => a.sent - b.sent);
  return speakers;
}

function topWords(doc) {
  let fullText = doc.sections.map(sec => sec.text).flat().join(' ').replace(/[\.!"'?,]/g, '').split(' ');
  let counts = {};
  fullText.forEach(val => counts[val] = (counts[val] || 0) + 1);
  let keys = Object.keys(counts);
  keys.sort((a, b) => counts[b] - counts[a]);
  let words = [];
  for(let idx = 0; words.length < 10 && idx < keys.length; idx++) {
    let word = keys[idx];
    if(COMMON_WORDS.has(word.toLowerCase())) {
      continue;
    }
    words.push({word: word, count: counts[word]});
  }
  return words;
}

function Analyze({ selected }) {
  let rowCnt = Math.min(selected[0].section_cnt, selected[1].section_cnt);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'baseline'}}>
        <DocAnalyze doc={selected[0]} otherDoc={selected[1]} showHeader={true} />
        <DocAnalyze doc={selected[1]} otherDoc={selected[0]} />
      </div>
      {[...Array(rowCnt).keys()].map(idx =>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'left' }}>
          <RowAnalyze key={idx} docs={selected} idx={idx} />
        </div>)}
    </div>
  );
}

function DocAnalyze({ doc, otherDoc, showHeader }) {
  let sumSent = doc.sections
    .map(sec => sec.gcp.sent_score * sec.gcp.sent_mag)
    .reduce((acc, curr) => acc + curr, 0);
  let docSent = sumSent / doc.sections.length;
  let speakers = extractQuotes(doc);
  let words = topWords(doc);
  let stats = [
    {name: 'Words', 
      val: doc.word_cnt, 
      otherVal: otherDoc.word_cnt},
    {name: 'Readability', 
      val: doc.readability.readabilitygrades.FleschReadingEase.toFixed(2),
      otherVal: otherDoc.readability.readabilitygrades.FleschReadingEase.toFixed(2)},
    {name: 'Words/Sentence', 
      val: doc.readability.sentenceinfo.words_per_sentence.toFixed(2),
      otherVal: otherDoc.readability.sentenceinfo.words_per_sentence.toFixed(2)},
    {name: 'Syllables/Word', 
      val: doc.readability.sentenceinfo.syll_per_word.toFixed(2),
      otherVal: otherDoc.readability.sentenceinfo.syll_per_word.toFixed(2)},
    {name: 'Letters/Word', 
      val: doc.readability.sentenceinfo.characters_per_word.toFixed(2),
      otherVal: otherDoc.readability.sentenceinfo.characters_per_word.toFixed(2)},
    {name: 'Complex Words', 
      val: doc.readability.sentenceinfo.complex_words,
      otherVal: otherDoc.readability.sentenceinfo.complex_words},
    {name: 'Type-Token Ratio', 
      val: doc.readability.sentenceinfo.type_token_ratio.toFixed(3),
      otherVal: otherDoc.readability.sentenceinfo.type_token_ratio.toFixed(3)}
  ];
  console.log(doc);
  return (
    <section className="banner style1" style={{ width: '45%' }}>
      <div className="content" style={{ paddingLeft: '0' }}>
        {showHeader ? <h1>{doc.poem} / {doc.book}</h1> : <h1>&nbsp;</h1>}
        <h1 style={{ fontSize: '2em' }}>{doc.translator}</h1>
        <span className="major">Total Sentiment: <b style={{color: heatHSL(docSent * 100)}}>{docSent.toFixed(2)}</b></span>
        <br />
        {stats.map(stat => [
          stat.val > stat.otherVal ? 
            <span className="major">{stat.name}: <b style={{fontWeight: '600'}}>{stat.val}</b></span> :
            <span className="major">{stat.name}: <b>{stat.val}</b></span>
          , <br />])}
        <br />
        <span>Sentiment by Quote Speaker:</span><br/>
        {speakers.map(speaker => <SpeakerBtn speaker={speaker}/>)}
        <br /><br />
        <span>Unique Words:</span><br/>
        {words.map(word => <WordBtn word={word} words={words} />)}
      </div>
    </section>
  );
}

function RowAnalyze({ idx, docs, key }) {
  let [docA, docB] = docs;
  let [secA, secB] = [docA.sections[idx], docB.sections[idx]];
  return [
    <TextBlock key={'a' + key} sec={secA} doc={docA} />,
    <TextBlock key={'b' + key} sec={secB} doc={docB} />
  ];
}

function TextBlock({ sec, key, doc }) {
  let sentiment = sec.gcp.sent_score * sec.gcp.sent_mag * 60;
  let text = sec.text;

  let event2Mind = sec.allennlp.event_to_mind.oreact_top_k_predicted_tokens;
  let event2MindProbs = sec.allennlp.event_to_mind.oreact_top_k_log_probabilities;
  let mindWords = [];
  if(event2Mind[0][0] != 'none') {
    for(let i in event2Mind) {
      if(event2MindProbs[i] > -3) {
        mindWords.push(EMOTION_MAP[event2Mind[i][0]]);
      }
    }
  }

  let qa_what_str = sec.allennlp.qa_what.best_span_str;
  let qa_why_str = sec.allennlp.qa_why.best_span_str;
  for(let item of [qa_what_str, qa_why_str]) {
    try {
      let regex = new RegExp(`\\b${item}\\b`);
      text = text.replace(regex, `<b>${item}</b>`);
    } catch(e) {}
  }

  for(let ent of sec.gcp.entities) {
    if(ent.salience < 0.01) {
      continue;
    }
    let sent = ent.sent_score * ent.sent_mag;
    let regex = new RegExp(`\\b${ent.name}\\b`);
    if(Math.abs(sent) > 0.5) {
      text = text.replace(regex, `<b style="color: ${heatHSL(sent * 60)}">${ent.name}</b>`);
    } else {
      text = text.replace(regex, `<b>${ent.name}</b>`);
    }
  }
  for(let ent of sec.textrazor) {
    let regex = new RegExp(`\\b${ent.text}\\b`);
    text = text.replace(regex, `<b>${ent.text}</b>`);
  }

  return (
    <section key={key} className="style1" style={{ width: '45%' }}>
      <div className="content">
        <blockquote style={{ borderLeftColor: heatHSL(sentiment), marginBottom: '0' }} dangerouslySetInnerHTML={{__html: text}}/>
        <span>{mindWords.join(' ')}</span>
      </div>
      <br />
    </section>
  );
}

function SpeakerBtn({ speaker }) {
  let [visable, setVisable] = useState(false);
  return (
    <div style={{display: 'inline-block', padding: '1.5px'}}>
      <i className="button small" style={{backgroundColor: heatHSL(speaker.sent * 160)}}
          onClick={() => setVisable(!visable)}>
        {speaker.name} ({speaker.quotes.length})
      </i>
      {visable && speaker.quotes.map((quote, idx) => 
        <blockquote key={idx} style={{ borderLeftColor: heatHSL(quote.sent * 60) }}>{quote.text}</blockquote>)}
    </div>
  );
}

function WordBtn({ word, words }) {
  let min = Math.min(...words.map(w => w.count));
  let max = Math.max(...words.map(w => w.count));
  return (
    <div style={{display: 'inline-block', padding: '1.5px'}}>
      <i className="button small" style={{backgroundColor: `hsla(180, 75%, 75%, ${(word.count - min) / max})`}}>
        {word.word} ({word.count})
      </i>
    </div>
  );
}

export default Analyze;
