import {
  faCartPlus,
  faInfo,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Event = ({ event, handleDelete, handleAddToCart }) => {
  const { _id, name, details, price, url } = event;
  return (
    <Col>
      <Card>
        <Card.Img className='img-fluid' variant='top' src={url} />

        <Card.Body>
          <Card.Title>Event Name: {name}</Card.Title>
          <Card.Title>Ticket Price: {price}TK.</Card.Title>
          <Card.Text>{details.slice(0, 120)}...</Card.Text>
        </Card.Body>
        <Card.Footer className='d-flex justify-content-between bg-light'>
          <button
            onClick={() => {
              handleAddToCart(event);
            }}
            className='btn btn-warning'
          >
            <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
          </button>
          <Link to={`/details/${_id}`}>
            <button className='btn btn-info'>
              <FontAwesomeIcon icon={faInfoCircle} />
              &nbsp; See More
            </button>
          </Link>
          <br />
          <button
            onClick={() => {
              handleDelete(_id);
            }}
            className='btn btn-outline-danger  rounded-circle'
          >
            X
          </button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Event;
