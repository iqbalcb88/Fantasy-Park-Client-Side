import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import AllOrderItem from './AllOrderItem/AllOrderItem';

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  // const { user } = useAuth();
  useEffect(() => {
    fetch('http://localhost:5000/allOrders')
      .then((res) => res.json())
      .then((data) => setAllOrders(data));
  }, []);
  console.log(allOrders);
  // delete item
  const handleDelete = (id) => {
    console.log('working');
    fetch(`http://localhost:5000/allOrders/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json)
      .then((data) => {
        if (data.deletedCount > 0) {
          const remainingOrders = allOrders.find((item) => item._id !== id);
          setAllOrders(remainingOrders);
          alert('Deleted Successfully');
        }
      });
  };
  // handle status btn
  // const handleStatusBtn = () => {};
  return (
    <Container>
      <h1>All Orders</h1>
      {allOrders.map((item) => (
        <AllOrderItem handleDelete={handleDelete} item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default AllOrders;
