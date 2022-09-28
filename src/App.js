//import logo from './logo.svg';

import "./App.css";
import Navbar from "./components/Navbar";
//import ProductContainer from "./components/Products/ProductContainer";
import MealsContainer from "./components/Meals/MealsContainer";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <MealsContainer></MealsContainer>
    </div>
  );
  //<ProductContainer></ProductContainer>
}

export default App;
