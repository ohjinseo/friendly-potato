import MyRefrigerator from "./pages/MyRefrigerator";
import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AddIndegrient from "./pages/addIndegrient/AddIndegrient";
import "./App.css"
import SignInUp from "./pages/SignInUp";
import { useSelector } from "react-redux";

const GlobalStyle = createGlobalStyle`
  ${reset}
`

const App = () => {
  const { userAuth } = useSelector(state => state.userReducer);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={userAuth ? <MyRefrigerator /> : <SignInUp />} />
          <Route path="/add/ingredient" element={userAuth ? <AddIndegrient /> : <SignInUp />} />
          <Route path="/login" element={userAuth ? <Navigate to="/" /> : <SignInUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App; 