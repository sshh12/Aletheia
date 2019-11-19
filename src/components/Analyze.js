import React, { useState } from 'react';

function heatHSL(val) {
  return `hsl(${55 + val}, 75%, 75%)`
}

function Analyze({ selected }) {
  console.log(selected);
  let rowCnt = Math.min(selected[0].section_cnt, selected[1].section_cnt);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <DocAnalyze doc={selected[0]} showHeader={true} />
        <DocAnalyze doc={selected[1]} />
      </div>
      {[...Array(rowCnt).keys()].map(idx =>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'left' }}>
          <RowAnalyze key={idx} docs={selected} idx={idx} />
        </div>)}
    </div>
  );
}

function DocAnalyze({ doc, showHeader }) {
  let sumSent = doc.sections
    .map(sec => sec.gcp.sent_score * sec.gcp.sent_mag)
    .reduce((acc, curr) => acc + curr, 0);
  let docSent = sumSent / doc.sections.length;
  return (
    <section className="banner style1" style={{ width: '45%' }}>
      <div className="content" style={{ paddingLeft: '0' }}>
        {showHeader ? <h1>{doc.poem} {doc.book}</h1> : <h1>&nbsp;</h1>}
        <h1 style={{ fontSize: '2em' }}>{doc.translator}</h1>
        <span className="major">Words: {doc.word_cnt} </span>
        <br />
        <span className="major">Sentiment: {docSent.toFixed(2)}</span>
      </div>
    </section>
  );
}

function RowAnalyze({ idx, docs, key }) {
  let [docA, docB] = docs;
  let [secA, secB] = [docA.sections[idx], docB.sections[idx]];
  return [
    <TextBlock key={'a' + key} sec={secA} />,
    <TextBlock key={'b' + key} sec={secB} />
  ];
}

function TextBlock({ sec, key }) {
  let sentiment = sec.gcp.sent_score * sec.gcp.sent_mag * 60;
  return (
    <section key={key} keyclassName="style1" style={{ width: '45%' }}>
      <div className="content">
        <blockquote style={{ borderLeftColor: heatHSL(sentiment) }}>{sec.text}</blockquote>
      </div>
    </section>
  );
}

export default Analyze;
