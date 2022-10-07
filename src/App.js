//import logo from './logo.svg';

import "./App.css";
import ProductContainer from "./components/Products/ProductContainer";
import MainLayout from "./components/MainLayout";
import About from "./components/About";

//import MealsContainer from "./components/Meals/MealsContainer";
//import Navbar from "./components/Navbar";

//Importing Router packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ProductContainer />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
//<MealsContainer></MealsContainer>
