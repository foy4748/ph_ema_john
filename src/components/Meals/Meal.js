import styles from "./Meal.module.css";

export default function Meal({ meal, addToCart }) {
  const { strMeal, strInstructions, strMealThumb } = meal;
  return (
    <div className={styles.mealItem}>
      <div>
        <img className={styles.imgFluid} src={strMealThumb} alt="" />
      </div>
      <div className={styles.info}>
        <h1>{strMeal}</h1>
        <p>{`${strInstructions.slice(1, 200)} Read More...`}</p>
      </div>
      <div className={styles.cartBtn} onClick={() => addToCart(meal)}>
        <button type="button" className={styles.flexItem}>
          Add to cart 🛒
        </button>
      </div>
    </div>
  );
}
