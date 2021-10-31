import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { addToLocalStorage } from '../../../cartOperation/cartOperation';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import Cart from '../../Cart/Cart';
import Event from './Event/Event';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [cart, setCart] = useCart();
  const { user, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const imageData = new FormData();
    imageData.set('key', 'cf5cef4ec25f5c2562cae8d830888095');
    imageData.append('image', data.picture[0]);
    // React hook form submit data
    async function setData() {
      try {
        axios
          .post('https://api.imgbb.com/1/upload', imageData)
          .then(async function (response) {
            const url = await response.data.data.display_url;
            data.url = url;
            axios
              .post('https://gory-castle-80474.herokuapp.com/addEvent', data)
              .then(function (response) {
                // setNewData({});
                console.log(response.data);
                // console.log(newData);
                reset();
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      } finally {
      }
    }
    setData();
  };
  // set the items per page
  const size = 6;
  // load data from server
  useEffect(() => {
    fetch(
      `https://gory-castle-80474.herokuapp.com/allEvents?page=${page}&&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events);
        const totalItems = data.items;
        const totalPages = Math.ceil(totalItems / size);
        // console.log(totalPages);
        setPageCount(totalPages);
        // console.log(data);
      });
  }, [page]);

  // delete item
  const handleDelete = (id) => {
    const proceed = window.confirm('Are you Sure,Wanna Delete');
    if (proceed) {
      fetch(`https://gory-castle-80474.herokuapp.com/allEvents/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json)
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert('Deleted Successfully');
            const remainingEvents = events.filter((e) => e._id !== id);
            setEvents(remainingEvents);
          }
        });
    }
  };

  const handleAddToCart = (event) => {
    console.log(event);
    const exists = cart.find((e) => e._id === event._id);
    console.log(event._id);
    let newCart = [];
    if (exists) {
      const rest = cart.filter((e) => e._id !== event._id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, event];
    } else {
      event.quantity = 1;
      newCart = [...cart, event];
    }
    setCart(newCart);
    // save to local storage (for now)
    addToLocalStorage(event._id);
  };
  if (isLoading) {
    return (
      <Container className='d-flex align-items-center justify-content-center bg-danger my-5 py-5'>
        <Spinner animation='grow' variant='warning' />;
      </Container>
    );
  }
  return (
    <Container
      fluid
      className='d-flex bg-light justify-content-center align-items-center flex-column overflow-hidden'
    >
      {user.email === 'admin@admin.com' && (
        <div className='my-5'>
          <h1>Add an event</h1>
          <form
            className='form-style d-flex flex-column justify-content-center'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              placeholder='Event Name'
              {...register('name', {
                validate: (value) => value !== 'admin' || 'Nice try!',
              })}
            />
            {errors.username && errors.username.message}
            <input
              placeholder='price'
              type='number'
              {...register('price', {
                validate: (value) => value !== 'admin' || 'Nice try!',
              })}
            />
            <textarea
              placeholder='Details'
              {...register('details', {
                validate: (value) => value !== 'admin' || 'Nice try!',
              })}
            />
            {errors.username && errors.username.message}
            {/* input image */}
            <input
              {...register('picture', { required: true })}
              type='file'
              name='picture'
            />
            <button>submit</button>
          </form>
        </div>
      )}
      <div>
        <Container fluid className='my-5'>
          <Row>
            <Col sm={12} md={9}>
              <h1 className='text-center'>All Events</h1>
              <Row xs={1} md={3} className='g-4'>
                {events.map((event) => (
                  <Event
                    key={event._id}
                    handleDelete={handleDelete}
                    event={event}
                    handleAddToCart={handleAddToCart}
                  ></Event>
                ))}
              </Row>
            </Col>
            <Col
              sm={12}
              md={3}
              className='d-flex align-items-center justify-content-center'
            >
              <Row className='border border-secondary p-3'>
                <h2>Cart</h2>
                <Col>
                  <Cart cart={cart}>
                    <Link to='/review'>
                      <button className='btn btn-warning'>
                        Review Your Order
                      </button>
                    </Link>
                  </Cart>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <Row>
            <h2>Cart</h2>
            <Col>
              <Cart cart={cart}>
                <Link to='/review'>
                  <button className='btn-regular'>Review Your Order</button>
                </Link>
              </Cart>
            </Col>
          </Row> */}
          {/* <h2>All Events</h2> */}
          {/*  <Row xs={1} md={3} className='g-4'>
            {events.map((event) => (
              <Event
                key={event._id}
                handleDelete={handleDelete}
                event={event}
                handleAddToCart={handleAddToCart}
              ></Event>
            ))}
          </Row> */}
        </Container>
        <div className='pagination'>
          {[...Array(pageCount).keys()].map((number) => (
            <button
              className={number === page ? 'selected' : ''}
              key={number}
              onClick={() => setPage(number)}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Events;
