import React from 'react'
import styled from 'styled-components';
import Category from './Category';
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
                  <Category category={category} isSelected={false} /> 
              ))}
          </Wrapper>
    </Container>
  )
}

export default Categories