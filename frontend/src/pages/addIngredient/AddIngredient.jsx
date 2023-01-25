import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../../components/navbar/Navbar';
import SortBox from './SortBox';
import SelectIngredientList from "../../components/selectIngredientList/SelectIngredientList"

// icons
import SearchIcon from '@mui/icons-material/Search';
import Categories from '../../components/categories/Categories';
import AddMenu from './AddMenu';
import { useDispatch, useSelector } from 'react-redux';
import { emptyAddIngredientAction, getAddIngredientAction } from '../../redux/slices/addIngredientSlice';
import { refrigeratorAddAction } from '../../redux/slices/refrigeratorSlice';

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
width: 23%;
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



const CenterTop = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SelectTitle = styled.p`
    font-size: 22px;
`;

const AddMenus = styled.div`
    margin-top:60px;

    height:65vh;
    overflow-y: auto;
    overflow-x: hidden;
`;

const AddButton = styled.button`
margin-top: 20px;
    width: 100%;
    padding: 15px;
    border-radius:10px;
    border:none;
    background-color:#fe2352;
    cursor:pointer;
    // background-color: #32a179;
    color:white;
    font-size: 14px;
    font-weight: 500;
`;

const AddIngredient = () => {
    const [addIngredients, setAddIngredients] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAddIngredientAction());
    }, [])
    
    const res = useSelector((state) => state?.addIngredientReducer?.addIngredientList);

    useEffect(() => {
        res?.ingredients && setAddIngredients(res?.ingredients);
    }, [res?.ingredients]);

    
    const addHandle = (e) => {
        e.preventDefault();
        
        dispatch(emptyAddIngredientAction());

        const ingredients = addIngredients?.reduce((acc, curr) => {
            const { ingredientId: { _id } } = curr;
            let cur = {};
            cur.ingredientId = _id;
            cur.quantity = curr.quantity;
            cur.storage = curr.storage;
            cur.createdAt = curr.createdAt;
            cur.expirationAt = curr.expirationAt;
            acc.push(cur);
            return acc;
        }, []);
        
        dispatch(refrigeratorAddAction({ingredients}));
        dispatch(getAddIngredientAction());

        window.confirm(`${addIngredients.length}개의 식재료가 냉장고에 추가되었습니다.`);
    }

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

                      <SelectIngredientList />
                      

                  </LeftWrapper>
                  <RightContainer>
              <RightWrapper>
                      <RightWrapperTopBanner>
                        <Title><Bold>추가</Bold> <Thin>목록</Thin></Title>
                    </RightWrapperTopBanner>
                          
                          <AddMenus>
                              {addIngredients?.map((i, index) => (
                                  
                                  <AddMenu key={index} info={i} />
                              ))}


                          </AddMenus>
                          
                          <AddButton onClick={addHandle}>
                              {`식재료 ${addIngredients?.length}개 냉장고에 추가`}
                          </AddButton>

                      </RightWrapper>
                      </RightContainer>
              </ContainerWrapper>
              
            </Container>
            
            </AddIndegientContainer>
  )
}

export default AddIngredient