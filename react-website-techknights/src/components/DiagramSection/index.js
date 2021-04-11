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
} from './DiagramElements';

const DiagramSection = ({ lightBg, id, imgStart, topLine, lightText, headline, darkText, description, buttonLabel, img, alt, nextMember }) => {
    console.log('nextMember:')
    console.log(nextMember)
    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        {
                            img.map((image) =>
                                <Img src={image} alt={alt} />
                            )
                        }
                    </InfoRow>
                </InfoWrapper>

            </InfoContainer>
        </>
    )
}

export default DiagramSection
