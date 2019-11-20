import React from 'react';
import Intro from './components/Intro';
import Analyze from './components/Analyze';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {db: null};
  }

  componentDidMount() {
    (async () => {
      let db = await fetch('/db.json').then(res => res.json());
      this.setState({db: db});
    })();
  }

  render() {
    let { db } = this.state;
    let search = window.location.search;
    let selected = null;
    if(search && db) {
      let docNames = search.substring(1).split('-vs-');
      selected = [
        db.find(doc => doc.name == docNames[0]),
        db.find(doc => doc.name == docNames[1])
      ];
    }
    return (
      <div className="App">
        {!search && !selected && <Intro db={db} />}
        {selected && <Analyze selected={selected} />}
      </div>
    );
  }

}

export default App;
