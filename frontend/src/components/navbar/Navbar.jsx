import React from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux';

// Icons
import EggAltIcon from '@mui/icons-material/EggAlt';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/slices/userSlice';

const Container = styled.div`
    width: 120px;
    height:100vh;
    
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    position:fixed;
    top:0;
    margin-left: 6px;
`;

const Logo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:30px;
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
        background-color:#fff3f4;
        
    }
`;

const MenuIcon = styled.div`
    
`;

const MenuText = styled.p`
    font-family: 'Gothic A1', sans-serif;
    font-size: 12px;
    font-weight: 300;
    margin-top: 15px;
`;

const Navbar = () => {

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
      <Container>
      <Wrapper>
      <Link style={{ textDecoration: 'none', color:'inherit'}} to="/">
              <Logo>
                  <EggAltIcon style={{ "color": "#fe2352", "fontSize": 45 }} />
                   {/* <LogoText>친절한 감자</LogoText> */}
          </Logo>
          </Link>
        <Menus>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
                  <Menu isSelected={true}>
                        <MenuIcon>
                          <KitchenIcon style={{ "fontSize": 30 }} />
                        </MenuIcon>
                      <MenuText>나의 냉장고</MenuText>
                  </Menu>
        </Link>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/add/ingredient">
            
                  <Menu isSelected={false}>
                        <MenuIcon>
                          <DashboardCustomizeIcon style={{ "fontSize": 30 }} />
                        </MenuIcon>
                      <MenuText>식재료 추가</MenuText>
                  </Menu>
        </Link>

                  <Menu isSelected={false}>
                        <MenuIcon>
                          <LocalDiningIcon style={{ "fontSize": 30 }} />
                        </MenuIcon>
                      <MenuText>추천 레시피</MenuText>
                  </Menu>
                  
                  <Menu isSelected={false}>
                        <MenuIcon>
                          <FavoriteIcon style={{ "fontSize": 30 }} />
                        </MenuIcon>
                      <MenuText>즐겨찾기</MenuText>
                  </Menu>
                  <Link style={{ textDecoration: 'none', color:'inherit'}} to="/login">
                  <Menu onClick={handleLogout} isSelected={false}>
                        <MenuIcon>
                          <LogoutIcon style={{ "fontSize": 30 }} />
                        </MenuIcon>
                      <MenuText>로그아웃</MenuText>
            </Menu>
            </Link>
              </Menus>
        </Wrapper>
    </Container>
  )
}

export default Navbar