import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../images/logoNew.png';

const Header = () => {
  const { loggedOut, user } = useAuth();

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' sticky='top'>
      <Container>
        <Navbar.Brand href='#home'>
          <div>
            <img className='img-fluid' width='50' src={logo} alt='' />
            FANTASY PARK
          </div>
        </Navbar.Brand>
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
            {user.email === 'admin@admin.com' && (
              <Nav.Link as={Link} to='/allOrders'>
                MANAGE ALL ORDERS
              </Nav.Link>
            )}

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
            {user.email === 'admin@admin.com' ? (
              <Nav.Link>
                <button className='btn btn-outline-light disabled'>
                  Hello! Mr.Admin
                </button>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to='/login'>
                <button className='btn btn-info '>ADMIN LOGIN</button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
