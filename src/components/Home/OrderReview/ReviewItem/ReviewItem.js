import React from 'react';
import { Col, Row } from 'react-bootstrap';

const ReviewItem = ({ event, handleRemove }) => {
  const { name, price, quantity, _id } = event;

  return (
    // <div className='d-flex justify-content-between align-items-center border border-danger border-1 my-2 p-2'>
    <Row className=' py-3'>
      <Col>
        <h4>{name}</h4>
      </Col>
      <Col>
        <p>Price: {price}</p>
      </Col>
      <Col>
        <p>Quantity: {quantity}</p>
      </Col>
      <Col>
        <button onClick={() => handleRemove(_id)} className='btn btn-danger'>
          Remove Event
        </button>
      </Col>
    </Row>

    // </div>
  );
};

export default ReviewItem;
