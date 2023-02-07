import axios from "axios";
import { useDispatch } from "react-redux";
import authSlice from '../redux/slices/authSlice'

const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true
});

export const OnSilentRefresh = async (dispatch) => {
    
    const userId = localStorage.getItem("userId");
    const res = await instance.post(`/auth/silent-refresh/${userId}`)
    console.log("onSilentRefresh function");
    
    OnLoginSuccess(res, dispatch);
}


export const OnLoginSuccess = (response, dispatch) => {
    const { accessToken } = response.data.data;
    
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    dispatch(authSlice.actions.setToken());
    setTimeout(OnSilentRefresh, JWT_EXPIRY_TIME - 60000);
}