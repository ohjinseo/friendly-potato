import React, { useState } from 'react'
import styled from 'styled-components';
import Navbar from '../components/navbar/Navbar'
import { Link } from 'react-router-dom';

// icons
import AppsIcon from '@mui/icons-material/Apps';
import WidgetsIcon from '@mui/icons-material/Widgets';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import SearchIcon from '@mui/icons-material/Search';
import IngredientList from '../components/ingredientList/IngredientList';
import AddIcon from '@mui/icons-material/Add';
import Categories from '../components/categories/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRefrigeratorAction } from '../redux/slices/refrigeratorSlice';
import { OnSilentRefresh, onSilentRefresh } from '../utils/config';
import { silentRefreshAction } from '../redux/slices/userSlice';

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    background-color: #fafafa;
    width: calc(1153.6px - 100px);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Wrapper = styled.div`
    padding:20px;  
    width: 90%;
    position:relative;
`;

const AddButton = styled.div`
    position:fixed;
    bottom:30px;
    right:30px;
    width: 60px;
    height: 60px;
    background-color:#fe2352;
    color:white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    &:hover{
        background-color: #ff5277
    }
`;

const TopBanner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Gothic A1', sans-serif;
    margin-bottom: 40px;
    margin-top: 30px;
`;

const Title = styled.h1`
    font-size: 30px;

`;

const Thin = styled.span`
    font-weight: 200;
`;

const Bold = styled.span`
    font-weight: 500;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  height:30px;
  background-color:white;
  width: 300px;
  border-radius: 10px;
  `;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 13px;
    &::placeholder{
        color: #b0b0b0;
    }
`;

const Top = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


const TopMenus = styled.ul`
    width: 50%;
    display: flex;
    justify-content: space-around;
`;

const Menu = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    border-radius: 10px;
    width: 70px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    background-color:${(props) =>
        props.isSelected ? '#fe2352' : 'white'
    };

    color:${(props) =>
        props.isSelected ? 'white' : '#b0b0b0'
    };
`;

const Icon = styled.div`
    margin-right: 5px;
`;

const MenuText = styled.p`
    font-size: 12px;
`;

const Center = styled.div`
    margin-top: 50px;
`;

const Home = () => {
    const [myRefrigerator, setMyRefrigerator] = useState([]);
    const [filterRefrigerator, setFilterRefrigerator] = useState([]);
    const [searchFilterRefrigerator, setSearchFilterRefrigerator] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState("전체");
    const [searchContent, setSearchContent] = useState("");
    const dispatch = useDispatch();

    const token = useSelector(state => state?.authReducer?.token);

    useEffect(() => {
        onSilentRefresh(dispatch);
    }, []);
    
    useEffect(() => {
        if (token) {
            dispatch(getRefrigeratorAction());
        }
    },[token])

    const res = useSelector(state => state?.refrigeratorReducer?.refrigerator?.ingredients);

    useEffect(() => {
        if (res) {
            const result = res.reduce((acc, curr) => {
                const { ingredientId: { category } } = curr;
                if (acc[category]) acc[category].push(curr);
                else acc[category] = [curr];
                return acc;
            }, []);

            setMyRefrigerator(result);
        }
    }, [res]);

    useEffect(() => {
        
        if (selectedMenu === "전체") {
            setFilterRefrigerator(myRefrigerator);
            const result = Object.entries(myRefrigerator)?.map(([key, value]) => {
                return { [key] : value} ;
            })
            setFilterRefrigerator(result);
        }
        else if (selectedMenu !== "전체") {
            const result = Object.entries(myRefrigerator)?.map(([key, value]) => {
                return { [key] : value?.filter(subElement => subElement.storage === selectedMenu)} ;
            })
            setFilterRefrigerator(result);
        }

        setSearchContent("");
        
    }, [selectedMenu, myRefrigerator])

    const handleMenu = (menuName) => {
        setSelectedMenu(menuName);
    }

    const getKeyByValue = (obj, value) => {
        return Object.keys(obj).find(key => obj[key] === value);
    }

    useEffect(() => {
        let arr = [];
        filterRefrigerator?.forEach((i, index) => {

            Object.entries(i)?.forEach(([key, value]) => {
                let obj = {};
                obj[key] = value.filter((k) => (k?.ingredientId.title.includes(searchContent) || k?.ingredientId.category.includes(searchContent)));
                arr.push(obj);
            });
        })

        setSearchFilterRefrigerator(arr);
        
        
    }, [searchContent]);


    return (
        <HomeContainer>
            <Navbar />
            <Container>
                <Wrapper>
                    <TopBanner>
                        <Title><Thin>나의</Thin> <Bold>냉장고</Bold></Title>
                        <SearchContainer>
                            <SearchIcon style={{ color: "#b0b0b0", fontSize: 20,marginLeft:"5px", marginRight:"5px" }} />
                            <Input value={searchContent} onChange={e => setSearchContent(e.target.value)} placeholder="보관 중인 식재료를 검색하세요 : ex) 시금치" />
                        </SearchContainer>
                    </TopBanner>
                    <Top>
                        <TopMenus>
                            <Menu onClick={() => { handleMenu("전체"); setSearchContent("") }} selectedMenu={selectedMenu} isSelected={selectedMenu === "전체"}>
                                <Icon>
                                    <AppsIcon  style={{"fontSize": 20}} />
                                </Icon>
                                <MenuText>
                                    전체
                                </MenuText>
                            </Menu>

                            <Menu onClick={() => {handleMenu("냉장"); setSearchContent("")}} selectedMenu={selectedMenu} isSelected={selectedMenu === "냉장"}>
                                <Icon>
                                    <KitchenIcon style={{"fontSize": 20}} />
                                </Icon>
                                <MenuText>
                                    냉장실
                                </MenuText>
                            </Menu>

                            <Menu onClick={() => {handleMenu("냉동"); setSearchContent("")}} selectedMenu={selectedMenu} isSelected={selectedMenu === "냉동"}>
                                <Icon>
                                    <AcUnitIcon style={{"fontSize": 20}}/>
                                </Icon>
                                <MenuText>
                                    냉동실
                                </MenuText>
                            </Menu>

                            <Menu  onClick={() => {handleMenu("실온"); setSearchContent("")}} selectedMenu={selectedMenu} isSelected={selectedMenu === "실온"}>
                                <Icon>
                                    <DeviceThermostatIcon style={{"fontSize": 20}}/>
                                </Icon>
                                <MenuText>
                                    실온
                                </MenuText>
                            </Menu>
                            </TopMenus>
                    </Top>
                    
                    <Center>
                        {
                            searchContent.length === 0 ?  filterRefrigerator?.map((i, index) => (
                                <IngredientList key={index} category={Object.keys(i)[0]} ingredients={Object.values(i)[0]} />
                                ))
                            : searchFilterRefrigerator?.map((i, index) => (
                                <IngredientList key={index} category={Object.keys(i)[0]} ingredients={Object.values(i)[0]} />
                            ))
                            }
                        
                    </Center>
                <Link style={{ textDecoration: 'none', color:'inherit'}} to="/add/ingredient">
                    <AddButton>
                        <AddIcon style={{"fontSize":28}} />
                        </AddButton>
                        </Link>
                </Wrapper>
            </Container>
            
            </HomeContainer>
  )
}

export default Home