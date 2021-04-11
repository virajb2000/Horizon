import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa'
import { 
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn,
    NavBtnLink
} from './NavbarElements';

const Navbar = ({ toggle }) => {

    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        setScrollNav(window.scrollY >= 80)
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav);
    }, []);

    return (
        <>
            <Nav scrollNav={scrollNav}>
                <NavbarContainer>
                    <NavLogo to='/'>Horizon</NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="problem" smooth={true} duration={500} spy={true} exact='true' offset={-80}>The Problem</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="whatis" smooth={true} duration={500} spy={true} exact='true' offset={-80}>What is Horizon</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="demo" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Horizon in Action</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="hood" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Horizon Under the Hood</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="future" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Future Changes</NavLinks>
                        </NavItem>
                    </NavMenu>
                    {/* <NavBtn>
                        <NavBtnLink to="/signin">Sign In</NavBtnLink>
                    </NavBtn> */}
                    {/* <h1>Hey</h1> */}
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar
