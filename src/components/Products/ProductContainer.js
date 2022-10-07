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
    addToDb(id);
    const item = products.find((product) => product.id === id);
    const foundItem = cartItems.find((itm) => itm.id === item.id);
    if (foundItem) {
      foundItem.quantity = foundItem.quantity + 1;
      const newSets = cartItems.filter((itm) => itm.id !== foundItem.id);
      const newCart = [...newSets, foundItem];
      console.table(newCart);
      setCartItems(newCart);
    } else {
      item.quantity = 1;
      setCartItems((prev) => {
        return [...prev, item];
      });
    }
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
