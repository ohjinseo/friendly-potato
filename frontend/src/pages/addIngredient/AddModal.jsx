import React, { useState } from 'react'
import styled from 'styled-components'
import StorageBox from "./StorageBox"
import { Add, Remove } from '@material-ui/icons';
import DatePicker from "./DatePicker";
import { useDispatch } from 'react-redux';
import { addIngredientAddAction } from '../../redux/slices/addIngredientSlice';

const Container = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);

  ${(props) =>
    props.open && 
    `
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.3s;
    `}
`;

const Section = styled.div`
    width: 90%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const TopCloseButton = styled.button`
  outline: none;
    cursor: pointer;
  border: 0;

  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
`;

const Center = styled.div`
      padding: 32px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
`;

const Bottom = styled.div`
      padding: 12px 16px;
  text-align: right;
`;

const BottomCloseButton = styled.button`
outline: none;
  cursor: pointer;
  border: 0;

  padding: 6px 12px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 13px;
`;

const CenterTop = styled.div`
    display: flex;
    margin-bottom: 15px;
`;

const ImageContainer = styled.div`

border:1px solid lightgray;
border-radius:10px;
display: flex;
align-items: center;
justify-content: center;
padding: 10px;;
margin-right: 15px;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
`;

const CenteTopTitleContainer = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top:10px;
    padding-bottom:10px;
`;

const CenterTopCategoryName = styled.div`
     text-decoration: underline;
     color:gray;
`;

const CenterTopIngredientName = styled.div`
    font-size: 20px;
    font-weight: 500;
`;

const StorageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
`;

const Title = styled.div`
    font-weight: 500;
`;

const CountBox = styled.div `
  display: flex;
  align-items: center;
`;

const CountIcon = styled.div `
  width:12px;
  height:12px;
  border:2px solid #575757;
  border-radius:50%;
  padding:5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
`;

const Count = styled.span `
  margin:0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight:500;
`;

const Interval = styled.div`
    height: 10px;
    margin-bottom: 20px;
    width: 100%;
    border-bottom:2px dotted lightgray;
`;

const AddButton = styled.button`
    width: 100%;
    margin-top: 50px;
    border:0;
    border-radius:30px;
    padding: 12px;
    color:white;
    background-color:#fe2352;
    font-size: 16px;
    font-weight: 700;
`;


const AddModal = ({ingredient, open, close, header }) => {
  const [storage, setStorage] = useState("냉장실");
  const [count, setCount] = useState(1);
  const [createdAt, setCreatedAt] = useState(new Date());
  const [expiredAt, setExpiredAt] = useState(new Date());
    
    const handleCount = (kind) => {
        if(kind === "add" && count < 10){
          setCount(count + 1);
        }else if(kind === "minus" && count > 1){
          setCount(count - 1);
        }
  }

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();


    dispatch(addIngredientAddAction())
  }
    

  return (
      <Container open={open}>
          {open ? (
              <Section>
                  <Header>
                      {header}
                      <TopCloseButton onClick={close}>
                          &times;
                      </TopCloseButton>
                  </Header>
                  
                  <Center>
                      <CenterTop>
                          <ImageContainer>
                <Image src={ingredient?.image} />
                          </ImageContainer>
                          <CenteTopTitleContainer>
                              <CenterTopCategoryName>{ingredient?.category}</CenterTopCategoryName>
                              <CenterTopIngredientName>{ingredient?.title}</CenterTopIngredientName>
                          </CenteTopTitleContainer>
                      </CenterTop>

                      <StorageContainer>
                          <Title>보관장소</Title>
              <StorageBox storage={storage} setStorage={setStorage} />
                      </StorageContainer>

                      <StorageContainer>
                          <Title>수량</Title>
                          <CountBox>
                              <CountIcon onClick={() => handleCount("minus")}><Remove style={{"fontSize":16}} /></CountIcon>
                              <Count>{count}</Count>
                            <CountIcon onClick={() => handleCount("add")}><Add style={{"fontSize":16}}/></CountIcon>
                        </CountBox>
                      </StorageContainer>

                      <Interval></Interval>

                      <StorageContainer>
                          <Title>등록일</Title>
              <DatePicker kind="등록일" setExpiredAt={setExpiredAt} setCreatedAt={setCreatedAt}/>
                      </StorageContainer>

                      <StorageContainer>
                          <Title>유통기한</Title>
              <DatePicker kind="유통기한" setExpiredAt={setExpiredAt} setCreatedAt={setCreatedAt} />
                      </StorageContainer>
                  <AddButton>추가</AddButton>
                  </Center>


                  <Bottom>
                      <BottomCloseButton onClick={close}>close</BottomCloseButton>
                  </Bottom>
              </Section>
          ):null}

    </Container>
  )
}

export default AddModal