import React, { useState } from 'react'

import { Button } from '../ButtonElement';

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
    BtnWrap,
    ImgWrap,
    Img,
    ArrowForward,
    ArrowRight,
    ArrowBack,
    ArrowLeft
} from './MeetElements';

import { Rahul, Shreyash, Michaela, Nicki, Nitin, Krishna, Saanvi } from './Data'



let members = [Rahul, Shreyash, Michaela, Nicki, Nitin, Krishna, Saanvi]
const MeetSection = () => {

    const [hoverRight, setHoverRight] = useState(false)

    const onHoverRight = () => {
        setHoverRight(!hoverRight)
    }

    const [hoverLeft, setHoverLeft] = useState(false)

    const onHoverLeft = () => {
        setHoverLeft(!hoverLeft)
    }

    const [currentMember, setCurrentMember] = useState(members[1]);
    const [nextMember, setNextMember] = useState(members[2]);
    const [previousMember, setPreviousMember] = useState(members[0]);

    const updateMemberRight = () => {
        members.push(members.shift())
        setCurrentMember(members[1])
        setNextMember(members[2])
        setPreviousMember(members[0])
    }

    const updateMemberLeft = () => {
        members.unshift(members.pop())
        setCurrentMember(members[1])
        setNextMember(members[2])
        setPreviousMember(members[0])
    }

    console.log('currentMember:')
    console.log(currentMember)
    return (
        <>
            <InfoContainer lightBg={currentMember.lightBg} id={currentMember.id}>
                <InfoWrapper>
                    <InfoRow imgStart={currentMember.imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{currentMember.topLine}</TopLine>
                                <Heading lightText={currentMember.lightText}>{currentMember.headline}</Heading>
                                <Subtitle darkText={currentMember.darkText}>{currentMember.description}</Subtitle>
                                <BtnWrap>
                                    <Button to={'meet'} onClick={updateMemberLeft} onMouseEnter={onHoverLeft} onMouseLeave={onHoverLeft}>{hoverLeft ? <ArrowBack/> : <ArrowLeft/>} Meet {previousMember.firstname}</Button>
                                </BtnWrap>
                                <BtnWrap>
                                    <Button to={'meet'} onClick={updateMemberRight} onMouseEnter={onHoverRight} onMouseLeave={onHoverRight}>Meet {nextMember.firstname}{hoverRight ? <ArrowForward/> : <ArrowRight/>}</Button>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={currentMember.img} alt={currentMember.alt}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>

            </InfoContainer>
        </>
    )
}

export default MeetSection
