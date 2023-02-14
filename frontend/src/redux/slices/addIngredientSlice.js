import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../utils/config";

// 추가 목록 생성
export const registerAddIngredientAction = createAsyncThunk(
    "addIngredient/register",
    async (payload, { rejectWithValue, dispatch }) => {

        const { accessToken } = payload;
        console.log(accessToken);
        instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        try {
            const { data } = await instance.post(
                `/addIngredients`,
                {}
            );
                
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

// 추가 목록 추가
export const addIngredientAddAction = createAsyncThunk(
    "addIngredient/add",
    async (payload, { rejectWithValue, getState, dispatch }) => {

        const userId = localStorage.getItem("userId");

        try {
            const { data } = await instance.patch(
                `/addIngredients/${userId}/add`,
                payload
            );

            dispatch(getAddIngredientAction());
                
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 추가 목록 삭제
export const addIngredientDeleteAction = createAsyncThunk(
    "addIngredient/delete",
    async (payload, { rejectWithValue, getState, dispatch }) => {

        const userId = localStorage.getItem("userId");

        try {
            const { data } = await instance.patch(
                `/addIngredients/${userId}delete`,
                payload
            );

            dispatch(getAddIngredientAction());
                
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 추가 목록 수정
export const addIngredientUpdateAction = createAsyncThunk(
    "addIngredient/update",
    async (payload, { rejectWithValue, getState, dispatch }) => {

        const userId = localStorage.getItem("userId");

        try {
            const { data } = await instance.patch(
                `/addIngredients/${userId}/update`,
                payload
            );

            dispatch(getAddIngredientAction());
                
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

        const userId = localStorage.getItem("userId");

        try {
            
            const { data } = await instance.patch(
                `/addIngredients/${userId}`,
                null
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

        const userId = localStorage.getItem("userId");

        try {
            const { data } = await instance.get(
                `/addIngredients/${userId}`
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

        // 목록 추가
        builder.addCase(addIngredientAddAction.pending, (state, action) => {
            state.loading = true;
            state.addIngredientAdd = false;
        })
        builder.addCase(addIngredientAddAction.fulfilled, (state, action) => {
            state.loading = false;
            state.addIngredientAdd = true;
        })
        builder.addCase(addIngredientAddAction.rejected, (state, action) => {
            state.loading = true;
            state.addIngredientAdd = false;
            state.error = action.payload.message;
        })

        // 목록 삭제
        builder.addCase(addIngredientDeleteAction.pending, (state, action) => {
            state.loading = true;
            state.addIngredientDelete = false;
        })
        builder.addCase(addIngredientDeleteAction.fulfilled, (state, action) => {
            state.loading = false;
            state.addIngredientDelete = true;
        })
        builder.addCase(addIngredientDeleteAction.rejected, (state, action) => {
            state.loading = true;
            state.addIngredientDelete = false;
            state.error = action.payload.message;
        })

        // 목록 수정
        builder.addCase(addIngredientUpdateAction.pending, (state, action) => {
            state.loading = true;
            state.addIngredientUpdate = false;
        })
        builder.addCase(addIngredientUpdateAction.fulfilled, (state, action) => {
            state.loading = false;
            state.addIngredientUpdate = true;
        })
        builder.addCase(addIngredientUpdateAction.rejected, (state, action) => {
            state.loading = true;
            state.addIngredientUpdate = false;
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
            state.addIngredientList = action.payload;
        })
        builder.addCase(getAddIngredientAction.rejected, (state, action) => {
            state.loading = true;
            state.getAddIngredient = false;
            state.error = action.payload.message;
        })
    }
})

export default addIngredientSlices.reducer;