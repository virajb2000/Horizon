import React, {useState} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import DemoSection from '../components/Demo'
import DiagramSection from '../components/DiagramSection'
import { homeObjOne, whatis, future } from '../components/InfoSection/Data'
import { demo } from '../components/Demo/Data'
import { hood } from '../components/DiagramSection/Data'

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
            <DemoSection {...demo}/>
            <DiagramSection {...hood}/>
            <InfoSection {...future}/>
        </>
    )
}
export default Home