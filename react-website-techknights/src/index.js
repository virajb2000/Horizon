import React, { useState } from 'react'
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
  try {
    if (!scrolled) {
      var element = document.getElementById("scroll_list");
      element.scrollTop = element.scrollHeight;
    }
  } catch (error) {
    console.log(error)
  }
}

setInterval(updateScroll, 100);