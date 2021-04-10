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
                    <NavLogo to='/'>16606</NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="about" smooth={true} duration={500} spy={true} exact='true' offset={-80}>About Us</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="meet" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Meet the Team</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="robot" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Our Robot</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="pictures" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Pictures</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="sponsors" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Sponsors</NavLinks>
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
