import styles from "./OrderSummery.module.css";

export default function OrderSummery({ cartItems }) {
  let numberOfItems = "";
  let costObj = { price: 0, tax: 0, shippingCharge: 0 };

  if (cartItems.length !== 0) {
    numberOfItems = <p> Added products: {cartItems.length} </p>;
    cartItems.reduce((acc, { price, shipping }) => {
      acc.price += price;
      acc.shippingCharge += shipping;
      return acc;
    }, costObj);
  }

  const { price, shippingCharge } = costObj;
  const tax = (price * 10) / 100;
  const grandTotal = price + shippingCharge + tax;

  return (
    <aside className={styles.orderSummeryContainer}>
      <div className={styles.orderSummery}>
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
