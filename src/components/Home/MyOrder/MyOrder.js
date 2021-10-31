import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import MyOrderItem from './MyOrderItem/MyOrderItem';

const MyOrder = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    fetch('http://localhost:5000/allOrders')
      .then((res) => res.json())
      .then((data) => setMyOrders(data));
  }, []);
  // console.log(myOrders);
  // delete item
  const handleDelete = (id) => {
    console.log('working');
    fetch(`http://localhost:5000/allOrders/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json)
      .then((data) => {
        if (data.deletedCount > 0) {
          const remainingOrders = myOrders.find((item) => item._id !== id);
          setMyOrders(remainingOrders);
          alert('Deleted Successfully');
        }
      });
  };
  return (
    <Container>
      <h1>My Order</h1>
      {myOrders.map(
        (item) =>
          item?.email === user?.email && (
            <MyOrderItem
              handleDelete={handleDelete}
              item={item}
              key={item._id}
            />
          )
      )}
    </Container>
  );
};

export default MyOrder;
