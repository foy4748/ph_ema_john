import styles from "./OrderSummery.module.css";

export default function OrderSummery({ cartItems }) {
  let numberOfItems = "";
  let costObj = { price: 0, tax: 0, shippingCharge: 0, quantity: 0 };

  if (cartItems.length !== 0) {
    //Calculating Cost from Props
    cartItems.reduce((acc, { price, quantity, shipping }) => {
      acc.price = acc.price + price * quantity;
      acc.shippingCharge = acc.shippingCharge + shipping * quantity;
      acc.quantity = acc.quantity + quantity;
      return acc;
    }, costObj);
    numberOfItems = <p> Added products: {costObj.quantity} </p>;
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
