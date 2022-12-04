import React from 'react'
import styled from 'styled-components';
import { categories } from "../data";
import SearchItem from './SearchItem';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 40px;
  justify-content: space-between;
`;

const SearchResult = () => {
  return (
    <Container>
      {categories.map((item) => (
        <SearchItem item={item} key={item.id} />
      ))}
    </Container>
  )
}

export default SearchResult
