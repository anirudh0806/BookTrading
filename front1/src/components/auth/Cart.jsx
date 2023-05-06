import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import { useState, useEffect ,useReducer } from 'react';
import Axios from 'axios';

export default function Cart() {
  const cookies = new Cookies();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const history = useHistory();
  const [cart, setCart] = useState([]);
  function checkout(){
    let data = {
        email: cookies.get('email'),
      cart: cart,
    }
    if (window.confirm('Purchase all items?')) {
        Axios.post('http://localhost:5000/users/clearCart', data).then(
        (res) => {
          console.log(res);
          forceUpdate();
          alert(res.data.message);
        }
      );
    }
  }
  function deleteItem(index) {
    let data = {
      index,
      email: cookies.get('email'),
      cart,
    };
    if (window.confirm('Delete item from cart?')) {
      Axios.post('http://localhost:5000/users/deleteFromCart', data).then(
        (res) => {
          console.log(res);
          forceUpdate();
          alert(res.data.message);
        }
      );
    }
  }
  useEffect(() => {
    if (cookies.get('email')) {
      fetch('http://localhost:5000/users/search?email=' + cookies.get('email'))
        .then((res) => res.json())
        .then((json) => {
          setCart(json.user.cart);
        });
    } else history.push('/login');
  });
  return (
    <div className="m-auto p-5 ">
      <p className="text-center h2 p-4">Cart</p>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((element, index) => (
            <tr key={element._id}>
              <th scope="row">{element.bookName} </th>
              <td>{element.author} </td>
              <td>
                <button onClick={() => deleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button type="button" onClick={()=>checkout()} className="btn btn-primary">
          Checkout
        </button>
      </div>
    </div>
  );
}