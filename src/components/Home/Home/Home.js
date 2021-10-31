import {
  faFlagUsa,
  faHotel,
  faLocationArrow,
  faTicketAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react';
import { Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';

import Events from '../Events/Events';
import CenterMode from '../SlickSlider/SlickSlider';
import './Home.css';

const Home = () => {
  const { createWithEmailPass, setUser, setIsLoading } = useAuth();
  const location = useLocation();
  const history = useHistory();
  const redirect_uri = location.state?.from || '/home';
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    createWithEmailPass(data.email, data.password)
      .then((result) => {
        setUser(result.user);
        history.push(redirect_uri);
      })
      .finally(() => {
        setIsLoading(false);
      });
    handleShow();
    reset();
    console.log(data);
  };
  const { isLoading } = useAuth();
  if (isLoading) {
    return (
      <Container className='d-flex align-items-center justify-content-center bg-danger my-5 py-5'>
        <Spinner animation='grow' variant='warning' />;
      </Container>
    );
  }
  return (
    <>
      <Container
        fluid
        className='style-img d-flex justify-content-center align-items-center'
      >
        <Row
          xs={1}
          sm={2}
          md={2}
          className='style-1 d-flex justify-content-center align-items-center'
        >
          <Col className=''>
            <div className='mt-5'>
              <p className='text-center display-4 heading fw-thin'>
                WELCOME TO FANTASY PARK
              </p>
              <h4 className='text-center py-3'>
                THE GREATEST WATER AND AMUSEMENT PARK IN THE WORLD!!!
              </h4>
            </div>
          </Col>
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Successfully Registered</Modal.Title>
              </Modal.Header>
              <Modal.Body>Thank you for Registration!</Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
          <Col className='style-2'>
            <form
              className=' d-flex justify-content-center align-items-center flex-column py-2'
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className='w-75 mb-1 '
                placeholder='Name'
                {...register('name')}
              />
              <input
                className='w-75 my-1 '
                placeholder='Password'
                type='password'
                {...register('password')}
              />
              <input
                className='w-75 my-1 '
                placeholder='Email Address'
                type='email'
                {...register('email')}
              />

              <select className='w-75 my-1 ' {...register('gender')}>
                <option value='gender'>Gender</option>
                <option value='female'>female</option>
                <option value='male'>male</option>
                <option value='other'>other</option>
              </select>
              <input className='w-75 my-1 ' type='submit' value='Register' />
            </form>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row xs={12} className='third-section'>
          <Col className='section-item'>
            <FontAwesomeIcon icon={faTicketAlt} size='2x' />
            <h4>Tickets</h4>
          </Col>
          <Col className='section-item'>
            <FontAwesomeIcon icon={faFlagUsa} size='2x' />
            <h4>Package</h4>
          </Col>
          <Col className='section-item'>
            <FontAwesomeIcon icon={faLocationArrow} size='2x' />
            <h4>Office</h4>
          </Col>
          <Col className='section-item'>
            <FontAwesomeIcon icon={faHotel} size='2x' />
            <h4>Resort</h4>
          </Col>
        </Row>
      </Container>
      <CenterMode />

      <Events />
    </>
  );
};

export default Home;
