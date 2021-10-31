// save Object ids in local storage
const addToLocalStorage = (id) => {
  // localStorage.setItem('cart', JSON.stringify(id));
  const exists = getIds();
  let shopping_cart = {};
  if (!exists) {
    shopping_cart[id] = 1;
  } else {
    shopping_cart = JSON.parse(exists);
    if (shopping_cart[id]) {
      const newCount = shopping_cart[id] + 1;
      shopping_cart[id] = newCount;
    } else {
      shopping_cart[id] = 1;
    }
  }
  updateLocalStorage(shopping_cart);
};
const getIds = () => localStorage.getItem('shopping_cart');

const updateLocalStorage = (cart) => {
  localStorage.setItem('shopping_cart', JSON.stringify(cart));
};
const removeFromLocalStorage = (id) => {
  const exists = getIds();
  if (!exists) {
  } else {
    const shopping_cart = JSON.parse(exists);
    delete shopping_cart[id];
    updateLocalStorage(shopping_cart);
  }
};
const getStoredCart = () => {
  const exists = getIds();
  return exists ? JSON.parse(exists) : {};
};

const clearTheCart = () => {
  localStorage.removeItem('shopping_cart');
};

export {
  addToLocalStorage,
  removeFromLocalStorage,
  clearTheCart,
  getStoredCart,
};
