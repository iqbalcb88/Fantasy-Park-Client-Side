import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
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
  const { user } = useAuth();

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
              .post('http://localhost:5000/addEvent', data)
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
    fetch(`http://localhost:5000/allEvents?page=${page}&&size=${size}`)
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
    fetch(`http://localhost:5000/allEvents/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json)
      .then((data) => {
        if (data.deletedCount > 0) {
          const remainingEvents = events.find((e) => e._id !== id);
          setEvents(remainingEvents);
          alert('Deleted Successfully');
        }
      });
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

  return (
    <Container
      fluid
      className='d-flex justify-content-center align-items-center flex-column'
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
        <Container>
          <h2>Cart</h2>
          <Row>
            <Col>
              <Cart cart={cart}>
                <Link to='/review'>
                  <button className='btn-regular'>Review Your Order</button>
                </Link>
              </Cart>
            </Col>
          </Row>
          <h2>All Events</h2>
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
        <div className='cart'></div>
      </div>
    </Container>
  );
};

export default Events;