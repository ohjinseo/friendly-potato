import Navbar from "./components/Navbar";
import Board from "./pages/Board";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App; 