import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

// 레시피 요청
export const getRecipeAction = createAsyncThunk(
    "recipe/get",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.get(
                `${baseURL}/recipes?title=${payload.title}&page=${payload.page}`
            );
                
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

const recipeSlices = createSlice({
    name: "recipes",
    initialState: {
        recipes: [],
        selectedIngredient: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getRecipeAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getRecipeAction.fulfilled, (state, action) => {
            state.loading = false;
            state.recipes = action.payload;
        })
        builder.addCase(getRecipeAction.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload.message;
        })
    },
    reducers: {
        add: (state, action) => {
            state.selectedIngredient.push(action.payload);
        },
        delete: (state, action) => {
            for(let i = 0; i < state.selectedIngredient.length; i++) {
                if(state.selectedIngredient[i] === action.payload)  {
                    state.selectedIngredient.splice(i, 1);
                    break;
                }
              }
        }
    }
});

export default recipeSlices;