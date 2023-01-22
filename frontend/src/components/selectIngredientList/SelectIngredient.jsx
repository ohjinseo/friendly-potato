import React, { useState } from 'react'
import styled from 'styled-components';
import AddModal from '../../pages/addIndegrient/AddModal';

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

const SelectIngredient = ({ isSelected, ingredient }) => {

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
      <>
          <AddModal ingredient={ingredient} open={modalOpen} close={closeModal} header={ingredient?.title} />
      <Container onClick={openModal} isSelected={isSelected}>
          <Wrapper>
              <Top>
                  <ImageContainer>
                      <Image src={ingredient?.image} />
                </ImageContainer>
              </Top>
              <Bottom>
                <CategoryName>{ingredient?.title}</CategoryName>
              </Bottom>
          </Wrapper>
    </Container>
      </>
  )
}

export default SelectIngredient