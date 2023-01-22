import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

// 추가 목록 생성
export const registerAddIngredientAction = createAsyncThunk(
    "addIngredient/register",
    async (payload, { rejectWithValue, dispatch }) => {

        const config = {
            headers: {
                token: `Bearer ${payload.accessToken}`,
            }
        };
        try {
            const { data } = await axios.post(
                `${baseURL}/addIngredients`,
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

// 추가 목록 업데이트
export const updateAddIngredientAction = createAsyncThunk(
    "addIngredient/update",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const accessToken = getState().userReducer.userAuth.accessToken;
        const userId = getState().userReducer.userAuth.userId;

        const config = {
            headers: {
                token: `Bearer ${accessToken}`,
            }
        };
        try {
            const { data } = await axios.put(
                `${baseURL}/addIngredients/${userId}`,
                {
                    "userId": payload.userId,
                    "ingredients":payload.data
                },
                config
            );
                
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 추가 목록 비우기
export const emptyAddIngredientAction = createAsyncThunk(
    "addIngredient/empty",
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
                `${baseURL}/addIngredients/${userId}`,
                null,
                config
            );
                
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 추가 목록 가져오기
export const getAddIngredientAction = createAsyncThunk(
    "addIngredient/get",
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
                `${baseURL}/addIngredients/${userId}`,
                null,
                config
            );
                
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const addIngredientSlices = createSlice({
    name: "addIngredients",
    initialState: {},
    extraReducers: (builder) => {
        // 목록 생성
        builder.addCase(registerAddIngredientAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(registerAddIngredientAction.fulfilled, (state, action) => {
            state.loading = false;
            state.addIngredientList = action.payload;
        })
        builder.addCase(registerAddIngredientAction.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload.message;
        })

        // 목록 업데이트
        builder.addCase(updateAddIngredientAction.pending, (state, action) => {
            state.loading = true;
            state.updateAddIngredient = false;
        })
        builder.addCase(updateAddIngredientAction.fulfilled, (state, action) => {
            state.loading = false;
            state.updateAddIngredient = true;
        })
        builder.addCase(updateAddIngredientAction.rejected, (state, action) => {
            state.loading = true;
            state.updateAddIngredient = false;
            state.error = action.payload.message;
        })

        // 목록 비우기
        builder.addCase(emptyAddIngredientAction.pending, (state, action) => {
            state.loading = true;
            state.emptyAddIngredient = false;
        })
        builder.addCase(emptyAddIngredientAction.fulfilled, (state, action) => {
            state.loading = false;
            state.emptyAddIngredient = true;
        })
        builder.addCase(emptyAddIngredientAction.rejected, (state, action) => {
            state.loading = true;
            state.emptyAddIngredient = false;
            state.error = action.payload.message;
        })

         // 목록 가져오기
         builder.addCase(getAddIngredientAction.pending, (state, action) => {
            state.loading = true;
            state.getAddIngredient = false;
        })
        builder.addCase(getAddIngredientAction.fulfilled, (state, action) => {
            state.loading = false;
            state.addIngredientList = action.payload.data;
        })
        builder.addCase(getAddIngredientAction.rejected, (state, action) => {
            state.loading = true;
            state.getAddIngredient = false;
            state.error = action.payload.message;
        })
    }
})

export default addIngredientSlices.reducer;