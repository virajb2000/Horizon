import React, {useState} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import MeetSection from '../components/MeetSection'
import { homeObjOne, whatis, hood, temp, placeholder, sponsors } from '../components/InfoSection/Data'
import Homee  from '../components/DaPics'
import { ThemeAndColors } from '../components/DaPics/Data'

// import React from 'react';
import { render } from 'react-dom';
import ResponsiveGallery from 'react-responsive-gallery';

const images=[
    {
      src: 'http://ec2-18-237-48-102.us-west-2.compute.amazonaws.com/img/portfolio/gptalk.jpg',
      lightboxTitle: 'Gracious Professionalism',
      lightboxCaption: 'writing about gracious professionalism'
    },
    {
      src: 'http://ec2-18-237-48-102.us-west-2.compute.amazonaws.com/img/portfolio/nw1.jpg',
      lightboxTitle: 'Nicki Weiland',
      lightboxCaption: 'working on the chassis'
    },
    {
      src: 'http://ec2-18-237-48-102.us-west-2.compute.amazonaws.com/img/portfolio/kk1.jpg',
      lightboxTitle: 'Krishna Katakaota',
      lightboxCaption: 'working on a motor'
    },
    {
      src: 'http://ec2-18-237-48-102.us-west-2.compute.amazonaws.com/img/portfolio/ss1.jpg',
      lightboxTitle: 'Saanvi Patel',
      lightboxCaption: 'working on the team website'
    },
    {
      src: 'http://ec2-18-237-48-102.us-west-2.compute.amazonaws.com/img/portfolio/ra1.jpg',
      lightboxTitle: 'Rahul Anantuni',
      lightboxCaption: 'working on the playfield'
    },
    {
      src: 'http://ec2-18-237-48-102.us-west-2.compute.amazonaws.com/img/portfolio/nw2.jpg',
      lightboxTitle: 'Nicki Weiland',
      lightboxCaption: 'holding the chassis'
    },
    {
      src: 'http://ec2-18-237-48-102.us-west-2.compute.amazonaws.com/img/portfolio/mc1.jpg',
      lightboxTitle: 'Michaela Caldwell',
      lightboxCaption: 'standing by the playfield'
    }
  ];


const Home = () => {
    const[isOpen, setIsOpen] = useState(false)
    
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} /> 
            <HeroSection />
            <InfoSection {...homeObjOne}/>
            <InfoSection {...whatis}/>
            {/* <InfoSection {...temp}/> */}
            <InfoSection {...hood}/>
            {/* <MeetSection /> */}
            {/* <InfoSection {...placeholder}/> */}
            {/* <InfoSection {...BuildSeason}/> */}
            {/* <ImageGallery {...homeObjOneImageGallery} /> */}
            {/* <DaPics/> */}
            {/* <Homee {...ThemeAndColors}/> */}
            {/* <InfoSection {...sponsors}/> */}
            {/* <ResponsiveGallery images={images} useLightBox={true}/> */}
            {/* <MeetSections/> */}
        </>
    )
}

export default Home





    
// render(
//       <ResponsiveGallery images={images}/>,
//       document.getElementById('root')
//       );

