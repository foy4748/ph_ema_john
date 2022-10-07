import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const styleActive = {
    color: "var(--orange40)",
  };
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
      </ul>
    </nav>
  );
}
