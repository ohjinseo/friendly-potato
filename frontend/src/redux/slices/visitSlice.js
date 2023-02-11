import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../utils/config";

export const registerVisitAction = createAsyncThunk(
    "visit/register",
    async (payload, { rejectWithValue, dispatch }) => {

        const userId = localStorage.getItem("userId");

        console.log(payload);

        try {
            const { data } = await instance.post(
                `/visits/${userId}`,
                payload
            );

            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
)


const visitSlices = createSlice({
    name: "visits",
    initialState: {},
    extraReducers: (builder) => {
        // 방문 생성
        builder.addCase(registerVisitAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(registerVisitAction.fulfilled, (state, action) => {
            state.loading = false;
            state.visitInfo = action.payload;
        })
        builder.addCase(registerVisitAction.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload.message;
        })
    }
})

export default visitSlices.reducer;