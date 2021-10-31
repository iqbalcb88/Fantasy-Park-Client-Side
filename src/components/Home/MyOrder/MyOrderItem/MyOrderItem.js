import React from 'react';
import { Col, Row } from 'react-bootstrap';

const MyOrderItem = ({ item, handleDelete }) => {
  const { _id, name, price, quantity, status } = item;
  return (
    <Row className=' py-3'>
      <Col>
        <h4>OrderName: {name}</h4>
      </Col>
      <Col>
        <p>Price: {price}</p>
      </Col>
      <Col>
        <p>Quantity: {quantity}</p>
      </Col>
      <Col>
        <button className='btn btn-info'>{status}</button>
      </Col>
      <Col>
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
