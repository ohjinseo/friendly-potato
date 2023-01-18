import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height:140px;
    width: 112px;
    margin:10px;
    background-color:white;
    border-radius: 10px;
    font-family: 'Gothic A1', sans-serif;
    position:relative;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px; 
    position: relative;
`;

const Dday = styled.div`
    position: absolute;
    top:-5px;
    left:-5px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius:15px;
    border:1px solid #b0b0b0;
    background-color: #fafafa;
    color: #5c5c5c;
`;

const ImageContainer = styled.div`
    background-color:#fdf3da;
    padding: 10px;
    border-radius:50%;
`;

const Image = styled.img`
    width: 45px;
    height: 45px;
    object-fit: cover;
`;

const Bottom = styled.div`
    
    height:50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const IngredientName = styled.p`
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 7px;

`;

const BottomCenter = styled.div`
    display: flex;
`;

const Quantity = styled.div`
    color: #b0b0b0;
    font-size: 15px;
`;

const Badge = styled.div`
    font-size: 10px;
    background-color: #4571e5;
    color:white;
    padding: 5px 7px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Ingredient = ({ingredient}) => {
  return (
      <Container>
          <Dday>D-{ingredient.dDay}</Dday>
          <Wrapper> 
              <Top>
                  <ImageContainer>
                      <Image src={ingredient.img} />
                  </ImageContainer>
              </Top>
              <Bottom>
                  <IngredientName>{ingredient.title}</IngredientName>
                  <BottomCenter>
                      
                      <Quantity>x{ingredient.quantity}</Quantity>
                  {/* <Badge>냉동</Badge> */}
                  </BottomCenter>
                  
              </Bottom>
          </Wrapper>
    </Container>
  )
}

export default Ingredient