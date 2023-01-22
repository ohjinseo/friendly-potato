import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import Tabs from '../components/Tabs';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useDispatch, useSelector} from 'react-redux';
import EggAltIcon from '@mui/icons-material/EggAlt';
import { loginUserAction, registerUserAction } from '../redux/slices/userSlice';


const Container = styled.div `
    display: flex;
    width: 100%;
    height: 100vh;
`;

const LeftWrapper = styled.div`
    flex:1;
    background-color: #efd4db;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LogoTitle = styled.div`
    color: #fe2352;
    font-size: 22px;
    font-weight: 700;
    margin-top: 10px;
`;

const RightWrapper = styled.div `
    flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;


const LoginForm = styled.form `
  display: flex;
  flex-direction: column;
    width: 400px;
    margin-top: 30px;
`;

const Email = styled.input `
  margin-bottom: 25px;
  padding: 12px;
  background-color: #f0f0f0;
  border:none;
  `;

const Password = styled.input `
  margin-bottom: 25px;
  padding: 12px;
  background-color: #f0f0f0;
  border:none;
`;

const Button = styled.button `
  padding: 10px;
  background-color: #fe2352;
  color:white;
  border:none;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
`;

const ErrorMessage = styled.div `
  color:red;
`

const Login = () => {

    // states
    const [value, setValue] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    const handleSignUpSubmit = (e) => {
        e.preventDefault();

        if (isMatchPassword(password, checkPassword)) {
            dispatch(registerUserAction({ email, password }));
        }
    }

    const handleSignInSubmit = (e) => {
        e.preventDefault();

        dispatch(loginUserAction({ email, password }));
    }

    const isMatchPassword = (pw, cpw) => {
        if (pw !== cpw) {
            setPasswordError(true);
            setPassword("");
            setCheckPassword("");
            return false;
        } else {
            setPasswordError(false);
            return true;
        }
    }
    
    const res = useSelector(state => state.userReducer);
    const { loading, isRegister, isLogin, userAuth } = res;

    useEffect(() => {
        if (userAuth && isLogin) {
            navigate("/");
        }
    }, [isLogin]);

    useEffect(() => {
        if (isRegister) {
            window.confirm("회원가입이 완료되었습니다.\n다시 로그인을 진행해주세요")
            setValue(0);
            setEmail("");
            setPassword("");
            setCheckPassword("");
        }
    }, [isRegister]);



    return (
        <Container>
            <LeftWrapper>
                <LogoContainer>
                    <EggAltIcon style={{ "color": "#fe2352", "fontSize": 100 }} />
                    <LogoTitle>FRIENDLY POTATO</LogoTitle>
                </LogoContainer>
            </LeftWrapper>
            <RightWrapper>
                <Tabs value={value} handleChange={handleChange} />
                {value === 0 ? 
                <LoginForm>
                <Email placeholder='이메일' onChange={e => setEmail(e.target.value)} value={email}></Email>
                <Password
                    placeholder='비밀번호'
                    type="password"
                    onChange={e => setPassword(e.target.value)} value={password}></Password>
                        <Button onClick={handleSignInSubmit}>
                        {
                            loading
                                ? (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                        <CircularProgress color="inherit" size="16px"/>
                                    </Box>
                                )
                                : "로그인"
                        }
                </Button>
                {/* <ErrorMessage>{userAppErr}</ErrorMessage> */}
                    </LoginForm>
                    : 
                    <LoginForm>
                    <Email placeholder='이메일' type="email" onChange={e => setEmail(e.target.value)} value={email}></Email>
                    <Password
                            placeholder='비밀번호'
                            type="password"
                            onChange={e => setPassword(e.target.value)} value={password}></Password>
                    <Password
                        placeholder='비밀번호 확인'
                        type="password"
                        onChange={e => setCheckPassword(e.target.value)} value={checkPassword}></Password>
                        <Button onClick={handleSignUpSubmit}>
                        {
                            loading
                                ? (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                        <CircularProgress color="inherit" size="16px"/>
                                    </Box>
                                )
                                : "회원가입"
                        }
                    </Button>
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </LoginForm>
            }
                
            </RightWrapper>
        </Container>
    )
}

export default Login
