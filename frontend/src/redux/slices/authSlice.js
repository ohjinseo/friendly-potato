import { createSlice } from "@reduxjs/toolkit";

const isAuthenticated = localStorage.getItem("userId") ? true : false;

const authSlice = createSlice({
    name: 'authSlice',
    initialState: { isAuthenticated, token:false },
    reducers: {
        setAuthenticated : (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
})

export default authSlice;