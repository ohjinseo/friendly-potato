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

// 사용자 냉장고 

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
    }
})

export default refrigeratorSlices.reducer;