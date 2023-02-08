import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Category from './Category';
import { categories } from "../../categoryDummyData";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientAction } from '../../redux/slices/ingredientSlice';

const Container = styled.div`

`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState("과일");

    const dispatch = useDispatch();

    const handleCategory = (categoryName) => {
        setSelectedCategory(categoryName);
    }

    useEffect(() => {
        dispatch(getIngredientAction({category:selectedCategory}));
    }, [selectedCategory]);


  return (
      <Container >
          <Wrapper>
              {categories.map((category, index) => (
                  <Category key={index} selectedCategory={selectedCategory} handleCategory={handleCategory} category={category} isSelected={false} /> 
              ))}
          </Wrapper>
    </Container>
  )
}

export default Categories