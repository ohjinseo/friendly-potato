import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  margin: 10px;
  height: 20vh;
  position: relative;
  min-width:201px;
  max-width:201px;
  margin-bottom:120px;
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
  font-weight: 600;
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


const SearchItem = ({ recipe }) => {
  return (
    <Container>
      <Link style={{ textDecoration: 'none', color:'inherit'}} to="/recipe">
        <Image src={recipe?.thumbImage} />
        <Title>{recipe?.title}</Title>
        <ProfileContainer>
          <UserName>하이</UserName>
        </ProfileContainer>
        <MetaData>
          <View>조회수 12</View>
        </MetaData>
        </Link>
    </Container>
  )
}

export default SearchItem