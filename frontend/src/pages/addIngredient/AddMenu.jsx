import React, { useState } from 'react'
import styled from 'styled-components';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch } from 'react-redux';
import { addIngredientDeleteAction } from '../../redux/slices/addIngredientSlice';
import AddModal from '../../components/modal/AddModal';
import UpdateModal from '../../components/modal/UpdateModal';

const Container = styled.div`
    width: 95%;
    border-bottom: 1px solid #f5f5f5;
    padding: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    // color: #ebebeb;
    cursor:pointer;
    &:hover{
        background-color: #ffda6d;
    }
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
    position: relative;
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
    font-weight: 200;
    color:gray;
`;

const Option = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`;

const DeleteButton = styled.button`
outline: none;
    cursor: pointer;
  border: 0;

  position: absolute;
  top: 0px;
  right: 5px;
  width: 30px;
  font-size: 25px;
  font-weight: 200;
  text-align: center;
  color: #999;
  background-color: transparent;
`;

const AddMenu = ({ info }) => {
    const dispatch = useDispatch();
    
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(addIngredientDeleteAction({ id: info._id }));
    }

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <UpdateModal info={info} open={modalOpen} close={closeModal} header={info?.ingredientId?.title} />
            <Container onClick={openModal}>
          <Wrapper>
              <Left>
                  <ImageContainer>
                      <Image src={info?.ingredientId.image} />
                  </ImageContainer>
              </Left>
              <Right>
                  <TitleContainer>
                      <Title>{info?.ingredientId.title}</Title>
                      <Quantity>x{info?.quantity}</Quantity>
                  </TitleContainer>
                  
                  <Option>
                      <DeleteButton onClick={handleDelete}>
                        &times;  
                      </DeleteButton>
                  </Option>
              </Right>
          </Wrapper>
            </Container>
            </>
  )
}

export default AddMenu