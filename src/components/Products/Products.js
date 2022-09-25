import styles from "./Products.module.css";

export default function Products({ addToCart, product }) {
  const { id, img, name, price, seller, ratings } = product;
  return (
    <div className={styles.card}>
      <img src={img} alt={name} className={styles.imgFluid} />
      <div className={styles.productInfo}>
        <div className="titles">
          <h1>{name}</h1>
          <p>Price: {price}</p>
        </div>
        <div className={styles.cardFooter}>
          <p>Manufacturar: {seller}</p>
          <p>Ratings: {ratings}</p>
        </div>
        <div className={styles.addToCartBtn}>
          <button
            onClick={() => {
              addToCart(id);
            }}
            type="button"
          >
            {" "}
            Add to cart{" "}
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
