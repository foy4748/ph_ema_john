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
        // Gotta Get Product informations from DB
        /*
        for (let _id in localItems) {
          const item = data.products.find((product) => product._id === _id);
          if (item) {
            item.quantity = localItems[_id];
            foundItems.push(item);
          }
        }
		*/
        const query = Object.keys(localItems);
        fetch(`${SERVER}/product-query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        })
          .then((res) => res.json())
          .then(({ error, products }) => {
            if (!error) {
              for (let _id in localItems) {
                const item = products.find((product) => product._id === _id);
                if (item) {
                  item.quantity = localItems[_id];
                  foundItems.push(item);
                }
              }
              const items = [...foundItems];
              setCartItems(items);
            }
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

  const addToCart = (id) => {
    addToDb(id);
    const item = products.find((product) => product._id === id);
    const foundItem = cartItems.find((itm) => itm.id === item._id);
    console.log(item);
    if (foundItem) {
      foundItem.quantity = foundItem.quantity + 1;
      const newSets = cartItems.filter((itm) => itm.id !== foundItem.id);
      const newCart = [...newSets, foundItem];
      console.table(newCart);
      setCartItems(newCart);
    } else {
      item.quantity = 1;
      const newCart = [...cartItems, item];
      setCartItems(newCart);
    }
  };

  if (!products || !products.length) {
    return <Loader />;
  }

  return (
    <section className={styles.productsContainer}>
      <aside className={styles.products}>
        {products.map((product) => (
          <Products key={product._id} addToCart={addToCart} product={product} />
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
