import React from 'react'
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute
} from './SidebarElements';

const Sidebar = ({ isOpen, toggle }) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="about" onClick={toggle}>
                        About Us
                    </SidebarLink>
                    <SidebarLink to="meet" onClick={toggle}>
                        Meet the Team
                    </SidebarLink>
                    <SidebarLink to="robot" onClick={toggle}>
                        Our Robot
                    </SidebarLink>
                    <SidebarLink to="pictures" onClick={toggle}>
                        Pictures
                    </SidebarLink>
                    <SidebarLink to="sponsors" onClick={toggle}>
                        Sponsors
                    </SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to='/signin'>Sign In</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
