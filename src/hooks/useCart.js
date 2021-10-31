import React, { useEffect, useState } from 'react';
import { getStoredCart } from '../cartOperation/cartOperation';

const useCart = () => {
  const [cart, setCart] = useState([]);
  const savedCart = getStoredCart();
  // console.log(savedCart);
  const ids = Object.keys(savedCart);
  // console.log(ids);
  useEffect(() => {
    fetch('https://gory-castle-80474.herokuapp.com/allEvents/byIds', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((events) => {
        // console.log(events);
        if (events.length) {
          const storedCart = [];
          for (const id in savedCart) {
            const addedEvent = events.find((event) => event._id === id);
            if (addedEvent) {
              const quantity = savedCart[id];
              addedEvent.quantity = quantity;
              storedCart.push(addedEvent);
            }
          }
          setCart(storedCart);
        }
      });
  }, []);

  return [cart, setCart];
};

export default useCart;
