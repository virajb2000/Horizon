import React, { useState, useEffect } from 'react'
// import ReactWordcloud from 'react-wordcloud'
import useSpeechToText from 'react-hook-speech-to-text';
import WordCloud from './wc';

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
    ScrollList
} from './DemoElements';


var request = require('request');

//{img_url: 'imageurl 1'}, {img_url: 'imageurl 2'}, {img_url: 'imageurl 3'}, {img_url: 'imageurl 4'}, {img_url: 'imageurl 5'}, {img_url: 'imageurl 6'}, {img_url: 'imageurl 7'}, {img_url: 'imageurl 8'}, {img_url: 'imageurl 9'},{img_url: 'imageurl 10'}, {img_url: 'imageurl 11'}, {img_url: 'imageurl 12'}, {img_url: 'imageurl 13'}, {img_url: 'imageurl 14'},{img_url: 'imageurl 15'},{img_url: 'imageurl 16'}, {img_url: 'imageurl 17'}, {img_url: 'imageurl 18'}, {img_url: 'imageurl 19'}, {img_url: 'imageurl 20'}
const DemoSection = ({ id, topLine, headline, description, img, alt, nextMember }) => {
    const [imageList, setImageList] = useState([])
    const [globalList, setGlobalList] = useState(new Set())
    const [fetching, setFetching] = useState(false)

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
            "type": "service_account",
            "project_id": "myapp-310302",
            "private_key_id": "7fcfe25d1a828f5956a62a200b57fd4c887fec1a",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDOboe+ERtqnQMi\nbd9zBxnFLZDWhWSLpdFBZn8mCFn14wXSX0JGSTdS7xeJXGdFzcmlTh699t1PZtpD\n1ok/6K90TPqDD5C2CM1a2iS6Ypwps9wvdEwCM9+Pv1drRisN1Eb58zwQVPQNAKqc\n3hUiGY6fnjDgeZMRD6/UdPr7tAcvaOzz25aC0hyqw6z2KpRAQcI1ouSKE0ryf1pX\neo5mm+/+0V2o/dvOzSgVwFmg/dkm4yLnQcNLe+Roia2SiMY388jgh5ny3PVwI9fF\nLKMdmQcsWtjUleA1jxAv33BuebvEr1j8Il2gjavMHwZxugNd5+aRJSWXLEu1Luv+\nyG3QBANlAgMBAAECggEADYBjltk9/QMeXJCDHnetOWnf7af1cFmWdIiXpSbDe4Mv\nTLGEspD0JWB6uALRkY2cGrIfujaWbJMPKepMn8ZAQE/bzEBAXsErBtfHS/ywtty+\nRS9+D5Oek6N+iQc8QAznERuiwHUax57uvPcDITyhFdK3r6oQv5Tr3+5AXCYYmJxO\nIIEiJeFONLP0z0AUgxUKDHVCkc+QtB7rqbpen7PLbhYhnduS6uOMEX0wvncBk2+W\nd3xUTK2mdtMKbMI8b2MX0hM6Yy1Z1mjCGjT5I4VusTndD8DEV3ixH2gY4Wcvpe6O\nVLffNWT8coupdaWvL0AjvOkHsv8dCe2RZUnmGJ97IQKBgQDx7JEXH7z2fm2UxGSj\nxGHzWqWx9U5AV5UcwAJjLMg2cvfCbZYsipqICRFEEBkMvSZYNkdn0arTNgm3k0RG\nsbWYZEajXpk7dekRZiFFadQJ7tT2OxTm7z2NmtfmLk5V6C+rUHOge78NqUBJK3aM\nWGFXraIxAzXA9dVe0AbsiisYkwKBgQDacU8d+gyXbs+mSfGr4B4XlMuQwuRs58Qg\nN3ScuHz2Te5Dv9M8l86jYUXuvgMWhAq/wep1sbJ99jVZ3gWMtcNx0zh6i2SuYajT\nw2+AjSdgmvIQRn98pxrQviRhpPqyMXYnmSf1ZkzuVl6MRUN2iSY/j4SXXAl12oYS\n/AJIQ+PHJwKBgEtZXydQn042unKnaKEJPWjKRulSefjYTn0R4Kx6+jDbRgeskiV1\nVgQgrtwAF408LIE1BrBzQT1fi0898voBx4mbUdT4VcmLQ/hDUwGHoJ8nX/UBGdWD\nlixQmgX7TjK7in1VJW5KnIrouDkR7G5x6H+ieO3DDi73YmmRaVarAhk5AoGBAKul\nR57tggFoQGCRUAZXeC3dbMvWaLmusG0ERmxzhzXfbK7tx6WgP+4fnF0KD9EcdnnR\nfVN4CyJxWeDA1imIFgiWCZY5fCaOdKPZuP8Ra3S8rCLf0oN3p1mJX3sesSNePFLH\nRR/Of/r0AR1Fu8oj4NsnAfARkRl7WckHHx/7wLsXAoGBAL3CdfbtBW1/QcO4jw2i\ngTlxEwThiwYdPXiUbovFyEw5MAaRbIr3+G8r4cxisNvaWXBa/9kSNKR5MOMJsF8E\nSOCpxn8HIYCGVRJKnPbd+aAyiM85mlBKXM05r5DIXb0FH72sw2mxac82Hbw/3163\nkOPdtkuZTigL4N9sHk2wp0Kj\n-----END PRIVATE KEY-----\n",
            "client_email": "viraj-548@myapp-310302.iam.gserviceaccount.com",
            "client_id": "117849680150817246920",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/viraj-548%40myapp-310302.iam.gserviceaccount.com"
        },
        timeout: 10000,
    });

    // if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    useEffect(() => {
        function f() {
            if (results.length > 0) {
                var options = {
                    'method': 'GET',
                    'url': 'https://1cfea706b2ba.ngrok.io/entity?msg=' + results[results.length - 1],
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },

                };
                console.log(results)
                request(options, function (error, response) {
                    if (error) throw new Error(error);
                    imageList.push(JSON.parse(response.body).image_url)
                    let tempList = imageList.slice()
                    setImageList(tempList)

                    Array.from(JSON.parse(response.body).word_list).map(item => {
                        if (!(item in globalList)) {
                            globalList.add({ item: 1 })
                        } else {
                            var count = globalList[item] + 1
                            globalList.add({ item: count })
                        }
                        let tempList = new Set(globalList)
                        setGlobalList(tempList)
                    })
                });
            }
        }
        try {
            setFetching(true)
            f()
        } catch (error) {
            console.log(error)
        } finally {
            setFetching(false)
        }
    }, [results]);

    return (
        <>
            <DemoContainer id={id}>
                <DemoWrapper>
                    <DemoRow>
                        <TextWrapper>
                            <TopLine>{topLine}</TopLine>
                            <Heading>{headline}</Heading>
                        </TextWrapper>
                    </DemoRow>
                    <DemoRow>
                        <Column1>
                            <ScrollList id="scroll_list">
                                {Array.from(imageList).map((item, index) => {
                                    return (
                                        <ScrollItem key={index}>
                                            <img src={item} />
                                        </ScrollItem>
                                    );
                                })}
                            </ScrollList>
                        </Column1>
                        <Column2 id="word_cloud">
                            <WordCloud words={globalList}/>
                        </Column2>
                    </DemoRow>
                    <h1>Recording: {isRecording.toString()}</h1>
                    <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                    <DemoRow>
                    </DemoRow>
                </DemoWrapper>
            </DemoContainer>
        </>
    )
}

export default DemoSection
