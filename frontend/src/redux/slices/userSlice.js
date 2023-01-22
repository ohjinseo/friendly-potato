import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { registerAddIngredientAction } from "./addIngredientSlice";

// 회원가입 비동기 액션
export const registerUserAction = createAsyncThunk(
    "user/register",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.post(`${baseURL}/auth/register`, payload);
            dispatch(registerAddIngredientAction(data));
            return data;
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
            const { data } = await axios.post(`${baseURL}/auth/login`, payload);

            localStorage.setItem("userAuth", JSON.stringify(data));

            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (payload, { rejectWithValue }) => {
        try {
            localStorage.removeItem("userAuth");
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const userLoginFromStorage = localStorage.getItem("userAuth")
    ? JSON.parse(localStorage.getItem("userAuth")) : undefined;

const userSlices = createSlice({
    name: "users",
    initialState: {
        userAuth: userLoginFromStorage,
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
            state.userAuth = action.payload;
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
            state.userAuth = action.payload;
        })
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.isLogin = false;
        });


        // logout
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth = undefined;
        })
    }
})

export default userSlices.reducer;