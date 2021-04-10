import logo from './logo.svg';
import './App.css';
import Welcome from './components/speechtotext'
import WorldCloud from './components/wordcloud'
import Dictaphone from './components/speechrecognition'


function App() {
  return (
    <div className="App">

      <h1>Welcome to BitCamp101</h1>
      <Welcome />
      <Dictaphone />
      <div>
        <p>hi</p>
      </div>
      <div class="grid-container">
        <div class="left">
          <p>left</p>
        </div>
        <div class="right">
          <p>right</p>
        </div>
      </div>
      <div class="wordcloud">
        <WorldCloud />
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
