import MyRefrigerator from "./pages/MyRefrigerator";
import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AddIngredient from "./pages/addIngredient/AddIngredient";
import "./App.css"
import SignInUp from "./pages/SignInUp";
import { useSelector } from "react-redux";
import RecipeList from "./pages/recipe/RecipeList";

const GlobalStyle = createGlobalStyle`
  ${reset}
`

const App = () => {
  const isAuthenticated = useSelector(state => state?.authReducer?.isAuthenticated);
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <MyRefrigerator /> : <SignInUp />} />
          <Route path="/add/ingredient" element={isAuthenticated ? <AddIngredient /> : <SignInUp />} />
          <Route path="/login" element={isAuthenticated ? <MyRefrigerator /> : <SignInUp />} />
          <Route path="/recipeList" element={isAuthenticated ? <RecipeList /> : <SignInUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App; 