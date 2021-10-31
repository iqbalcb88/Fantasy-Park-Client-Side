import { computeHeadingLevel } from '@testing-library/dom';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const AllOrderItem = ({ item, handleDelete }) => {
  const { _id, name, email, quantity, status } = item;
  return (
    <Row className=' py-3 overflow-hidden'>
      <Col>
        <p>OrderName: {name}</p>
      </Col>
      <Col>
        <p>Email: {email}</p>
      </Col>
      <Col>
        <p>Quantity: {quantity}</p>
      </Col>
      <Col>
        <button
          onClick={(e) => {
            if (e.target.innerHTML === 'Approved') {
              e.target.innerHTML = 'Pending';
            } else if (e.target.innerHTML === 'Pending') {
              e.target.innerHTML = 'Approved';
            } else {
            }
          }}
          className='btn btn-info'
        >
          {status}
        </button>
      </Col>
      <Col>
        <button
          onClick={(e) => {
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

export default AllOrderItem;
