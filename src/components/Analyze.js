import React, { useState } from 'react';

function Analyze({ selected }) {
  console.log(selected);
  let doc = selected[0];
  return (
    <div>
      <h1 style={{textAlign: 'left', padding: '16px 0px 0px 3rem'}}>{doc.poem}: {doc.book}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <DocAnalyze doc={selected[0]} />
        <DocAnalyze doc={selected[1]} />
      </div>
    </div>
  );
}

function DocAnalyze({ doc }) {
  return (
    <section class="banner style1">
      <div class="content" style={{height: '100%'}}>
        <h1 style={{fontSize: '2em'}}>{doc.translator}</h1>
        <p class="major">{doc.word_cnt} Words</p>
        {doc.sections.map((section, i) => 
          <blockquote key={i}>{section.text}</blockquote>)}
      </div>
    </section>
  );
}

export default Analyze;
