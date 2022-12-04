import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  margin: 10px;
  height: 40vh;
  position: relative;
  min-width:20%;
  margin-bottom:150px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h3`
  margin:5px 0;
  font-size: 16px;
  `;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.p`
  font-weight: 300;
`;

const MetaData = styled.div`

`;
const View = styled.p`
  font-size: 14px;
  color:gray;
  font-weight: 100;
`;


const SearchItem = ({ item }) => {
  return (
    <Container>
        <Image src={item?.img} />
        <Title>시금치 나물 만드는 법</Title>
        <ProfileContainer>
          <ProfileImage src="https://image.ajunews.com/content/image/2021/03/12/20210312140848199139.jpg"/>
          <UserName>정국</UserName>
        </ProfileContainer>
        <MetaData>
          <View>조회수 125</View>
        </MetaData>
    </Container>
  )
}

export default SearchItem
