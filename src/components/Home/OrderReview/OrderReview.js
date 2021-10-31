import axios from 'axios';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import {
  clearTheCart,
  removeFromLocalStorage,
} from '../../../cartOperation/cartOperation';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import Cart from '../../Cart/Cart';
import ReviewItem from './ReviewItem/ReviewItem';

const OrderReview = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    // console.log('working');
    // console.log(cart);
    const orderArray = [...cart];
    orderArray.map((e) => {
      delete e._id;
      e['email'] = user.email;
      e['orderBy'] = user.displayName;
      e['address'] = values.address;
      e['status'] = 'Pending';

      return e;
    });
    axios
      .post('http://localhost:5000/orders', {
        orderArray,
      })
      .then(function (response) {
        console.log(response);
        reset();
        clearTheCart();
        setCart([]);
        alert('Order Placed SuccessFully');
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(orderArray);
    // send data to server
  };
  const [cart, setCart] = useCart();
  const { user } = useAuth();
  // console.log(cart);
  const handleRemove = (id) => {
    const updateCart = cart.filter((e) => e._id !== id);
    setCart(updateCart);
    removeFromLocalStorage(id);
  };
  // const handleConfirmOrder = () => {

  // };

  return (
    <div>
      <Container className='mb-5'>
        <Cart cart={cart}>
          {/* <button onClick={handleConfirmOrder} className='btn btn-primary'>
            Confirm Order
          </button> */}
        </Cart>
      </Container>
      <Container className='border border-secondary'>
        {cart.map((event) => (
          <ReviewItem
            event={event}
            key={event._id}
            handleRemove={handleRemove}
          ></ReviewItem>
        ))}
      </Container>
      <Container>
        <h1>Billing Information</h1>
        <form
          className='d-flex flex-column my-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            value={user.email}
            type='email'
            {...register('email', {
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
          {errors.email && errors.email.message}

          <input
            className='my-3'
            value={user.displayName}
            {...register('username', {
              validate: (value) => value !== 'admin' || 'Nice try!',
            })}
          />
          {errors.username && errors.username.message}
          <input
            placeholder='Billing Address'
            {...register('address', {
              validate: (value) => value !== 'admin' || 'Nice try!',
            })}
          />
          {errors.username && errors.username.message}

          <button className='mt-3 btn btn-primary' type='submit'>
            Confirm Order
          </button>
        </form>
      </Container>
    </div>
  );
};

export default OrderReview;
