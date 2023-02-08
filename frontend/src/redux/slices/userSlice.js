import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { instance, OnLoginSuccess, onLoginSuccess } from "../../utils/config";
import { registerAddIngredientAction } from "./addIngredientSlice";
import { registerRefrigeratorAction } from "./refrigeratorSlice";

// 회원가입 비동기 액션
export const registerUserAction = createAsyncThunk(
    "user/register",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const { accessToken } = await axios.post(`${baseURL}/auth/register`, payload);
            dispatch(registerAddIngredientAction(accessToken));
            dispatch(registerRefrigeratorAction(accessToken));
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

// 로그인 비동기 액션
export const loginUserAction = createAsyncThunk(
    "user/login",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const data = await instance.post(`${baseURL}/auth/login`, payload);
            localStorage.setItem("userId", data?.data.userId); 
            onLoginSuccess(data, dispatch);
            
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (payload, { rejectWithValue }) => {
        try {
            localStorage.removeItem("userId");
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const userSlices = createSlice({
    name: "users",
    initialState: {

    },
    extraReducers: (builder) => {
        // register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.isRegister = false;
            state.serverError = undefined;
        })
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isRegister = true;
            state.serverError = undefined;
        })
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.isRegister = false;
            state.serverError = action?.error?.message;
        })

        // login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.isLogin = false;
        })
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isLogin = true;
        })
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.isLogin = false;
            state.serverError = action?.error?.message;
        });


        // logout
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
        })
    }
})

export default userSlices.reducer;