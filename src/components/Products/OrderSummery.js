import styles from "./OrderSummery.module.css";

function shippingChargeCalculator(price) {
  if (price <= 200) {
    return (price * 2) / 100;
  } else if (price <= 500) {
    return (price * 5) / 100;
  } else if (price <= 1000) {
    return (price * 10) / 100;
  } else if (price >= 1000) {
    return (price * 15) / 100;
  }
}

export default function OrderSummery({ cartItems }) {
  let numberOfItems = 0,
    price = 0,
    tax = 0,
    shippingCharge = 0,
    grandTotal = 0;

  if (cartItems.length !== 0) {
    numberOfItems = <p> Added products: {cartItems.length} </p>;
    price = cartItems.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
    tax = (price * 10) / 100;
    shippingCharge = shippingChargeCalculator(price);

    grandTotal = price + tax + shippingCharge;
  }

  return (
    <aside
      style={{
        padding: "0 1rem",
        border: "1px solid red",
        position: "relative",
      }}
    >
      <div style={{ position: "sticky", top: "1rem" }}>
        <h1 className={styles.title}>Order Summery</h1>
        <div>{numberOfItems}</div>
        <div className="summary">
          <p>Total Price: {price.toFixed(2)}</p>
          <p>Shipping Charge: {shippingCharge.toFixed(2)}</p>
          <p>Tax: {tax.toFixed(2)}</p>
          <p>Grand Total: {grandTotal.toFixed(2)}</p>
        </div>
      </div>
    </aside>
  );
}
