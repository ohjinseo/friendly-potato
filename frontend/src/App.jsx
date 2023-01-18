import MyRefrigerator from "./pages/MyRefrigerator";
import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App; 