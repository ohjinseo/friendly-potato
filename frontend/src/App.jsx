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
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyRefrigerator />} />
          <Route path="/add/ingredient" element={<AddIngredient />} />
          <Route path="/login" element={<SignInUp />} />
          <Route path="/recipeList" element={<RecipeList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App; 