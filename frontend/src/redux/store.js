import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import addIngredientReducer from "./slices/addIngredientSlice";
import ingredientReducer from "./slices/ingredientSlice";
import refrigeratorReducer from "./slices/refrigeratorSlice";
import navbarSlice from "./slices/navbarSlice";

const store = configureStore({
    reducer: {
        userReducer,
        addIngredientReducer,
        ingredientReducer,
        refrigeratorReducer,
        navbarReducer: navbarSlice.reducer
    },
})

export default store;