import React, { useState } from 'react';

function heatHSL(val) {
  return `hsl(${55 + val}, 75%, 75%)`
}

function Analyze({ selected }) {
  console.log(selected);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <DocAnalyze doc={selected[0]} showHeader={true} />
        <DocAnalyze doc={selected[1]} />
      </div>
    </div>
  );
}

function DocAnalyze({ doc, showHeader }) {
  // let docSents = doc.sections.map(sec => sec.gcp.sent_score * sec.gcp.sent_mag);
  // let docSent = docSents.reduce((cum, cur) => cum + cur, 0) / docSents.length;
  // let docQuotes = doc.sections.map(sec => sec.corenlp.quotes).flat();
  let docSent = 0;
  // console.log(docQuotes);
  // console.log(docQuotes.map(x => x.canonicalSpeaker));
  return (
    <section class="banner style1">
      <div class="content" style={{height: '100%'}}>
        {showHeader ? <h1>{doc.poem} {doc.book}</h1> : <h1>&nbsp;</h1>}
        <h1 style={{fontSize: '2em'}}>{doc.translator}</h1>
        <p class="major">{doc.word_cnt} words</p>
        <i class="button solid" style={{backgroundColor: heatHSL(docSent * 60)}}>Sentiment: {docSent.toFixed(2)}</i>
        {doc.sections.map((section, i) => 
          <blockquote key={i} style={{borderLeftColor: heatHSL(/*section.gcp.sent_score * section.gcp.sent_mag * */60)}}>{section.text}</blockquote>)}
      </div>
    </section>
  );
}

export default Analyze;
