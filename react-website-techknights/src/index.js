import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

var scrolled = false;
function updateScroll() {
  if (!scrolled) {
    var element = document.getElementById("scroll_list");
    element.scrollTop = element.scrollHeight;
  }
}

setInterval(updateScroll, 10);