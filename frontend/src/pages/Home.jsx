import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/navbar/Navbar'

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    background-color:gray;
    width: calc(1153.6px - 100px);
    height: 100vh;
`;


const Home = () => {
    return (
        <HomeContainer>
            <Navbar />
            <Container>
                Home
            </Container>
            
            </HomeContainer>
  )
}

export default Home