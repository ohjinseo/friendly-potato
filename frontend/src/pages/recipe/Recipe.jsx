import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import Navbar from '../../components/navbar/Navbar';
import { registerVisitAction } from '../../redux/slices/visitSlice';
import { onSilentRefresh } from '../../utils/config';


const RecipeContainer = styled.div `
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

const Recipe = () => {
    const [recipeId, setRecipeId] = useState("");
    const dispatch = useDispatch();

    const token = useSelector(state => state?.authReducer?.token);

    useEffect(() => {
        onSilentRefresh(dispatch);
    }, []);

    useEffect(() => {
        if (token) {
            const startTime = new Date();
            
            // 언마운트 시 체류 시간 계산
            return () => {
                const endTime = new Date();
                const timeSpent = endTime - startTime;

                recipeId && dispatch(registerVisitAction({ recipeId, timeSpent:(timeSpent/1000) }));
            }
        }
    }, [token, recipeId]);

    const params = useParams();

    useEffect(() => {
        params && setRecipeId(params.recipeId);
    }, [params]);

  return (
    <RecipeContainer>
            <Navbar/>
            <Container>
                <ContainerWrapper>
                    <LeftWrapper>
                        <TopBanner>
                            <Title>
                                <Bold>추천</Bold>
                                <Thin>레시피</Thin>
                            </Title>
                            
                        </TopBanner>

                        
                        
                    </LeftWrapper>
                    <RightContainer>
                        <RightWrapper>
                            <RightWrapperTopBanner>
                                <Title>
                                    <Bold>냉장고</Bold>
                                    <Thin>목록</Thin>
                                </Title>
                            </RightWrapperTopBanner>

                            
                        </RightWrapper>
                    </RightContainer>
                </ContainerWrapper>

            </Container>
        </RecipeContainer>
  )
}

export default Recipe