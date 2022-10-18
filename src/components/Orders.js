import { orderLoader } from "../utilities/fakedb";
import { useEffect, useState } from "react";
export default function Orders() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const foundData = await orderLoader();
      setCartItems(foundData);
    };
    loadData();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <section
        style={{
          display: "flex",
          flexFlow: "column",
          maxWidth: "50rem",
          margin: "0 auto",
        }}
      >
        {cartItems.map((item, idx) => {
          const { name, quantity, price, shipping, img, id } = item;
          return (
            <div
              style={{ display: "flex", border: "1px solid red" }}
              key={`${id}${idx}`}
            >
              <img src={img} alt={name} style={{ width: "50%" }} />
              <div>
                <p>{name}</p>
                <p>Quantity: {quantity}</p>
                <p>Price: ${price}</p>
                <p>Shipping Charge: ${shipping}</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
