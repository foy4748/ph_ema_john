import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../App";

export default function Navbar() {
  const styleActive = {
    color: "var(--orange40)",
  };

  const { activeUser, logOutHandler } = useContext(userContext);

  const handleLogOut = () => {
    logOutHandler().then(() => {
      //setActiveUser(null);
      window.location.href = "/";
    });
  };

  //Nav Items
  const registerNavItem = (
    <li>
      <NavLink
        to="/register"
        style={({ isActive }) => (isActive ? styleActive : { color: "white" })}
      >
        Register
      </NavLink>
    </li>
  );
  const loginNavItem = (
    <li>
      <NavLink
        to="/login"
        style={({ isActive }) => (isActive ? styleActive : { color: "white" })}
      >
        Login
      </NavLink>
    </li>
  );
  const logoutNavItem = (
    <li onClick={handleLogOut}>
      <NavLink to="/">Logout</NavLink>
    </li>
  );

  return (
    <nav className={styles.navbarContainer}>
      <div>
        <img src="./logo.svg" alt="Ema john brand logo" />
      </div>
      <ul className={styles.navItemContainer}>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? styleActive : { color: "white" }
            }
            end
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            style={({ isActive }) =>
              isActive ? styleActive : { color: "white" }
            }
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/inventory"
            style={({ isActive }) =>
              isActive ? styleActive : { color: "white" }
            }
          >
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            style={({ isActive }) =>
              isActive ? styleActive : { color: "white" }
            }
          >
            About
          </NavLink>
        </li>
        {activeUser?.uid ? "" : registerNavItem}
        {activeUser?.uid ? logoutNavItem : loginNavItem}
      </ul>
    </nav>
  );
}
