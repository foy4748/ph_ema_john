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
  if (_localItems && _localItems.length > 1) {
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

export { addToDb, readFromDb, removeFromDb, deleteShoppingCart };
