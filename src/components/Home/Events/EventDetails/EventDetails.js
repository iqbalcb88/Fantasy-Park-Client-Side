import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/allEvents/${eventId}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));
  }, []);
  console.log(eventId);
  return (
    <Container>
      <Row className='d-flex justify-content-center my-5'>
        <Col xs={12} md={8}>
          <Card>
            <Card.Img className='img-fluid' variant='top' src={event.url} />

            <Card.Body>
              <Card.Title>
                <span className='fs-4 fw-bolder'>Event Name:</span>
                {event.name}
              </Card.Title>

              <Card.Text>
                {' '}
                <span className='fs-4 fw-bolder'>Full Description:</span>{' '}
                {event.details}
              </Card.Text>
            </Card.Body>
            <Card.Footer className='d-flex justify-content-start bg-light'>
              <button className='btn btn-warning'>
                <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
              </button>

              <br />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventDetails;
