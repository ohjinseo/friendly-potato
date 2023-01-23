import React, { useState } from 'react'
import styled from 'styled-components';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch } from 'react-redux';
import { addIngredientDeleteAction } from '../../redux/slices/addIngredientSlice';
import AddModal from '../../components/modal/AddModal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UpdateModal from '../../components/modal/UpdateModal';

const Container = styled.div`
    width: 95%;
    border-bottom: 1px solid #f5f5f5;
    padding: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    // color: #ebebeb;
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
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 10px;
`;

const Desc = styled.div`
    display: flex;
    align-items: center;
`;

const Storage = styled.div`
    font-size: 12px;
    

    background-color: ${props => { 
    console.log(props.storage);
    if (props.storage === "냉동") return "#4571e5";
    else if (props.storage === "냉장") return "#76AC8C";
    else return "#c94189";
    }};
    
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:3px 7px;
    border-radius:15px;
    margin-right: 5px;
    font-weight: 500;
`;

const Quantity = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin-right: 15px;
`;

const Option = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    
`;

const DeleteButton = styled.button`
    cursor: pointer;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

  font-size: 25px;
  font-weight: 200;
  text-align: center;
  color: #999;
`;

const EditButton = styled.button`
    cursor:pointer;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#b7b7b7;
    margin-right: 5px;
`;

const AddMenu = ({ info }) => {
    const dispatch = useDispatch();
    
    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm(`${info?.ingredientId.title}(x${info?.quantity}) 을 정말 삭제하시겠습니까?`)) {
            dispatch(addIngredientDeleteAction({ id: info._id }));
        }
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
            <Container >
          <Wrapper>
              <Left>
                  <ImageContainer>
                      <Image src={info?.ingredientId.image} />
                  </ImageContainer>
              </Left>
              <Right>
                  <TitleContainer>
                            <Title>{info?.ingredientId.title}</Title>
                            <Desc>
                                <Storage storage={info?.storage}>{info?.storage}</Storage>
                            </Desc>
                  </TitleContainer>
                  
                        <Option>
                                <Quantity>x{info?.quantity}</Quantity>
                            <EditButton onClick={openModal}>
                                <ModeEditIcon style={{ "fontSize": 20 }} />
                                </EditButton>
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