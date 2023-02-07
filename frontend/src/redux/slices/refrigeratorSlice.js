import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { instance, onSilentRefresh } from "../../utils/config";

// 사용자 냉장고 생성
export const registerRefrigeratorAction = createAsyncThunk(
    "refrigerator/register",
    async (payload, { rejectWithValue, dispatch }) => {
        const config = {
            headers: {
                authorization: `Bearer ${payload.accessToken}`,
            }
        };

        try {
            const { data } = await instance.post(
                `${baseURL}/refrigerators`,
                {},
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
        const accessToken = localStorage.getItem("accessToken");

        const config = {
            headers: {
                authorization: `Bearer ${accessToken}`,
            }
        };

        try {
            const { data } = await instance.patch(
                `${baseURL}/refrigerators/add`,
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
export const refrigeratorDeleteAction = createAsyncThunk(
    "refrigerator/delete",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const accessToken = localStorage.getItem("accessToken");

        const config = {
            headers: {
                authorization: `Bearer ${accessToken}`,
            }
        };
        try {
            const { data } = await instance.patch(
                `${baseURL}/refrigerators/delete`,
                payload,
                config
            );

            dispatch(getRefrigeratorAction());
                
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// 사용자 냉장고 가져오기
export const getRefrigeratorAction = createAsyncThunk(
    "refrigerator/get",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            console.log("getRefrigeratorAction")
            const { data } = await instance.get(
                `${baseURL}/refrigerators`
                );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 냉장고 수정
export const refrigeratorUpdateAction = createAsyncThunk(
    "refrigerator/update",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const accessToken = localStorage.getItem("accessToken");

        const config = {
            headers: {
                authorization: `Bearer ${accessToken}`,
            }
        };
        try {
            const { data } = await instance.patch(
                `${baseURL}/refrigerators/update`,
                payload,
                config
            );

            dispatch(getRefrigeratorAction());
                
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

        // 냉장고 재료 수정하기
        builder.addCase(refrigeratorUpdateAction.pending, (state, action) => {
            state.loading = true;
            state.refrigeratorUpdate = false;
        })
        builder.addCase(refrigeratorUpdateAction.fulfilled, (state, action) => {
            state.loading = false;
            state.refrigeratorUpdate = true;
        })
        builder.addCase(refrigeratorUpdateAction.rejected, (state, action) => {
            state.loading = true;
            state.refrigeratorUpdate = false;
        })

        // 냉장고 재료 삭제하기
        builder.addCase(refrigeratorDeleteAction.pending, (state, action) => {
            state.loading = true;
            state.refrigeratorDelete = false;
        })
        builder.addCase(refrigeratorDeleteAction.fulfilled, (state, action) => {
            state.loading = false;
            state.refrigeratorDelete = true;
        })
        builder.addCase(refrigeratorDeleteAction.rejected, (state, action) => {
            state.loading = true;
            state.refrigeratorDelete = false;
            state.error = action.payload.message;
        })
    }
})

export default refrigeratorSlices.reducer;