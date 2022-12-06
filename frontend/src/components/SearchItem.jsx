import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  margin: 10px;
  height: 40vh;
  position: relative;
  min-width:20%;
  margin-bottom:180px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius:15px;
  border:2px solid lightgray;
`;

const Title = styled.p`
  margin:8px 0;
  font-size: 14px;
  font-weight: 500;
  `;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.p`
  font-size: 14px;
`;

const MetaData = styled.div`

`;
const View = styled.p`
  font-size: 13px;
  color:gray;
  font-weight: 100;
`;


const SearchItem = ({ item }) => {
  return (
    <Container onclick="location.href='www.naver.com;">
      <Link style={{ textDecoration: 'none', color:'inherit'}} to="/recipe">
        <Image src={item?.img} />
        <Title>{item?.title}</Title>
        <ProfileContainer>
          <ProfileImage src={item?.profile}/>
          <UserName>{item?.name}</UserName>
        </ProfileContainer>
        <MetaData>
          <View>조회수 {item?.view}</View>
        </MetaData>
        </Link>
    </Container>
  )
}

export default SearchItem
