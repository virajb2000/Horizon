import styled from 'styled-components'
import { MdPlusOne } from 'react-icons/md';


export const DemoContainer = styled.div`
    color: #fff;
    background: #010606;    @media screen and (max-width: 768px) {
        padding: 100px 0;
    }
`

export const DemoWrapper = styled.div`
    display: grid;
    z-index: 1;
    height: 100vh;
    width: 100%;
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 24px;
`

export const smalltext = styled.div`
    font-size: 20px;
    margin-rig
`

export const DemoRow = styled.div`
    display: grid;
    grid-auto-columns: minmax(auto, 1fr);
    align-items: center;
    grid-template-areas: ${({ imgStart }) => (imgStart ? `'col2 col1'` : `'col1 col2'`)};

    @media screen and (max-width: 768px) {
        grid-template-areas: ${({ imgStart }) => (imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`)};
    }
`

export const Column1 = styled.div`
grid-area: col1;
align-items: center;
padding: 0 10px;
` 

export const Column2 = styled.div`
grid-area: col2;
padding: 0 15px;
`


export const Plus1 = styled(MdPlusOne)`
    font-size: 40px;
`

export const RowContainer = styled.div`
    width: 20px
    flex-direction: row;
    justify-content: space-between;
`

export const TextWrapper = styled.div`
    max-width: 540px;
    padding-top: 0;
    padding-bottom: 20px;
`

export const TopLine = styled.p`
    color: #6C63FF;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
`

export const Heading = styled.h1`
font-size: 48px;
line-height: 1.1;
font-weight: 600;
color: #FFFFFF;

@media screen and (max-width: 480px) {
    font-size: 32px;
}
`
// margin-bottom: 24px;

export const Subtitle = styled.p`
    max-width: 440px;
    font-size: 18px;
    line-height: 24px;
    color: ${({ darkText }) => (darkText ? '#010606' : '#fff')};
    `
    // margin-bottom: 35px;

export const BtnWrap = styled.div`
    display: flex;
    justify-content: flex-start;
`

export const ImgWrap = styled.div`
    max-width: 555px;
    height: 100%;
`

export const Img = styled.img`
    width: 100%;
    padding-right: 0;
    `
    // margin: 0 0 10px 0;
    
export const ScrollList = styled.ul`
    height: 30em;
    line-height: 2em;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
    scroll-behavior: smooth;
`

export const ScrollItem = styled.li`
`

export const RowC = styled.div`
    display:flex; 
    flex-direction:row;
    width:100px;
`