import React from 'react';
import ReactWordcloud from 'react-wordcloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const callbacks = {
    getWordColor: word => word.value > 50 ? "blue" : "red",
    onWordClick: console.log,
    onWordMouseOver: console.log,
    getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
}
const options = {
    rotations: 4,
    rotationAngles: [-30, 30],
};
let size = [600, 400];
let words = [
    {text: 'told', value: 64}
]




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