import React from 'react';
import ReactWordcloud from 'react-wordcloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const callbacks = {
    getWordColor: word => word.value > 30 ? "red" : (word.value > 15 ? "orange" : "white"),
    // getWordColor: word => word.value < 190 ? "green" : "red",
    // onWordClick: word => alert(""),
    // onWordMouseOver: console.log,
    getWordTooltip: word => `${word.text} appeared ${word.value} times during class`,
}
const options = {
    rotations: 4,
    rotationAngles: [-30, 30],
};
let size = [600, 400];
let words = [
]

var i;
for (i = 0; i < 40; i++) {
  words.push({text: i, value: i})
}





class WordCloud extends React.Component {
    render() {
        return (
            <ReactWordcloud
                callbacks={callbacks}
                options={options}
                size={size}
                words={words}
            />
        );
    }
}

export default WordCloud