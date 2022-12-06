import React, { useEffect } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import InfoIcon from '@mui/icons-material/Info';
import CookingOrder from '../components/CookingOrder';

const Container = styled.div`

`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  width: 1300px;
  margin:auto;
  
  
`;

const ImgContainer = styled.div`
  flex: 1;
  
`;

const Image = styled.img`
  width: 100%;
  height: 85vh;
  object-fit: cover;
  border-radius:15px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 500;
  margin-bottom: 30px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  color:gray;
`;

const Price = styled.div`
margin:50px 0;
    width:70%;
    display: flex;
    justify-content: space-around;
`;

const IconContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const IconTitle = styled.p`
  color:gray;
  font-size: 14px;
`;

const IngredientContainer = styled.div`
  width: 100%;
  margin: 30px 0px;
  display: flex;
  color:gray;
  font-size: 14px;
`;

const IngredientWrapper = styled.div`
  width:50%;
  padding: 10px;
`;

const IngredientTitle = styled.div`
  font-size: 16px;
  font-weight: 200;
  margin-bottom: 20px;
`;

const IngredientList = styled.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom:1px solid lightgray;
  margin-bottom: 25px;
`;


const Ingredient = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IngredientLeft = styled.div`
  display: flex;
  align-items: center;
`;

const IngredientName = styled.p`
  margin-right: 5px;
`;

const IngredientRight = styled.div``;

const IngredientAmount = styled.div``;


const CenterWrapper = styled.div`
  margin-top: 100px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: rgb(0, 121, 121);
  color:white;
  cursor: pointer;
  font-weight: 500;
  
  border-radius: 10px;
`;

const Recipe = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/4b18778769ccdab54b57d7ddbc753f501.jpg" />
        </ImgContainer>
        <InfoContainer>
          <Title>시금치무침 만드는 법</Title>
          <Desc>
          오늘은 시금치 나물 만드는 방법을 소개할께요
          </Desc>
          <Price>
            <IconContainer>
              <PeopleAltIcon style={{"color":"gray", "marginBottom":"5px"}}/>
              <IconTitle>2인분</IconTitle>
            </IconContainer>

            <IconContainer>
              <AccessAlarmsIcon style={{"color":"gray", "marginBottom":"5px"}} />
              <IconTitle>15분 이내</IconTitle>
            </IconContainer>

            <IconContainer>
              <AutoGraphIcon style={{"color":"gray", "marginBottom":"5px"}}/>
              <IconTitle>아무나</IconTitle>
            </IconContainer>
          </Price>
          <IngredientContainer>

            <IngredientWrapper style={{"marginRight":"30px"}}>
              <IngredientTitle>[재료]</IngredientTitle>

              <IngredientList>
                <Ingredient>
                  <IngredientLeft>
                    <IngredientName>시금치</IngredientName>
                    <InfoIcon />
                  </IngredientLeft>
                  <IngredientRight>
                    <IngredientAmount>1단</IngredientAmount>
                  </IngredientRight>
                </Ingredient>
              </IngredientList>

              <IngredientList>
                <Ingredient>
                  <IngredientLeft>
                    <IngredientName>대파흰부분만</IngredientName>
                    <InfoIcon />
                  </IngredientLeft>
                  <IngredientRight>
                    <IngredientAmount>적당량</IngredientAmount>
                  </IngredientRight>
                </Ingredient>
              </IngredientList>


            </IngredientWrapper>


            <IngredientWrapper>
              <IngredientTitle>[양념]</IngredientTitle>

              <IngredientList>
                <Ingredient>
                  <IngredientLeft>
                    <IngredientName>다진마늘</IngredientName>
                    <InfoIcon />
                  </IngredientLeft>
                  <IngredientRight>
                    <IngredientAmount>1/2T</IngredientAmount>
                  </IngredientRight>
                </Ingredient>
              </IngredientList>

              <IngredientList>
                <Ingredient>
                  <IngredientLeft>
                    <IngredientName>국간장</IngredientName>
                    <InfoIcon />
                  </IngredientLeft>
                  <IngredientRight>
                    <IngredientAmount>1T</IngredientAmount>
                  </IngredientRight>
                </Ingredient>
              </IngredientList>

              <IngredientList>
                <Ingredient>
                  <IngredientLeft>
                    <IngredientName>참기름</IngredientName>
                    <InfoIcon />
                  </IngredientLeft>
                  <IngredientRight>
                    <IngredientAmount>1T</IngredientAmount>
                  </IngredientRight>
                </Ingredient>
              </IngredientList>

              <IngredientList>
                <Ingredient>
                  <IngredientLeft>
                    <IngredientName>설탕</IngredientName>
                    <InfoIcon />
                  </IngredientLeft>
                  <IngredientRight>
                    <IngredientAmount>1/3T</IngredientAmount>
                  </IngredientRight>
                </Ingredient>
              </IngredientList>

              <IngredientList>
                <Ingredient>
                  <IngredientLeft>
                    <IngredientName>소금</IngredientName>
                    <InfoIcon />
                  </IngredientLeft>
                  <IngredientRight>
                    <IngredientAmount>입맛대로</IngredientAmount>
                  </IngredientRight>
                </Ingredient>
              </IngredientList>

              <IngredientList>
                <Ingredient>
                  <IngredientLeft>
                    <IngredientName>통깨</IngredientName>
                    <InfoIcon />
                  </IngredientLeft>
                  <IngredientRight>
                    <IngredientAmount>1T</IngredientAmount>
                  </IngredientRight>
                </Ingredient>
              </IngredientList>

              

            </IngredientWrapper>
          </IngredientContainer>
    
        </InfoContainer>
      </Wrapper>

      <CenterWrapper>
        <CookingOrder />
      </CenterWrapper>  

    </Container>
  );
};

export default Recipe