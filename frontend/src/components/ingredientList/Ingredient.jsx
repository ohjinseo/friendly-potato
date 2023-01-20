import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height:120px;
    width: 90px;
    margin:10px;
    background-color:white;
    border-radius: 10px;
    font-family: 'Gothic A1', sans-serif;
    position:relative;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
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
    right:-5px;
    font-size: 10px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius:5px;
    background-color: #f1f1f1;
    color: #727171;
    border:1px solid gray;
`;

const ImageContainer = styled.div`
    //background-color:#fdf3da;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:10px;
    //border: 1px solid lightgray;
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
`;

const Bottom = styled.div`
    height:50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BottomTop = styled.div`
    display: flex;
    align-items: center;
`;

const IngredientName = styled.p`
    font-weight: 600;
    font-size: 14px;
    margin-right: 5px;
`;

const BottomCenter = styled.div`
    display: flex;
`;

const Quantity = styled.div`
    color:#c0c0c0;
    font-size: 12px;
    font-weight: 500;

    border-radius:50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 1px;

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
                <Quantity>X{ingredient.quantity}</Quantity>
                      

                  
              </Bottom>
          </Wrapper>
    </Container>
  )
}

export default Ingredient