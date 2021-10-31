import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Header = () => {
  const { loggedOut, user } = useAuth();

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' sticky='top'>
      <Container>
        <Navbar.Brand href='#home'>FANTASY PARK</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='m-auto'>
            <Nav.Link as={Link} to='/home'>
              HOME
            </Nav.Link>
            <Nav.Link as={Link} to='/events'>
              EVENTS
            </Nav.Link>

            <Nav.Link as={Link} to='/blogs'>
              BLOG
            </Nav.Link>
            <Nav.Link as={Link} to='/allOrders'>
              AllOrders
            </Nav.Link>
            {user.email ? (
              <Nav.Link as={Link} to='/myOrder'>
                MY ORDERS
              </Nav.Link>
            ) : (
              ''
            )}
          </Nav>
          <Nav>
            {user.email && (
              <Nav.Link>
                <button className='btn btn-outline-light disabled'>
                  Hello! {user.displayName}
                </button>
              </Nav.Link>
            )}
            {user.email ? (
              <Nav.Link as={Link} to='/'>
                <button onClick={loggedOut} className='btn btn-danger'>
                  LOGOUT
                </button>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to='/login'>
                <button className='btn btn-primary'>LOGIN</button>
              </Nav.Link>
            )}
            <Nav.Link as={Link} to='/adminLogin'>
              <button className='btn btn-info '>ADMIN LOGIN</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
