import { useState, useEffect } from "react";
import styles from "./MealsContainer.module.css";
import Meal from "./Meal";
import OrderSummery from "./OrderSummery";

export default function MealsContainer() {
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=a";
    fetch(URL)
      .then((res) => res.json())
      .then(({ meals }) => setMeals(meals));
  }, []);

  const addToCart = (cartObj) => {
    const { idMeal } = cartObj;
    setCart((curr) => {
      if (curr[idMeal] && curr[idMeal] >= 1) {
        curr[idMeal] += 1;
        return { ...curr };
      } else {
        curr[idMeal] = 1;
        return { ...curr };
      }
    });
  };

  return (
    <section className={styles.mealsContainer}>
      <aside className={styles.mealContainer}>
        {meals.map((meal) => (
          <Meal key={meal.idMeal} addToCart={addToCart} meal={meal} />
        ))}
      </aside>
      <OrderSummery cart={cart}></OrderSummery>
    </section>
  );
}
