import React, {useState} from 'react'
import ResponsiveGallery from 'react-responsive-gallery';
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
} from './PicElements';

const images=[
    {
      src: require('../../images/gptalk.jpg').default,
      lightboxTitle: 'Gracious Professionalism',
      lightboxCaption: 'writing about gracious professionalism'
    },
    {
      src: require('../../images/nw1.jpg').default,
      lightboxTitle: 'Nicki Weiland',
      lightboxCaption: 'working on the chassis'
    },
    {
      src: require('../../images/kk1.jpg').default,
      lightboxTitle: 'Krishna Katakaota',
      lightboxCaption: 'working on a motor'
    },
    {
      src: require('../../images/ss1.jpg').default,
      lightboxTitle: 'Saanvi Patel',
      lightboxCaption: 'working on the team website'
    },
    {
      src: require('../../images/ra1.jpg').default,
      lightboxTitle: 'Rahul Anantuni',
      lightboxCaption: 'working on the playfield'
    },
    {
      src: require('../../images/nw2.jpg').default,
      lightboxTitle: 'Nicki Weiland',
      lightboxCaption: 'holding the chassis'
    },
    {
      src: require('../../images/mc1.jpg').default,
      lightboxTitle: 'Michaela Caldwell',
      lightboxCaption: 'standing by the playfield'
    }
  ];


// const Homee = () => {
//     return (
//         <ResponsiveGallery images={images} useLightBox={true}/>
//     )
// }




const Homee = ({lightBg, id, imgStart, topLine, lightText, headline, darkText, description, buttonLabel, img, alt, nextMember}) => {
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
                            <ResponsiveGallery images={images} useLightBox={true}/>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>

            </InfoContainer>
        </>
    )
}

export default Homee