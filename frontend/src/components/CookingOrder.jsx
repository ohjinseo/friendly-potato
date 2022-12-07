import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 1100px;
    padding: 40px;
    background-color: #f6f6f6;
    border-radius:30px;
`;

const Title = styled.h2`
    margin-bottom: 50px;
    font-size: 22px;
    font-weight: bold;
`;

const Order = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom:1px solid #e3e3e3;
   
`;

const Left = styled.div`
    flex:2;
    padding: 10px;
    display: flex;
    
`;

const Number = styled.div`
    width: 40px;
    height: 40px;
    background-color:rgb(0, 121, 121);
    border-radius:50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color:white;
    font-size: 22px;
    margin-right: 15px;
`;

const Desc = styled.p`
    font-size: 22px;
    width: 90%;
    color:#333;
`;

const Right = styled.p`
    flex:1;
    padding: 10px;
`;

const ImageContainer = styled.div`

`;

const Image = styled.img`
    width: 350px;
    height: 250px;
    object-fit: cover;
    border-radius:20px;
`;




const CookingOrder = () => {
  return (
    <Container>
        <Wrapper>
            <Title>조리순서</Title>

            <Order>
                <Left>
                    <Number>1</Number>
                    <Desc>우선 시금치는 흙하고 가깝게 자르는 채소라서 흙을 깨끗하게 제거해주어야해요.
뿌리부분을 먼저 제거해줍니다.</Desc>
                </Left>

                <Right>
                    <ImageContainer>
                        <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/c39e556a83b844bea3f95efa35b8d1ae1.jpg"/>
                    </ImageContainer>
                </Right>
            </Order>

            <Order>
                <Left>
                    <Number>2</Number>
                    <Desc>흐르는 물에 깨끗하게 씻어주세요.
전 2-3번정도 헹구어 주었어요.</Desc>
                </Left>

                <Right>
                    <ImageContainer>
                        <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/5696dbc26bf2e4f114957addf32879db1.jpg"/>
                    </ImageContainer>
                </Right>
            </Order>

            <Order>
                <Left>
                    <Number>3</Number>
                    <Desc>채에 물기를 제거해줍니다.</Desc>
                </Left>

                <Right>
                    <ImageContainer>
                        <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/06c01ddbbc3580cb4f2ffcc6a3a4c7ca1.jpg"/>
                    </ImageContainer>
                </Right>
            </Order>

            <Order>
                <Left>
                    <Number>4</Number>
                    <Desc>우선 시금치는 흙하고 가깝게 자르는 채소라서 흙을 깨끗하게 제거해주어야해요.
뿌리부분을 먼저 제거해줍니다.</Desc>
                </Left>

                <Right>
                    <ImageContainer>
                        <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/c39e556a83b844bea3f95efa35b8d1ae1.jpg"/>
                    </ImageContainer>
                </Right>
            </Order>

            <Order>
                <Left>
                    <Number>5</Number>
                    <Desc>시금치 나물에는 대파의 흰색 부분만 사용할거예요.
저는 대파가 커서 4등분을 한뒤</Desc>
                </Left>

                <Right>
                    <ImageContainer>
                        <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/d22ff0f9edbc68fd2511c60ee3bd5bdd1.jpg"/>
                    </ImageContainer>
                </Right>
            </Order>

            <Order>
                <Left>
                    <Number>6</Number>
                    <Desc>잘게 썰어서 준비했습니다.
대파를 크게 썰어버리면 대파만 빼놓고 시금치만 골라먹게 되는데 이렇게 잘게 썰어넣으면 대파도 같이 먹게 되더라구요^^</Desc>
                </Left>

                <Right>
                    <ImageContainer>
                        <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/7f7dbb11b8ad8598136c752c0d958a441.jpg"/>
                    </ImageContainer>
                </Right>
            </Order>

            <Order>
                <Left>
                    <Number>7</Number>
                    <Desc>1단기준으로 밥공기에 물을 준비한뒤 냄비에 넣어서 끓여줍니다.
물이 적다고 느끼실텐데 상관없어요~^^
사진에는 없는데 물에 소금1/2티스푼을 넣어주세요 그래야 시금치가 더 색이 진해진답니다.</Desc>
                </Left>

                <Right>
                    <ImageContainer>
                        <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/2965a84c9bcfe853a421060282f659b11.jpg"/>
                    </ImageContainer>
                </Right>
            </Order>

            <Order>
                <Left>
                    <Number>8</Number>
                    <Desc>물이 끓기 시작하면 시금치를 넣고 뚜껑을 바로 덮고 1-2분정도 삶아 줍니다.
(뚜껑을 덮고 해야 열기로 골고루 익어요~)</Desc>
                </Left>

                <Right>
                    <ImageContainer>
                        <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/b4741df406391a5f0483ef904150fa701.jpg"/>
                    </ImageContainer>
                </Right>
            </Order>

            <Order>
                <Left>
                    <Number>9</Number>
                    <Desc>시금치의 숨이 확 죽으면 찬물에 바로 헹구어준뒤 물기를 꼬옥 짜줍니다.</Desc>
                </Left>

                <Right>
                    <ImageContainer>
                        <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/158e9708b72cf8e525f223dc527ac11a1.jpg"/>
                    </ImageContainer>
                </Right>
            </Order>

            <Order>
                <Left>
                    <Number>10</Number>
                    <Desc>큰볼에 다진파와 마늘1/2스푼,참기름1스푼,설탕1/3스푼,소금은 본인입맛에 따라 넣고
여기서 저는 간장을 1스푼을 넣어주는데 국간장을 사용했어요.
보통은 진간장을 사용하시는데 국간장을 사용하면 진한 감칠맛이 나서 좋더라구요^^
아 그리고 설탕은 좀 더 감칠맛이 나라고 조금 넣었는데~ 단맛에 예민하신분들은 안넣으셔도 됩니다.</Desc>
                </Left>

                <Right>
                    <ImageContainer>
                        <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/26efaf0a58ee5f711e7d6e79299c5c351.jpg"/>
                    </ImageContainer>
                </Right>
            </Order>

            <Order>
                <Left>
                    <Number>11</Number>
                    <Desc>통깨를 1스푼넣고 조물조물 해주면 시금치나물 완성</Desc>
                </Left>

                <Right>
                    <ImageContainer>
                        <Image src="https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/02edb537864c8c1114894ec8a5aad7f01.jpg"/>
                    </ImageContainer>
                </Right>
            </Order>
        </Wrapper>
    </Container>
  )
}

export default CookingOrder