import styles from "./Products.module.css";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Products({ addToCart, product }) {
  const { _id, img, name, price, seller, ratings } = product;
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
      </div>
      <div className={styles.addToCartBtn}>
        <button
          onClick={() => {
            addToCart(_id);
          }}
          type="button"
        >
          Add to cart <FontAwesomeIcon icon={faCartPlus} />
        </button>
      </div>
    </div>
  );
}
