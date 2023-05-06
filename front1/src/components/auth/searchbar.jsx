import Axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import Navbar from '../pages/Navbar';
export default function Searchbar() {
  const cookies = new Cookies();

  const history = useHistory();
  const [book, setBook] = useState('');
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    'AIzaSyCqi37mzRrzkBrDZDb0BX9_IarX5iMOT88'
  );
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (cookies.get('email')) {
      fetch('http://localhost:5000/users/search?email=' + cookies.get('email'))
        .then((res) => res.json())
        .then((json) => {
          setCart(json.user.cart);
        });
    } else history.push('/login');
  });

  function addToCart(bookName, author, _id) {
    let data = {
      book: {
        bookName,
        author,
        _id,
      },
      email: cookies.get('email'),
      cart,
    };
    var result = window.confirm('Are you sure you want to add to cart?');
    if (result) {
      Axios.post('http://localhost:5000/users/addFromSearch', data).then(
        (res) => {
          console.log(res);
          forceUpdate();
          alert(res.data.message);
        }
      );
    }
  }
  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }
  function handleSubmit(event) {
    event.preventDefault();
    Axios.get(
      'https://www.googleapis.com/books/v1/volumes?q=' +
        book +
        '&key=' +
        apiKey +
        '&maxResults=40'
    ).then((data) => {
      console.log(data.data.items);
      setResult(data.data.items);
    });
  }
  function truncate(str) {
    return str.length > 25 ? str.substring(0, 21) + '...' : str;
  }
  return (
    <div >
    <Navbar/>
      <form onSubmit={handleSubmit} className="" >
        <div className="card-header main-search " style={{ backgroundColor:"#696969"}}>
          <div className="row mx-auto justify-content-center" >
            <div className="col-12 col-md-5 col-xl-5">
              <input
                onChange={handleChange}
                className="AutoFocus form-control"
                placeholder="Type something..."
                type="text"
              />
            </div>
            <div className="">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary search-btn"
              />
            </div>
          </div>
        </div>
        <div className="row container mx-auto">
          {result.map((book, index) => (
            <div key={index} className="child col-4 text-center">
              <div className="text-center">
                <img
                  style={{ height: '150px' }}
                  src={
                    book.volumeInfo.imageLinks !== undefined
                      ? book.volumeInfo.imageLinks.thumbnail
                      : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
                  }
                  alt={book.title}
                />
                <p className="text">
                  {book.volumeInfo.title ? book.volumeInfo.title : 'N/A'}
                </p>
                <br></br>
                <Card
                  className="text-center mx-auto"
                  style={{ width: '18rem' }}>
                  <ListGroup>
                    <ListGroup.Item
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {truncate(
                        book.volumeInfo.industryIdentifiers
                          ? book.volumeInfo.industryIdentifiers[0].type +
                              ' : ' +
                              book.volumeInfo.industryIdentifiers[0].identifier
                          : 'Industry Identifiers : N/A'
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Author :
                      {truncate(
                        book.volumeInfo.authors == undefined
                          ? ' N/A'
                          : book.volumeInfo.authors.join(', ')
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        onClick={(e) => {
                          alert('Successfully Purchased');
                        }}>
                        Buy Now:
                      </Button>
                      <Button
                        className="mx-2"
                        onClick={(e) => {
                          addToCart(
                            book.volumeInfo.title,
                            book.volumeInfo.authors,
                            book.volumeInfo.industryIdentifiers[0].identifier
                          );
                        }}>
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}