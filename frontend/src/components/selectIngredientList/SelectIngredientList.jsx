import React from 'react'
import styled from 'styled-components';
import SelectIngredient from './SelectIngredient';
import { categories } from "../../categoryDummyData";

const Container = styled.div`

`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Categories = () => {
  return (
      <Container>
          <Wrapper>
              {categories.map((category, index) => (
                  <SelectIngredient category={category} isSelected={false} /> 
              ))}
          </Wrapper>
    </Container>
  )
}

export default Categories