import MyRefrigerator from "./pages/MyRefrigerator";
import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddIndegrient from "./pages/addIndegrient/AddIndegrient";
import "./App.css"

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
          <Route path="/add/ingredient" element={<AddIndegrient />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App; 