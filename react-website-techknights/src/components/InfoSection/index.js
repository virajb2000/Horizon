import React from 'react'

import { Button } from '../ButtonElement';

import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

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
    Plus1
} from './InfoElements';

const InfoSection = ({lightBg, id, imgStart, topLine, lightText, headline, darkText, description, buttonLabel, img, alt, nextMember}) => {
    console.log('nextMember:')
    console.log(nextMember)
    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText={lightText}>{headline}</Heading>
                                <Subtitle darkText={darkText}>{description}</Subtitle>
                            </TextWrapper>
                            {/* <IconWrap>
                                <AccessAlarm fontSize='large' color="primary"/>
                            </IconWrap> */}
                            {/* <BtnWrap>{<Plus1/>}{'2019 - 2020 was our very first year competing in FIRST Tech Challenge in Skystone'}</BtnWrap> */}
                        </Column1>
                        <Column2>
                        <ImgWrap>
                                {
                                    img.map((image) =>
                                     <Img src={image} alt={alt}/>
                                   )
                                }
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>

            </InfoContainer>
        </>
    )
}

export default InfoSection
