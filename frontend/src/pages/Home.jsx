import React from 'react'
import styled from 'styled-components';
import Categories from '../components/Categories';
import Navbar from '../components/Navbar';
import {Search} from '@material-ui/icons';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchResult from '../components/SearchResult';

  
const Container = styled.div`

`;

const ImageContainer = styled.div`
    height:65vh;
    position:relative;
`;

const Image = styled.img`
    width:100%;
    height:100%;
    object-fit: cover;
`;

const Center = styled.div`
    margin-top: 50px;
`;

const CenterTop = styled.div`
    height:100px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    color:rgb(0, 121, 121);
    margin-bottom: 30px;
`;

const CenterTopTitle = styled.h3`
    font-family: 'Gugi', cursive;
    font-size: 30px;
    font-weight: 100;
    border-bottom:3px solid rgb(0, 121, 121);
`;

const CenterBottom = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
`;

const SearchContainer = styled.div`
    border:2px solid rgb(0, 121, 121);
    display: flex;
    align-items: center;
    padding: 5px;
    width:50%;
    height:20px;
    position:relative;
    border-radius:15px;
    margin-bottom: 10px;
`;

const Input = styled.input`
    border:none;
    width:90%;
`;

const FilterItems = styled.ul`
    display: flex;
    list-style:none;
    width: 50%;
`;

const Item = styled.li`
    padding:3px 10px;
    margin-right: 15px;
    background-color: rgb(0, 121, 121);
    color:white;
    border-radius:15px;
    display:flex;
    align-items: center;
    justify-content: center;
`;

const ItemText = styled.p`
    margin-right: 3px;
    font-weight: 500;
    font-size: 14px;
`;

const SortContainer = styled.div`
    margin-top: 20px;
    width:78%;
    display: flex;
    justify-content: flex-end;
`;

const SortType = styled.input`
    margin-left: 10px;
`;

const SortText = styled.span`

`;


const Home = () => {
  return (
    <>
        <Navbar />
        <Container>
            <ImageContainer>
                <Image src="\img\food-image-for-del-mum-ggn-cropped-1-1645337791.jpg"/>
            </ImageContainer>
            
            <Center>
                <CenterTop>
                    <CenterTopTitle>레시피 검색</CenterTopTitle>
                </CenterTop>
                <CenterBottom>
                    <SearchContainer>
                        <Input></Input>
                        <Search style={{color:"rgb(0, 121, 121)", fontSize:16, position:"absolute", right:"5px"}}/>
                    </SearchContainer>

                    <FilterItems>
                        
                        <Item><ItemText>시금치</ItemText><CancelIcon /></Item>
                        <Item><ItemText>간장</ItemText><CancelIcon /></Item>
                    </FilterItems>

                    <SortContainer>
                        <label>
                            <SortType type="radio" value="latest" name="group"/>
                            <SortText for="latest" name="group">최신순</SortText>
                        </label>


                        <label>
                            <SortType type="radio" value="populate" name="group"/>
                            <SortText for="populate" name="group">인기순</SortText>
                        </label>


                        <label>
                            <SortType type="radio" value="rate" name="group"/>
                            <SortText for="rate" name="group">평점높은순</SortText>
                        </label>

                    </SortContainer>
                </CenterBottom>

                <SearchResult />
            </Center>
        </Container> 
    </>
  )
}

export default Home
