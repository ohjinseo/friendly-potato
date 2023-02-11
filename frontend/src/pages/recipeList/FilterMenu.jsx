import React, {useEffect, useState} from 'react'
import styled from 'styled-components';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {useDispatch} from 'react-redux';
import {addIngredientDeleteAction} from '../../redux/slices/addIngredientSlice';
import AddModal from '../../components/modal/AddModal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UpdateModal from '../../components/modal/UpdateModal';
import Checkbox from '@mui/material/Checkbox';
import recipeSlice from '../../redux/slices/recipeSlice';

const Container = styled.div `
    width: 95%;
    border-bottom: 1px solid #f5f5f5;
    padding: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    // color: #ebebeb;

    background-color: ${ (
    props
) => props.checked
    ? '#e0ebf6'
    : 'white'};
`;

const Wrapper = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
`;

const Left = styled.div `

`;

const ImageContainer = styled.div `
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

const Image = styled.img `
    width: 25px;
    height: 25px;

`;

const Right = styled.div `
    width: 100%;
    display: flex;
    padding-left: 15px;
    position: relative;
`;

const TitleContainer = styled.div `
    padding-left: 0px;
    flex:10;
`;

const Title = styled.div `
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 10px;
`;

const Desc = styled.div `
    display: flex;
    align-items: center;
`;

const Storage = styled.div `
    font-size: 12px;
    

    background-color: ${props => {
    if (props.storage === "냉동") 
        return "#4571e5";
    else if (props.storage === "냉장") 
        return "#76AC8C";
    else 
        return "#c94189";}};
    
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:3px 7px;
    border-radius:15px;
    margin-right: 5px;
    font-weight: 500;
`;
    
    const Quantity = styled.div `
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
`;

const Option = styled.div `
    flex:1;
    display: flex;
    align-items: center;
    
`;

const Dday = styled.div `
    font-size: 11px;
    margin-right: 7px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    
    border-radius:15px;
    border:${ (
        props
        ) => props.isExpired
        ? '1px solid red'
        : '1px solid gray'};

background-color:${ (props) => props.isExpired
            ? '#e93333'
            : '#fafafa'};

color:${ (props) => props.isExpired
                ? 'white'
                : 'gray'};
`;

    const AddMenu = ({info}) => {
        const dispatch = useDispatch();
        const [checked, setChecked] = useState(false);
        const [isExpired, setIsExpired] = useState(false);

        const handleChange = (event) => {
            setChecked(event.target.checked);
        };

        useEffect(() => {
            if (checked) {
                dispatch(recipeSlice.actions.add(
                    info
                        ?.ingredientId.title
                ))
            } else {

                dispatch(recipeSlice.actions.delete(
                    info
                        ?.ingredientId.title
                ))
            }
        }, [checked]);

        const calculateDay = (expirationAt) => {
            const dateA = new Date(Date.now());
            const dateB = new Date(expirationAt);

            const diffMSec = dateB.getTime() - dateA.getTime();
            const diffDate = Math.round(diffMSec / (24 * 60 * 60 * 1000));

            return diffDate < 0
                ? `+${Math.abs(diffDate)}`
                : `-${Math.abs(diffDate)}`;
        }

        useEffect(() => {
            if (calculateDay(info?.expirationAt)[0] === '+') {
                setIsExpired(true);
            }
        }, [])

        return (
            <> < Container checked = {
                checked
            } > <Wrapper>
                <Left>
                    <ImageContainer>
                        <Image src={info
                                ?.ingredientId.image}/>
                    </ImageContainer>
                </Left>
                <Right>
                    <TitleContainer>
                        <Title>{
                                info
                                    ?.ingredientId.title
                            }</Title>
                        <Desc>
                            <Dday isExpired={isExpired}>
                            D{calculateDay(info?.expirationAt)}
                            </Dday>
                            {/* <Storage storage={info
                                    ?.storage}>{
                                    info
                                        ?.storage
                                }</Storage> */}
                        </Desc>
                    </TitleContainer>

                    <Option>
                        <Quantity>x{
                                info
                                    ?.quantity
                            }</Quantity>

                    </Option>
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{
                            'aria-label' : 'controlled'
                        }}/>

                </Right>
            </Wrapper>
        </Container>
    </>
        )
    }

    export default AddMenu