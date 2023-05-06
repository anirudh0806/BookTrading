import react, { Component, useEffect, useReducer, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../pages/Navbar';
import './search.css';

export default function Search(props) {
  const cookies = new Cookies();

  const history = useHistory();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    if (cookies.get('email')) {
      fetch('http://localhost:5000/users/search?email=' + cookies.get('email'))
        .then((res) => res.json())
        .then((json) => {
          setData(json.a);
          setCart(json.user.cart);
          setLoaded(true);
        });
    } else history.push('/login');
  });

  function handleClick(e) {
    const id = e.currentTarget.id;
    const data1 = {
      id: id,
    };
    var result = window.confirm('Are you sure you want to buy the book?');
    if (result) {
      Axios.post('http://localhost:5000/users/delete', data1).then((res) => {
        alert('Purchase Successful');
      });
    }
  }
  function handleCart(e) {
    const id = e.currentTarget.id;
    const data = {
      id: id,
      cart: cart,
      email: cookies.get('email'),
    };
    var result = window.confirm('Are you sure you want to buy the book?');
    if (result) {
      Axios.post('http://localhost:5000/users/add', data).then((res) => {
        console.log(res);
        forceUpdate();
        alert(res.data.message);
      });
    }
  }
  return isLoaded ? (
    <>
    <Navbar />
    <div style={{height: "100vh", backgroundColor:"#696969"}} >
      <div>
        <Link to="/profile" style={{}} className="position-fixed btn btn-danger m-2 px-5">
          {' '}
          Back{' '}
        </Link>
        <div className='text-center'><b className="text-center title m-auto">LIBRARY</b></div>
      </div>
      <ul>
        <div>
          {data.length>0?data.map((item) => (
            <div key={item._id}>
              <li className="main1">
                <br />
                <p className="details">
                  BookName : <b>&nbsp;&nbsp;{item.bookName}</b>{' '}
                </p>
                <p className="details">
                  Author &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>&nbsp;&nbsp;{item.author}</b>
                </p>
                <p className="details">
                  Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>&nbsp;&nbsp;{item.email}</b>
                </p>
                <p className="details">
                  Phone &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>&nbsp;&nbsp;{item.phoneno}</b>
                </p>
                <button
                  className="details_btn"
                  id={item._id}
                  onClick={handleClick}>
                  {' '}
                  BUY{' '}
                </button>
                <button
                  className="details_btn"
                  id={item._id}
                  onClick={handleCart}>
                  {' '}
                  Add to cart{' '}
                </button>
                <br />
              </li>
              <br />
            </div>
          )):<div  className="text-center h3 py-5 text-light">NO BOOKS FOUND</div>}
          <br />
          <div className="text-center text-light">
            {' '}
            Can't find your book? <Link to="/find"> Click here</Link>
          </div>
        </div>
      </ul>
    </div>
    </>
  ) : (
    <div>Loading</div>
  );
}
