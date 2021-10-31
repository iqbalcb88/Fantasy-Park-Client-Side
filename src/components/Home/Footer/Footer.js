import {
  faEnvelopeOpen,
  faHome,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Accordion, Col, Container, Row, Table } from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import { Link } from 'react-router-dom';
import logo from '../../../images/logoNew.png';

const Footer = () => {
  return (
    <div className='bg-light'>
      <Container fluid className='bg-dark pt-5'>
        <Row>
          <Col xs={12} md={3}>
            <div className='d-flex justify-content-end align-items-center'>
              <img width='280' className='img-fluid' src={logo} alt='' />
            </div>
          </Col>
          <Col xs={12} md={3} className='text-white'>
            <h2 className='text-center'>Anything and Everything </h2>
            <h4 className='text-center'>about </h4>
            <h1 className='text-danger text-center'>FantasyPark</h1>

            <p>
              Do you have questions about the park before you even visit? Here
              you can find information about tickets, season passes, hours,
              calendar, park map and much, much more. If you can't find what you
              are looking for, please call our operator line and they will help
              assist you.
            </p>
          </Col>
          <Col className='text-white' xs={12} md={3}>
            <h2>Important Links</h2>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>
                    <Link
                      className='text-decoration-none text-muted'
                      className='text-decoration-none text-muted'
                      to='/event'
                    >
                      <h6 className='text-danger'>Buy Tickets</h6>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link
                      className='text-decoration-none text-muted'
                      to='/event'
                    >
                      <h6 className='text-info'>Book For Program</h6>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    {' '}
                    <Link
                      className='text-decoration-none text-muted'
                      to='/event'
                    >
                      <h6 className='text-danger'>Family Package</h6>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link
                      className='text-decoration-none text-muted'
                      to='/home'
                    >
                      <h6 className='text-info'>Book Ride</h6>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link
                      className='text-decoration-none text-muted'
                      to='/home'
                    >
                      <h6 className='text-danger'>Book Resort</h6>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col className='text-white' xs={12} md={3}>
            <div>
              <h2>Contact Us</h2>
            </div>
            <div className='d-flex align-items-center justify-content-start'>
              <FontAwesomeIcon
                className='p-3 border rounded me-2 border-2 text-white'
                icon={faHome}
                size='4x'
              />
              <div>
                <h4>ADDRESS</h4>
                <p>
                  {' '}
                  <small>C-9, Mrc Castle,Bagichagaon,Cumilla.</small>{' '}
                </p>
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-start'>
              <FontAwesomeIcon
                className='p-3 border rounded me-2 border-2 text-white'
                icon={faPhone}
                size='4x'
              />
              <div>
                <h4>PHONE</h4>
                <p>+880-1995695139</p>
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-start'>
              <FontAwesomeIcon
                className='p-3 border rounded me-2 border-2 text-white'
                icon={faEnvelopeOpen}
                size='4x'
              />
              <div>
                <h4>Email</h4>
                <p>iqbal.cb88@gmail.com</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <p className='text-center bg-dark text-white-50 py-3'>
        &copy; all right reserved by Fantasy Park 2021{' '}
      </p>
    </div>
  );
};

export default Footer;
