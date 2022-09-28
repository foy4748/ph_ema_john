import styles from "./OrderSummery.module.css";

export default function OrderSummery({ cart }) {
  console.log(cart);
  return (
    <div className={styles.orderSummery}>
      <div className={styles.orderContent}>
        <h1 className={styles.title}>Order Summery</h1>
        <ol></ol>
      </div>
    </div>
  );
}
