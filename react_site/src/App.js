import logo from './logo.svg';
import './App.css';
import Welcome from './components/speechtotext'
import WorldCloud from './components/wordcloud'

function App() {
  return (
    <div className="App">
      <h1>Welcome to BitCamp101</h1>
      <Welcome/>
      <div class="container">
        <div class="left">

        </div>
        <div class="right">

        </div>
      </div>
      <WorldCloud/>
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
