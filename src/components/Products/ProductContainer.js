import { useState, useEffect } from "react";

import styles from "./ProductContainer.module.css";

import Products from "./Products";
import OrderSummery from "./OrderSummery";
import Loader from "../Loader";

import { addToDb, readFromDb } from "../../utilities/fakedb";

const SERVER =
  process.env.REACT_APP_SERVER_ADDRESS || process.env.REACT_APP_DEV_SERVER;

export default function ProductContainer() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [count, setCount] = useState(0);

  const pages = Math.ceil(+count / +size) || 1;
  const emptyArray = Array.from(Array(pages).keys());

  useEffect(() => {
    fetch(`${SERVER}/products?p=${page}&s=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
        const localItems = readFromDb();
        const foundItems = [];
        for (let _id in localItems) {
          const item = data.products.find((product) => product._id === _id);
          console.log("Found", item);
          if (item) {
            item.quantity = localItems[_id];
            foundItems.push(item);
          }
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
  }, [page, size]);

  console.log(products);

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

  if (!products || !products.length) {
    return <Loader />;
  }

  return (
    <section className={styles.productsContainer}>
      <aside className={styles.products}>
        {products.map((product) => (
          <Products key={product.id} addToCart={addToCart} product={product} />
        ))}
        <div className={styles.paginationBar}>
          {emptyArray.map((num) => {
            return (
              <p
                key={num}
                onClick={() => setPage(num)}
                className={`${styles.pageButton} ${
                  +num === +page ? "active" : ""
                }`}
              >
                {num + 1}
              </p>
            );
          })}
        </div>
      </aside>
      <OrderSummery cartItems={cartItems}></OrderSummery>
    </section>
  );
}
