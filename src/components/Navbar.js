import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbarContainer}>
      <div>
        <img src="./logo.svg" alt="Ema john brand logo" />
      </div>
      <ul className={styles.navItemContainer}>
        <li>
          <a href="/orders">Orders</a>
        </li>
        <li>
          <a href="/order-review">Order Review</a>
        </li>
        <li>
          <a href="/inventory">Manage Inventory</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
}
