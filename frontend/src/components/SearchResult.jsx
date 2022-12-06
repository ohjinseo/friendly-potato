import React from 'react'
import styled from 'styled-components';
import { categories } from "../data";
import SearchItem from './SearchItem';
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  
  
`;

const Wrapper = styled.div`
padding: 20px 40px;
width:1200px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`;

const SearchResult = () => {
  return (
    <Container>
      <Wrapper>
      {categories.map((item) => (
        <SearchItem item={item} key={item.id} />
      ))}
      </Wrapper>
    </Container>
  )
}

export default SearchResult
