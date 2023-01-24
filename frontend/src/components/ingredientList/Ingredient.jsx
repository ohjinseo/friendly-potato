import React, { useState } from 'react'
import styled from 'styled-components'
import RefrigeratorModal from '../modal/RefrigeratorModal';

const Container = styled.div`
    height:120px;
    width: 90px;
    margin:10px;
    background-color:white;
    border-radius: 10px;
    font-family: 'Gothic A1', sans-serif;
    position:relative;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    cursor:pointer;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px; 
    position: relative;
    border-bottom: 1px solid #dadada;
    // color: #ededed;
`;

const Dday = styled.div`
    position: absolute;
    top:-8px;
    right:-8px;
    font-size: 10px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 7px;
    border-radius:15px;
    background-color: #f1f1f1;
    color: #727171;
    border:1px solid gray;
`;

const ImageContainer = styled.div`
    //background-color:#fdf3da;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    border-radius:10px;
    //border: 1px solid lightgray;
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
`;

const Bottom = styled.div`
    height:50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`;

const BottomTop = styled.div`
    display: flex;
    align-items: center;
`;

const IngredientName = styled.p`
    font-weight: 600;
    font-size: 14px;
    margin-right: 5px;
`;

const BottomCenter = styled.div`
    display: flex;
`;

const Quantity = styled.div`
    color:#c0c0c0;
    font-size: 12px;
    font-weight: 500;

    border-radius:50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 1px;

`;

const Badge = styled.div`
    font-size: 10px;
    background-color: ${props => { 
    if (props.storage === "냉동") return "#4571e5";
    else if (props.storage === "냉장") return "#76AC8C";
    else return "#c94189";
    }};
    color:white;
    padding: 3px 7px;
    font-weight: 500;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom:5px;
    right:5px;
`;

const Ingredient = ({ ingredient }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <>
        <RefrigeratorModal info={ingredient} open={modalOpen} close={closeModal} header={ingredient?.title} />
            <Container onClick={openModal}>
          <Dday>D-3</Dday>
          <Wrapper> 
              <Top>
                <Badge storage={ingredient?.storage}>{ingredient?.storage}</Badge>
                  <ImageContainer>
                      <Image src={ingredient?.ingredientId.image} />
                  </ImageContainer>
              </Top>
              <Bottom>
                <IngredientName>{ingredient?.ingredientId.title}</IngredientName>
                <Quantity>X{ingredient?.quantity}</Quantity>
                  
              </Bottom>
          </Wrapper>
    </Container>
    </>
  )
}

export default Ingredient