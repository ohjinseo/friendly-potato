import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import Navbar from '../../components/navbar/Navbar';
import FilterMenu from "./FilterMenu";

import SearchIcon from '@mui/icons-material/Search';
import {useDispatch, useSelector} from 'react-redux';
import {getRefrigeratorAction} from '../../redux/slices/refrigeratorSlice';
import SearchResult from './SearchResult';
import { onSilentRefresh } from '../../utils/config';

const RecipeListContainer = styled.div `
    display: flex;
    justify-content: center;
    font-family: 'Gothic A1', sans-serif;
`;

const Container = styled.div `
    width: calc(1153.6px - 100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fafafa;
    `;

const ContainerWrapper = styled.div `
    display: flex;
    width: 100%;
    `;

const LeftWrapper = styled.div `
    padding:20px;  
    padding-left:40px;
    padding-right:40px;
    flex:5;
`;

const TopBanner = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Gothic A1', sans-serif;
    margin-bottom: 40px;
    margin-top: 30px;
    `;

const Title = styled.h1 `
    font-size: 30px;
    
    `;

const Thin = styled.span `
    font-weight: 200;
    `;

const Bold = styled.span `
    font-weight: 500;
    `;

const SearchContainer = styled.div `
  display: flex;
  align-items: center;
  padding: 5px;
  height:30px;
  background-color:white;
  width: 250px;
  border-radius: 10px;
  `;

const Input = styled.input `
  border: none;
  width: 100%;
  font-size: 13px;
    &::placeholder{
        color: #b0b0b0;
    }
    `;

const RightContainer = styled.div `
    padding: 20px;
    flex:2;
    background-color:white;
`;

const RightWrapper = styled.div `
    position:fixed;
    top:20px;
    width: 23%;
`;

const RightWrapperTopBanner = styled.div `
    display: flex;
    align-items: center;
    font-family: 'Gothic A1', sans-serif;
    margin-bottom: 40px;
    margin-top: 30px;
`;

const FilterMenus = styled.div `
    margin-top:60px;

    height:70vh;
    overflow-y: auto;
    overflow-x: hidden;
`;

const RecipeList = () => {
    const [myRefrigerator, setMyRefrigerator] = useState([]);
    const dispatch = useDispatch();

    const token = useSelector(state => state?.authReducer?.token);
    
    useEffect(() => {
        onSilentRefresh(dispatch);
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(getRefrigeratorAction());
        }
    }, [token]);

    const res = useSelector(
        state => state
            ?.refrigeratorReducer
                ?.refrigerator
                    ?.ingredients
    );

    useEffect(() => {
        if (res) {
            setMyRefrigerator(res);
        }
    }, [res]);

    return (
        <RecipeListContainer>
            <Navbar/>
            <Container>
                <ContainerWrapper>
                    <LeftWrapper>
                        <TopBanner>
                            <Title>
                                <Bold>추천</Bold>
                                <Thin>레시피</Thin>
                            </Title>
                            <SearchContainer>
                                <SearchIcon
                                    style={{
                                        color: "#b0b0b0",
                                        fontSize: 20,
                                        marginLeft: "5px",
                                        marginRight: "5px"
                                    }}/>
                                <Input placeholder="레시피를 검색하세요 : ex) 시금치나물"/>
                            </SearchContainer>
                        </TopBanner>

                        <SearchResult />
                        
                    </LeftWrapper>
                    <RightContainer>
                        <RightWrapper>
                            <RightWrapperTopBanner>
                                <Title>
                                    <Bold>냉장고</Bold>
                                    <Thin>목록</Thin>
                                </Title>
                            </RightWrapperTopBanner>

                            <FilterMenus>
                                {
                                    myRefrigerator
                                        ?.map((i, index) => (<FilterMenu key={index} info={i}/>))
                                }
                            </FilterMenus>
                        </RightWrapper>
                    </RightContainer>
                </ContainerWrapper>

            </Container>
        </RecipeListContainer>
    )
}

export default RecipeList