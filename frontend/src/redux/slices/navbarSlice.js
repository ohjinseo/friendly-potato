import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name: 'navbarSlice',
    initialState: { selectedMenu: 0 },
    reducers: {
        change: (state, action) => {
            state.selectedMenu = action.payload;
        }
    }
})

export default navbarSlice;