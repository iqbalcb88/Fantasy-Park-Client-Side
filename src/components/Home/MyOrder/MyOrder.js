import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import MyOrderItem from './MyOrderItem/MyOrderItem';

const MyOrder = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    fetch('https://gory-castle-80474.herokuapp.com/allOrders')
      .then((res) => res.json())
      .then((data) => setMyOrders(data));
  }, []);
  // console.log(myOrders);
  // delete item
  const handleDelete = (id) => {
    // console.log('working');
    const proceed = window.confirm('Are you Sure,Wanna Delete');
    if (proceed) {
      fetch(`https://gory-castle-80474.herokuapp.com/allOrders/${id}`, {
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
    }
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
