import React, { Component } from 'react';
import './Form.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      password: null,
      passwordCheck: null,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = this.state;
    await Axios.post('http://localhost:5000/users/register', data)
      .then((res) => {
        alert('Registered Successfully');
        window.location = '/login';
      })
      .catch((error) => {
        this.setState({
          message: error.response.data.msg,
        });
      });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let error = '';

    if (this.state.message) {
      error = <div className="alert">{this.state.message}</div>;
    }
    return (

      <div className="Form">

        <form className="abc" onSubmit={this.handleSubmit}>
          <Link to="/" style={{}} className="position-fixed btn btn-danger m-2 px-5">
            {' '}
            Back{' '}
          </Link>
          <div className="text-center">
            <h3>
              Create an Account
              <br />
              Please fill the details to register!
              <br />
              <br />
              <br />
            </h3>
            {error}
            <div className="input">
              <input
                className="inputs"
                type="text"
                name="username"
                placeholder="Enter your Username"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="input">
              <input
                className="inputs"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="input">
              <input
                className="inputs"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="input">
              <input
                className="inputs"
                type="password"
                name="passwordCheck"
                placeholder="Confirm your password"
                onChange={this.handleInputChange}
              />
            </div>
            <button className="button" type="submit" value="register">
              Sign Up
            </button>
            <p className="text-light" >
              Already have an account? Login <Link to="/login">here</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
