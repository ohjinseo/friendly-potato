import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

// 사용자 냉장고 생성
export const registerRefrigeratorAction = createAsyncThunk(
    "refrigerator/register",
    async (payload, { rejectWithValue, dispatch }) => {
        const config = {
            headers: {
                token: `Bearer ${payload.accessToken}`,
            }
        };

        try {
            const { data } = await axios.post(
                `${baseURL}/refrigerators`,
                {
                    "userId": payload.userId,
                },
                config
            );
                
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

// 사용자 냉장고 재료 추가
export const refrigeratorAddAction = createAsyncThunk(
    "refrigerator/add",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const accessToken = getState().userReducer.userAuth.accessToken;
        const userId = getState().userReducer.userAuth.userId;

        const config = {
            headers: {
                token: `Bearer ${accessToken}`,
            }
        };

        try {
            const { data } = await axios.patch(
                `${baseURL}/refrigerators/add/${userId}`,
                payload,
                config
            );
                
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 사용자 냉장고 재료 삭제

// 사용자 냉장고 가져오기
export const getRefrigeratorAction = createAsyncThunk(
    "refrigerator/get",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const accessToken = getState().userReducer.userAuth.accessToken;
        const userId = getState().userReducer.userAuth.userId;

        const config = {
            headers: {
                token: `Bearer ${accessToken}`,
            }
        };
        try {
            const { data } = await axios.get(
                `${baseURL}/refrigerators/${userId}`,
                config
            );
                
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const refrigeratorSlices = createSlice({
    name: "refrigerators",
    initialState: {},
    extraReducers: (builder) => {
        // 목록 생성
        builder.addCase(registerRefrigeratorAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(registerRefrigeratorAction.fulfilled, (state, action) => {
            state.loading = false;
            state.refrigerator = action.payload;
        })
        builder.addCase(registerRefrigeratorAction.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload.message;
        })

        // 냉장고 재료 추가
        builder.addCase(refrigeratorAddAction.pending, (state, action) => {
            state.loading = true;
            state.refrigeratorAdd = false;
        })
        builder.addCase(refrigeratorAddAction.fulfilled, (state, action) => {
            state.loading = false;
            state.refrigeratorAdd = true;
            state.refrigerator = action.payload;
        })
        builder.addCase(refrigeratorAddAction.rejected, (state, action) => {
            state.loading = true;
            state.refrigeratorAdd = false;
            state.error = action.payload.message;
        })

        // 냉장고 가져오기
        builder.addCase(getRefrigeratorAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getRefrigeratorAction.fulfilled, (state, action) => {
            state.loading = false;
            state.refrigerator = action.payload;
        })
        builder.addCase(getRefrigeratorAction.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload.message;
        })
    }
})

export default refrigeratorSlices.reducer;