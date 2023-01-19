import React from 'react'
import styled from 'styled-components';
import Navbar from '../../components/navbar/Navbar';
import SortBox from './SortBox';

// icons
import SearchIcon from '@mui/icons-material/Search';
import Categories from '../../components/categories/Categories';
import AddMenu from './AddMenu';

const AddIndegientContainer = styled.div`
    display: flex;
    justify-content: center;
    font-family: 'Gothic A1', sans-serif;
`;

const Container = styled.div`
    width: calc(1153.6px - 100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fafafa;
    `;

const ContainerWrapper = styled.div`
    display: flex;
    width: 100%;
    `;

const LeftWrapper = styled.div`
    padding:20px;  
    padding-left:40px;
    padding-right:40px;
    flex:5;
    
`;

const RightContainer = styled.div`
padding: 20px;
flex:2;
background-color:white;
`;

const RightWrapper = styled.div`
position:fixed;
top:20px;
width: 20%;
`;


const TopBanner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Gothic A1', sans-serif;
    margin-bottom: 40px;
    margin-top: 30px;
    `;

const Title = styled.h1`
    font-size: 30px;
    
    `;

const Thin = styled.span`
    font-weight: 200;
    `;

const Bold = styled.span`
    font-weight: 500;
    `;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  height:30px;
  background-color:white;
  width: 250px;
  border-radius: 10px;
  `;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 13px;
    &::placeholder{
        color: #b0b0b0;
    }
    `;



const RightWrapperTopBanner = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Gothic A1', sans-serif;
    margin-bottom: 40px;
    margin-top: 30px;
`;

const AddMenus = styled.div`
    margin-top:60px;
`;

const CenterTop = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SelectTitle = styled.p`
    font-size: 22px;
`;



const AddIndegrient = () => {
  return (
        <AddIndegientContainer>
            <Navbar />
          <Container>
              <ContainerWrapper>
                <LeftWrapper>
                    <TopBanner>
                        <Title><Bold>식재료</Bold> <Thin>카테고리</Thin></Title>
                        <SearchContainer>
                            <SearchIcon style={{ color: "#b0b0b0", fontSize: 20,marginLeft:"5px", marginRight:"5px" }} />
                            <Input placeholder="재료를 검색하세요 : ex) 시금치" />
                        </SearchContainer>
                      </TopBanner>

                      <Categories />
                      
                      <CenterTop>
                          <SelectTitle>
                              <Bold>식재료</Bold> <Thin>선택</Thin>
                          </SelectTitle>
                          <SortBox />
                      </CenterTop>

                      <Categories />
                      <Categories />
                      

                  </LeftWrapper>
                  <RightContainer>
              <RightWrapper>
                      <RightWrapperTopBanner>
                        <Title><Bold>추가</Bold> <Thin>목록</Thin></Title>
                    </RightWrapperTopBanner>
                          
                          <AddMenus>
                              <AddMenu />
                              <AddMenu />
                              <AddMenu />
                        </AddMenus>
                          
                          
                      </RightWrapper>
                      </RightContainer>
              </ContainerWrapper>
              
            </Container>
            
            </AddIndegientContainer>
  )
}

export default AddIndegrient