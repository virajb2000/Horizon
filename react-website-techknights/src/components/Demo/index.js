import React, { useState } from 'react'

import {
    InfoContainer,
    InfoWrapper,
    InfoRow,
    Column1,
    Column2,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    ImgWrap,
    Img,
} from './DemoElements';

import { SpeechToText, test } from './audiostreaming'

const DemoSection = ({id, topLine, headline, description, img, alt, nextMember}) => {
    const [recording, setRecording] = useState(false)
    const [fromServer, setFromServer] = useState([])

    function startRecording() {
        setRecording(true)
        SpeechToText()
        setRecording(false)
    }

    return (
        <>
            <InfoContainer id={id}>
                <InfoWrapper>
                    <InfoRow>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading>{headline}</Heading>
                                <Subtitle>{description}</Subtitle>
                            </TextWrapper>
                    </InfoRow>
                <button onClick={() => startRecording()}>Start Recording</button>
                <p>{fromServer}</p>
                </InfoWrapper>
            </InfoContainer>
        </>
    )
}

export default DemoSection
