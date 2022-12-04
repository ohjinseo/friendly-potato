import React from 'react'
import styled from 'styled-components';
import {Search} from '@material-ui/icons';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';

const Container = styled.div`
    
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
`;

const Top = styled.div`
    width:70%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:20px 0;
`;

const Left = styled.div`
    flex:1;
`;

const Center = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: center;
`;

const CenterTitle = styled.div`
    color:rgb(0, 121, 121);
    font-size:30px;
    font-weight: 500;
`;

const Right = styled.div`
    flex:1;
`;

const SearchContainer = styled.div`
    border: 0.5px solid rgb(0, 121, 121);
    display: flex;
    align-items: center;
    padding: 5px;
    width:60%;
    height:20px;
    position:relative;
`;

const Input = styled.input`
    border:none;
    width:90%;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    background-color:rgb(0, 121, 121);
    padding:7px 0;
    width:100%;
`;

const Menu = styled.ul`
    display: flex;
    justify-content: center;
`;

const Item = styled.li`
    list-style:none;
    padding:0 20px;
    color:white;
    font-size:14px;
    cursor:pointer;
    &:hover{
        color: #d3eeee;
    }
`;


const Navbar = () => {
  return (
    <Container>
      <Wrapper>
          <Top>
            <Left></Left>
            <Center>
                <TakeoutDiningOutlinedIcon style={{color:"rgb(0, 121, 121)", marginRight:"5px", fontSize:30}}/>
                <CenterTitle>RECIPE</CenterTitle>
            </Center>
            <Right>
            <SearchContainer>
                <Input placeholder='Search..'/>
                <Search style={{color:"rgb(0, 121, 121)", fontSize:16, position:"absolute", right:"5px"}}/>
            </SearchContainer>
            </Right>
          </Top>
          <Bottom>
            <Menu>
                <Item>홈</Item>
                <Item>레시피</Item>
                <Item>공유 게시판</Item>
                <Item>추천 블로그</Item>
                <Item>문의</Item>
                <Item>RECIPE 소개</Item>
            </Menu>
          </Bottom>
      </Wrapper>
    </Container>
  )
}

export default Navbar
