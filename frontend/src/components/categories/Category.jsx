import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    height:120px;
    width: 90px;
    margin:10px;

    background-color:${(props) =>
        props.isSelected ? '#ffda6d' : 'white'
    };

    &:hover{
        background-color: #ffda6d;
    }
    
    cursor:pointer;
    border-radius: 10px;
    font-family: 'Gothic A1', sans-serif;
`;

const Wrapper = styled.div`
    padding: 10px;
`;

const Top = styled.div``;

const ImageContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:10px;
    border: 1px solid lightgray;
    background-color: white;
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
`;

const Bottom = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CategoryName = styled.p`
    font-family: 'Gothic A1', sans-serif;
    font-size: 14px;
    font-weight: 600;
`;

const Category = ({ isSelected, category }) => {
    console.log(isSelected)
  return (
    <Container isSelected={isSelected}>
          <Wrapper>
              <Top>
                  <ImageContainer>
                      <Image src={category.img} />
                </ImageContainer>
              </Top>
              <Bottom>
                <CategoryName>{category.categoryName}</CategoryName>
              </Bottom>
          </Wrapper>
    </Container>
  )
}

export default Category