import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { instance } from "../../utils/config";

// 재료 카테고리 별로 가져오기
export const getIngredientAction = createAsyncThunk(
    "ingredient/get",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            console.log("hel");
            const { data } = await instance.get(
                `/ingredients?category=${payload.category}`
            );

                
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const ingredientSlices = createSlice({
    name: "ingredients",
    initialState: {},
    extraReducers: (builder) => {
         // 목록 가져오기
         builder.addCase(getIngredientAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getIngredientAction.fulfilled, (state, action) => {
            state.loading = false;
            state.ingredients = action.payload;
        })
        builder.addCase(getIngredientAction.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload.message;
        })
    }
})

export default ingredientSlices.reducer;