import React, { useState } from 'react';

function Intro({ db }) {
  let [poemName, setPoemName] = useState('none');
  let [versions, setVersions] = useState([]);
  let poems = [];
  let docs = [];
  if(db) {
    for(let doc of db) {
      if(!poems.includes(doc.poem)) {
        poems.push(doc.poem);
      }
      if(doc.poem == poemName) {
        docs.push(doc);
      }
    }
  }
  let docOptions = [];
  for(let i = 0; i < docs.length; i++) {
    for(let j = i + 1; j < docs.length; j++) {
      let doc = docs[i];
      let doc2 = docs[j];
      docOptions.push(<option key={doc.name + doc2.name} value={doc.name + '--' + doc2.name}>{doc.translator} vs {doc2.translator}</option>);
    }
  }
  console.log(versions);
  return (
    <div id="wrapper" class="divided">
      <section class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
        <div class="content">
          <h1>Aletheia</h1>
          <p class="major">A high level translation comparison tool. {!db && '(Loading...)'}</p>
          <div class="fields">
            <div class="field">
              <label htmlFor="poem">Poem</label>
              <select name="poem" id="poem" onChange={(e) => setPoemName(e.target.value)}>
                <option value="">- Poem -</option>
                {poems.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <br />
            <div class="field">
              <label htmlFor="versions">Versions</label>
              <select name="versions" id="versions" onChange={(e) => {
                setVersions(e.target.value)
              }}>
                <option value="">- A vs. B -</option>
                {docOptions}
              </select>
            </div>
          </div>
          <br />
          <ul class="actions stacked">
            <li><a href={`/?${versions}`} class="button big wide smooth-scroll-middle">Analyze</a></li>
          </ul>
        </div>
        <div class="image">
          <img src="images/banner.jpg" alt="" />
        </div>
      </section>
    </div>
  );

}

export default Intro;
