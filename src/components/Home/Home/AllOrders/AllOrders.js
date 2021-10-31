import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import AllOrderItem from './AllOrderItem/AllOrderItem';

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  // const { user } = useAuth();
  useEffect(() => {
    fetch('https://gory-castle-80474.herokuapp.com/allOrders')
      .then((res) => res.json())
      .then((data) => setAllOrders(data));
  }, []);
  console.log(allOrders);
  // delete item
  const handleDelete = (id) => {
    console.log('working');
    const proceed = window.confirm('Are you Sure,Wanna Delete');
    if (proceed) {
      fetch(`https://gory-castle-80474.herokuapp.com/allOrders/${id}`, {
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
    }
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
