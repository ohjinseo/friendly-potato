import axios from "axios";
import authSlice from '../redux/slices/authSlice'
import { logout } from "../redux/slices/userSlice";

const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true
});

export const onSilentRefresh = async (dispatch) => {
    const userId = localStorage.getItem("userId");
    
    try {
        const res = await instance.post(`/auth/silent-refresh/${userId}`);
        onLoginSuccess(res, dispatch)
    } catch (err) {
        
        dispatch(logout());
        console.log(err);
    }
}


export const onLoginSuccess = (response, dispatch) => {
    const { accessToken } = response.data;

    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
    dispatch(authSlice.actions.setToken(true));
    dispatch(authSlice.actions.setAuthenticated(true));
    
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
}