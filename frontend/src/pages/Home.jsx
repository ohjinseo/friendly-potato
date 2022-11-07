import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const Container = styled.div`

`;

const CenterImage = styled.div`
    height:65vh;
`;

const Image = styled.img`
    width:100%;
    height:100%;
    object-fit: cover;
`;

const Home = () => {
  return (
    <>
        <Navbar />
        <Container>
            <CenterImage>
                <Image src="\img\food-image-for-del-mum-ggn-cropped-1-1645337791.jpg"/>
            </CenterImage>
        </Container> 
    </>
  )
}

export default Home
