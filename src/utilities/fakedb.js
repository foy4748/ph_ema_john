const SERVER =
  process.env.REACT_APP_DEV_SERVER || process.env.REACT_APP_SERVER_ADDRESS;
// Loader function for "Orders" page
const orderLoader = async () => {
  const localCart = readFromDb();
  const currentData = [];
  const query = Object.keys(localCart);
  const res = await fetch(`${SERVER}/product-query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const data = await res.json();

  for (let id in localCart) {
    const foundItem = data.products.find((itm) => itm._id === id);
    if (foundItem) {
      foundItem.quantity = localCart[id];
      currentData.push(foundItem);
    }
  }
  return currentData;
};

// use local storage to manage cart data
const addToDb = (id) => {
  let shoppingCart = readFromDb();

  // add quantity
  const quantity = shoppingCart[id];
  if (quantity) {
    const newQuantity = quantity + 1;
    shoppingCart[id] = newQuantity;
  } else {
    shoppingCart[id] = 1;
  }
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

const readFromDb = () => {
  let localItems = {};

  const _localItems = localStorage.getItem("shopping-cart");
  if (_localItems && _localItems.length >= 1) {
    localItems = JSON.parse(_localItems);
  }

  return localItems;
};

const removeFromDb = (id) => {
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    const shoppingCart = JSON.parse(storedCart);
    if (id in shoppingCart) {
      delete shoppingCart[id];
      localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    }
  }
};

const deleteShoppingCart = () => {
  localStorage.removeItem("shopping-cart");
  window.location.reload();
};

export { addToDb, readFromDb, removeFromDb, deleteShoppingCart, orderLoader };
