import React from 'react'
import styled from 'styled-components'
import Ingredient from './Ingredient';

const Container = styled.div`
margin-top: 50px;
`;

const Top = styled.div`
width: 100%;
`;

const Title = styled.div`
  font-family: 'Gothic A1', sans-serif;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: black;
  margin-bottom: 10px;
  &::after{
    content:"";
    flex-grow: 1;
    margin:0px 16px;
    font-size: 0px;
    line-height: 0px;
    border-bottom:1px dashed lightgray;
  }
`;


const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const IngredientList = ({ ingredients }) => {
  return (
    <Container>
      <Top>
        <Title>{ingredients.category} ({ingredients.ingredients.length})</Title>
        </Top>
          <Wrapper>
              {ingredients.ingredients.map((ingredient, index) => (
                            <Ingredient key={index} ingredient={ingredient} />
                        ))}
          </Wrapper>
    </Container>
  )
}

export default IngredientList