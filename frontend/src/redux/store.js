import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import addIngredientReducer from "./slices/addIngredientSlice";
import ingredientReducer from "./slices/ingredientSlice";
import refrigeratorReducer from "./slices/refrigeratorSlice";
import navbarSlice from "./slices/navbarSlice";
import recipeSlices from "./slices/recipeSlice";

const store = configureStore({
    reducer: {
        userReducer,
        addIngredientReducer,
        ingredientReducer,
        refrigeratorReducer,
        navbarReducer: navbarSlice.reducer,
        recipeReducer: recipeSlices.reducer,
    },
})

export default store;