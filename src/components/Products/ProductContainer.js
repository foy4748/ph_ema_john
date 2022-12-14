import { useState, useEffect } from "react";

import styles from "./ProductContainer.module.css";

import Products from "./Products";
import OrderSummery from "./OrderSummery";

import { addToDb, readFromDb } from "../../utilities/fakedb";

export default function ProductContainer() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("./fakeData/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const localItems = readFromDb();
        const foundItems = [];
        for (let id in localItems) {
          const item = data.find((product) => product.id === id);
          item.quantity = localItems[id];
          foundItems.push(item);
        }
        setCartItems(() => {
          return [...foundItems];
        });
      })
      .catch((error) => {
        const errorObj = {
          error: true,
          message: error.message,
        };
        setProducts(errorObj);
      });
  }, []);

  const addToCart = (id) => {
    setCartItems((prev) => {
      const item = products.find((product) => product.id === id);
      item.quantity = 1;
      return [...prev, item];
    });
    addToDb(id);
  };

  return (
    <section className={styles.productsContainer}>
      <aside className={styles.products}>
        {products.map((product) => (
          <Products key={product.id} addToCart={addToCart} product={product} />
        ))}
      </aside>
      <OrderSummery cartItems={cartItems}></OrderSummery>
    </section>
  );
}
