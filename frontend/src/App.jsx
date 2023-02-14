import MyRefrigerator from "./pages/MyRefrigerator";
import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AddIngredient from "./pages/addIngredient/AddIngredient";
import "./App.css"
import SignInUp from "./pages/SignInUp";
import { useSelector } from "react-redux";
import RecipeList from "./pages/recipeList/RecipeList";
import Recipe from "./pages/recipe/Recipe";

const GlobalStyle = createGlobalStyle`
  ${reset}
`

const App = () => {
  const isAuthenticated = useSelector(state => state?.authReducer?.isAuthenticated);
  const token = useSelector(state => state?.authReducer?.token);
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <MyRefrigerator /> : <SignInUp />} />
          <Route path="/add/ingredient" element={isAuthenticated ? <AddIngredient /> : <SignInUp />} />
          <Route path="/login" element={isAuthenticated ? <MyRefrigerator /> : <SignInUp />} />
          <Route path="/recipeList" element={isAuthenticated ? <RecipeList /> : <SignInUp />} />
          <Route path="/recipe/:recipeId" element={isAuthenticated ? <Recipe /> : <SignInUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App; 