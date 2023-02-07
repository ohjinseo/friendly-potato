import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authSlice',
    initialState: { token:false},
    reducers: {
        setToken: (state, action) => {
            state.token = true;
        }
    }
})

export default authSlice;