import React from 'react'
import styled from 'styled-components';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Container = styled.div`
    width: 95%;
    margin-bottom: 10px;
    border-bottom: 1px solid #f5f5f5;
    padding: 5px;
    padding-bottom: 10px;
    // color: #ebebeb;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

const Left = styled.div`

`;


const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    //background-color:#dedede;
    background-color: #FDF3DA;
    //border:1px solid lightgray;
    padding: 5px;
    border-radius: 10px;
    width: 30px;
    height: 30px;
    
`;

const Image = styled.img`
    width: 25px;
    height: 25px;

`;

const Right = styled.div`
    width: 100%;
    display: flex;
    padding-left: 15px;
`;

const TitleContainer = styled.div`
    padding-left: 0px;
    flex:10;
`;


const Title = styled.div`
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 5px;
`;

const Quantity = styled.div`
    font-size: 14px;
    font-weight: 300;
`;

const Option = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`;

const AddMenu = () => {
  return (
      <Container>
          <Wrapper>
              <Left>
                  <ImageContainer>
                      <Image src="/img/categories/001-fruits.png"/>
                  </ImageContainer>
              </Left>
              <Right>
                  <TitleContainer>
                      <Title>바나나</Title>
                        <Quantity>x2</Quantity>
                  </TitleContainer>
                  
                  <Option>
                      <RemoveCircleOutlineIcon style={{color:"#fe2352", "fontSize":22}} />
                  </Option>
              </Right>
          </Wrapper>
    </Container>
  )
}

export default AddMenu