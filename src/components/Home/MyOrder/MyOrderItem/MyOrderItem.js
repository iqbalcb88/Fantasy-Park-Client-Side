import React from 'react';
import { Col, Row } from 'react-bootstrap';

const MyOrderItem = ({ item, handleDelete }) => {
  const { _id, name, price, quantity, status } = item;
  return (
    <Row className=' py-3'>
      <Col xs={3}>
        <h4>OrderName: {name}</h4>
      </Col>
      <Col xs={2}>
        <p>Price: {price}</p>
      </Col>
      <Col xs={2}>
        <p>Quantity: {quantity}</p>
      </Col>
      <Col xs={2}>
        <button className='btn btn-info'>{status}</button>
      </Col>
      <Col xs={3}>
        <button
          onClick={() => {
            handleDelete(_id);
          }}
          className='btn btn-danger'
        >
          Remove Event
        </button>
      </Col>
    </Row>
  );
};

export default MyOrderItem;
