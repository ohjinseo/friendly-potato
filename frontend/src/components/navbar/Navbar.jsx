import React from 'react'
import styled from 'styled-components'

// Icons
import EggAltIcon from '@mui/icons-material/EggAlt';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonIcon from '@mui/icons-material/Person';

const Container = styled.div`
    width: 120px;
    height:100vh;
`;

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Logo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:20px;
    margin-bottom:20px;
`;

const LogoText = styled.p`
    font-family: 'Gothic A1', sans-serif;
    font-size: 12px;
    font-weight: 500;
    margin-top: 5px;
`;

const Menus = styled.ul`
    margin-top: 30px;
`;

const Menu = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    border-radius: 15px;
    margin-bottom: 30px;
    cursor:pointer;

    background-color:${(props) =>
        props.isSelected ? '#fe2352' : 'white'
    };

    color:${(props) =>
        props.isSelected ? 'white' : '#b0b0b0'
    };

    &:hover{
        background-color:#fe2352;
        color:white;
    }
`;

const MenuIcon = styled.div`
    
`;

const MenuText = styled.p`
    font-family: 'Gothic A1', sans-serif;
    font-size: 12px;
    font-weight: 500;
    margin-top: 15px;
`;

const Navbar = () => {
  return (
      <Container>
          <Wrapper>
              <Logo>
                  <EggAltIcon style={{ "color": "#fe2352", "fontSize": 45 }} />
                   {/* <LogoText>친절한 감자</LogoText> */}
              </Logo>
              <Menus>
                  <Menu isSelected={true}>
                        <MenuIcon>
                          <KitchenIcon style={{ "fontSize": 30 }} />
                        </MenuIcon>
                      <MenuText>나의 냉장고</MenuText>
                  </Menu>

                  <Menu isSelected={false}>
                        <MenuIcon>
                          <DashboardCustomizeIcon style={{ "fontSize": 30 }} />
                        </MenuIcon>
                      <MenuText>식재료 추가</MenuText>
                  </Menu>

                  <Menu isSelected={false}>
                        <MenuIcon>
                          <LocalDiningIcon style={{ "fontSize": 30 }} />
                        </MenuIcon>
                      <MenuText>레시피</MenuText>
                  </Menu>
                  
                  <Menu isSelected={false}>
                        <MenuIcon>
                          <FavoriteIcon style={{ "fontSize": 30 }} />
                        </MenuIcon>
                      <MenuText>즐겨찾기</MenuText>
                  </Menu>

                  <Menu isSelected={false}>
                        <MenuIcon>
                          <PersonIcon style={{ "fontSize": 30 }} />
                        </MenuIcon>
                      <MenuText>마이페이지</MenuText>
                  </Menu>
              </Menus>
        </Wrapper>
    </Container>
  )
}

export default Navbar