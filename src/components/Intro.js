import React, { useState } from 'react';

function Intro({ db }) {
  let [poemName, setPoemName] = useState('none');
  let [versions, setVersions] = useState([]);
  let poems = [];
  let docs = [];
  if (db) {
    for (let doc of db) {
      if (!poems.includes(doc.poem)) {
        poems.push(doc.poem);
      }
      if (doc.poem == poemName) {
        docs.push(doc);
      }
    }
  }
  let docOptions = [];
  for (let i = 0; i < docs.length; i++) {
    for (let j = i + 1; j < docs.length; j++) {
      let doc = docs[i];
      let doc2 = docs[j];
      docOptions.push(<option key={doc.name + doc2.name} value={doc.name + '-vs-' + doc2.name}>{doc.translator} vs {doc2.translator}</option>);
    }
  }
  return (
    <div id="wrapper" className="divided">
      <section className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
        <div className="content">
          <h1>Aletheia</h1>
          <p className="major">An AI-powered epic translation comparison tool.</p>
          {!db && <p className="major"><i>Loading Archive...</i></p>}
          {db &&
            <div className="fields">
              <div className="field">
                <label htmlFor="poem">Poem</label>
                <select name="poem" id="poem" onChange={(e) => setPoemName(e.target.value)}>
                  <option value="">- Poem -</option>
                  {poems.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
              </div>
              <br />
              <div className="field">
                <label htmlFor="versions">Versions</label>
                <select name="versions" id="versions" onChange={(e) => {
                  setVersions(e.target.value)
                }}>
                  <option value="">- A vs. B -</option>
                  {docOptions}
                </select>
              </div>
            </div>}
          <br />
          {db && <ul className="actions stacked">
            <li><a href={`/?${versions}`} className="button big wide smooth-scroll-middle">Analyze</a></li>
          </ul>}
        </div>
        <div className="image">
          <img src="images/banner.jpg" alt="" />
        </div>
      </section>
    </div>
  );

}

export default Intro;
