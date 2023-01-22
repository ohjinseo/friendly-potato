import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import addIngredientReducer from "./slices/addIngredientSlice";
import ingredientReducer from "./slices/ingredientSlice";

const store = configureStore({
    reducer: {userReducer, addIngredientReducer, ingredientReducer},
})

export default store;