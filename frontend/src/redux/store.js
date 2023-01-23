import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import addIngredientReducer from "./slices/addIngredientSlice";
import ingredientReducer from "./slices/ingredientSlice";
import refrigeratorReducer from "./slices/refrigeratorSlice";

const store = configureStore({
    reducer: {
        userReducer,
        addIngredientReducer,
        ingredientReducer,
        refrigeratorReducer
    },
})

export default store;