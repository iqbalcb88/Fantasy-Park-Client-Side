import React from 'react';
import './Cart.css';

const Cart = (props) => {
  const { cart } = props;
  // const totalReducer = (previous, product) => previous + product.price;
  // const total = cart.reduce(totalReducer, 0);
  let totalQuantity = 0;
  let total = 0;
  for (const item of cart) {
    if (!item.quantity) {
      item.quantity = 1;
    }
    total = total + item.price * item.quantity;
    totalQuantity = totalQuantity + item.quantity;
  }

  const shipping = total > 0 ? 30 : 0;
  const tax = (total + shipping) * 0.08;
  const grandTotal = total + shipping + tax;
  return (
    <div>
      <h3>Order Summary</h3>
      <h5>Items Ordered: {totalQuantity}</h5>
      <br />
      <p>Total: {total.toFixed(2)}</p>
      <p>Shipping: {shipping}</p>
      <p>tax: {tax.toFixed(2)}</p>
      <p>Grand Total: {grandTotal.toFixed(2)}</p>
      {props.children}
    </div>
  );
};

export default Cart;
