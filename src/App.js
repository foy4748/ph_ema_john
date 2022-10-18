//import logo from './logo.svg';

//Global CSS goes here
import "./App.css";
import { createContext, useState, useEffect } from "react";

//Components
import ProductContainer from "./components/Products/ProductContainer";
import MainLayout from "./components/MainLayout";
import Orders from "./components/Orders";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import Inventory from "./components/Inventory";
import PrivateRoute from "./components/PrivateRoute";

//Authentication Purpose
import firebaseApp from "./firebase.config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//------------------------
//import MealsContainer from "./components/Meals/MealsContainer";
//import Navbar from "./components/Navbar";

//Importing Router packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// GOTTA USE CONTEXT API LATER
const userContext = createContext();
export { userContext };
const auth = getAuth(firebaseApp);

function App() {
  const [activeUser, setActiveUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Authentication Handlers
  const registerHandler = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginHandler = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOutHandler = () => {
    return signOut(auth);
  };
  //------------------------

  //For Persistant Logged In status
  useEffect(() => {
    const persist = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setActiveUser(user);
        }
        setLoading(false);
      });
    };

    return () => persist();
  }, [activeUser]);

  const contextPayload = {
    activeUser,
    setActiveUser,
    logOutHandler,
    loading,
    setLoading,
  };
  return (
    <div>
      <userContext.Provider value={contextPayload}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<ProductContainer />} />
              <Route
                path="register"
                element={<Register registerHandler={registerHandler} />}
              />
              <Route
                path="login"
                element={<Login loginHandler={loginHandler} />}
              />
              <Route
                path="orders"
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              />
              <Route path="about" element={<About />} />
              <Route
                path="inventory"
                element={
                  <>
                    <PrivateRoute>
                      <Inventory />
                    </PrivateRoute>
                  </>
                }
              />
            </Route>
          </Routes>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;
//<MealsContainer></MealsContainer>
