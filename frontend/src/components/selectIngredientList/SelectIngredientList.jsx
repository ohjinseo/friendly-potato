import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import SelectIngredient from './SelectIngredient';
import { useSelector } from 'react-redux';

const Container = styled.div`

`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const SelectIngredientList = () => {
    const [ingredients, setIngredients] = useState();
    const res = useSelector(state => state.ingredientReducer.ingredients);

    useEffect(() => {
        res && setIngredients(res);
    
    }, [res])

    

  return (
      <Container>
          <Wrapper>
              {ingredients?.map((ingredient, index) => (
                  <SelectIngredient ingredient={ingredient} isSelected={false} /> 
              ))}
          </Wrapper>
    </Container>
  )
}

export default SelectIngredientList