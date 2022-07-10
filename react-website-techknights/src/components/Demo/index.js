import React, { useState, useEffect } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import ReactWordcloud from 'react-wordcloud';

import {
    DemoContainer,
    DemoWrapper,
    DemoRow,
    Column1,
    Column2,
    TextWrapper,
    TopLine,
    Heading,
    ScrollItem,
    ScrollList,
    ScrollCSS,
    RowC
} from './DemoElements';

var request = require('request');
const credentials = require('./credentials.json');

const DemoSection = ({ id, topLine, headline, description, img, alt, nextMember }) => {
    const [imageList, setImageList] = useState([])
    const [globalList, setGlobalList] = useState([])

    const {
        error,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        crossBrowser: true,
        googleApiKey: {
            "type": credentials['type'],
            "project_id": credentials['project_id'],
            "private_key_id": credentials['private_key_id'],
            "private_key": credentials['private_key'],
            "client_email": credentials['client_email'],
            "client_id": credentials['client_id'],
            "auth_uri": credentials['auth_uri'],
            "token_uri": credentials['token_uri'],
            "auth_provider_x509_cert_url": credentials['auth_provider_x509_cert_url'],
            "client_x509_cert_url": credentials['client_x509_cert_url']
        },
        timeout: 10000,
    });

    // if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    useEffect(() => {
        function f() {
            if (results.length > 0) {
                var options = {
                    'method': 'GET',
                    'url': 'https://oya2ebjgg1.execute-api.us-east-1.amazonaws.com/Prod/hello?msg=' + results[results.length - 1],
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },

                };

                try {
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        imageList.push(JSON.parse(response.body).message.image_url)
                        let tempList = imageList.slice()
                        setImageList(tempList)

                        Array.from(JSON.parse(response.body).message.word_list).map(item => {
                            globalList.push({text: item, value: 1})
                            let tempList = globalList.slice()
                            setGlobalList(tempList)
                        })
                    });
                } catch (error) {
                    console.log(error)
                }
            }
        }

        try {
            f()
        } catch (error) {
            console.log(error)
        }
    }, [results]);

    const colors = ["#6363FF", "#63ff85", "#ffdf63", "#63ffde", "#ffa263"]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const callbacks = {
        getWordColor: () => colors[getRandomInt(colors.length)],
        onWordClick: console.log,
        onWordMouseOver: console.log,
        getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
    }

    const options = {
        rotations: 2,
        rotationAngles: [-90, 0],
    };

    const size = [800, 600];

    return (
        <>
        <DemoContainer id={id}>
            <DemoWrapper>
                <DemoRow>
                    <TextWrapper>
                        <TopLine>{topLine}</TopLine>
                        <Heading>{headline}</Heading>
                        {results.length == 0 && <Heading>Please Wait for the Lecture to Begin</Heading>}
                    </TextWrapper>
                </DemoRow>
                <DemoRow>
                    <RowC>
                        <Column1>
                            
                            {results.length > 0 && <ScrollList id="scroll_list">
                                {Array.from(imageList).map((item, index) => {
                                    return (
                                        <ScrollItem key={index}>
                                            <img src={item} />
                                        </ScrollItem>
                                    );
                                })}
                            </ScrollList>}
                            
                            <RowC>
                                {/* <Column1> */}
                                    <smalltext>{isRecording ? 'Recording' : 'Not Recording'}</smalltext>
                                {/* </Column1> */}
                                {/* <Column2> */}
                                    <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                                    </button>
                                {/* </Column2> */}
                            </RowC>
                        </Column1>
                        {/* <ReactWordcloud words={globalList} /> */}
                        <ReactWordcloud
                            callbacks={callbacks}
                            options={options}
                            size={size}
                            words={globalList}
                        />
                    </RowC>

                </DemoRow>
            </DemoWrapper>
        </DemoContainer>
    </>
    )
}

export default DemoSection
