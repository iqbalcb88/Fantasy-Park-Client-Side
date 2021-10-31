import { faGithub, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const {
    signInWithGoogle,
    emailPassLogin,
    setUser,
    user,
    error,
    setIsLoading,
  } = useAuth();
  const location = useLocation();
  const history = useHistory();
  const redirect_uri = location.state?.from || '/home';
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    e.preventDefault();
    setPass(e.target.value);
  };
  console.log(email, password);
  const handleSignIn = () => {
    emailPassLogin(email, password);
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
  };
  let { from } = location.state || { from: { pathname: '/' } };
  // console.log(from);
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
        history.push(redirect_uri);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log(user);
  return (
    <Container>
      <Row xs={1} sm={2} md={2}>
        <Col className='d-flex justify-content-center'>
          <div className=' flex-column d-flex justify-content-center align-items-start my-5 py-5'>
            {user.email || user.displayName ? (
              <h6 className='text-success'>
                SuccessFully LoggedIn as {user.displayName || user.email}
              </h6>
            ) : (
              <h1>Login Please</h1>
            )}
            <label htmlFor='email'>Email address: </label>
            <input
              className='mb-3'
              onBlur={handleEmail}
              placeholder='Your Email'
              type='email'
              name='email'
              id='email'
            />
            <label htmlFor='password'>Password</label>
            <input
              className='mb-3'
              onBlur={handlePass}
              placeholder='Your Password'
              type='password'
              name='password'
              id='password'
            />
            <p>{error}</p>
            <input
              className='mb-3 btn btn-outline-primary'
              onClick={handleSignIn}
              type='submit'
              value='Login'
            />

            <div>
              <button
                className='me-3 btn btn-warning'
                onClick={handleGoogleSignIn}
              >
                <FontAwesomeIcon icon={faGooglePlusG} /> Google
              </button>
              <button className='btn btn-dark' onClick={signInWithGoogle}>
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </button>
            </div>
            <br />
            <p>
              New Here <Link to='/home'>Register</Link>{' '}
            </p>
          </div>
        </Col>

        <Col>
          <div>
            <img className='img-fluid' src='' alt='' />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
