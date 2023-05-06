import React, { Component, useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Login(props) {
  const cookies = new Cookies();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  let history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    const data1 = { email: email, password: password };
    await Axios.post('http://localhost:5000/users/login', data1)
      .then((res) => {
        cookies.set('email', email, { path: '/' });
        history.push('/profile');
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.msg);
      });
  }

  const handleInputChange = (e) => {
    if (e.target.name == 'email') setEmail(e.target.value);
    else setPassword(e.target.value);
  };

  let error = '';

  if (message) {
    error = <div className="alert">{message}</div>;
  }

  return (
    <div className="Form">
      {/* <button className="back_btn">
        <Link to="/" className="link">
          {' '}
          Back{' '}
        </Link>
      </button> */}
      <form className="abc" onSubmit={handleSubmit}>
      <Link to="/" style={{}} className="position-fixed btn btn-danger m-2 px-5">
          {' '}
          Back{' '}
        </Link>
        <div className="text-center">
          <h1 className="text-center  ">
            <br />
            <br />
            <br />
            <br />
            <b>Let's get started.</b>
            <br />
            <b>Login into your account!</b>
            <br />
            <br />
            <br />
          </h1>
          {error}
          <div className="input">
            <input
              className="inputs"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <input
              className="inputs"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleInputChange}
            />
          </div>
          <button className="button" type="submit">
            <b>Login</b>
          </button>{' '}
          <br />
          <span className="register">
            Not a member? Register <Link to="/register">here</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
