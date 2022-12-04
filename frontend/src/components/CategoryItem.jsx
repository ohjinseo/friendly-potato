import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 40vh;
  position: relative;
  min-width:30%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NonImage = styled.div`
    width: 100%;
    height: 100%;
    background-color:rgb(0, 121, 121);
`;


const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    font-size: 24px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color:${(props) => props.type === 0 ? "rgb(0, 121, 121)" : "white"} ;
    color:${(props) => props.type === 0 ? "white" : "rgb(0, 121, 121)"};
    cursor: pointer;
    font-weight: 600;
    
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
        {
            item.type === 0 ? (
                <Image src={item?.img} />
            ) : (
                <NonImage />
            )
        }
      
      <Info>
        <Title>{item.title}</Title>
        {
            item.type === 1 && (<Button type={item.type}>MORE</Button>)
        }
        
      </Info>
    </Container>
  );
};

export default CategoryItem;