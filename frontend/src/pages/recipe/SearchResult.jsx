import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import SearchItem from './SearchItem';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeAction } from '../../redux/slices/recipeSlice';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;

`;

const SearchResult = () => {
    const [recipeList, setRecipeList] = useState([]);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();

    const ingredients = useSelector((state) => state.recipeReducer?.selectedIngredient);
    const recipes = useSelector((state) => state.recipeReducer?.recipes);

    useEffect(() => {
        if (recipes) {
            setRecipeList(recipes);
        }
    }, [recipes])
    console.log(recipeList);

    useEffect(() => {
        if (ingredients) {
            setRecipeList([]);
            let str = ingredients?.join('+');

            dispatch(getRecipeAction({ title: str, page }));
            
        }
    },[ingredients])


  return (
    <Container>
          <Wrapper>
              {recipeList?.map((recipe) => (  
                  <SearchItem recipe={recipe.recipe} />
              ))}
     
      </Wrapper>
    </Container>
  )
}

export default SearchResult