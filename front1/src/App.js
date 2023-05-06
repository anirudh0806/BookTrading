import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import Home from './components/pages/Home';
import Login from './components/auth/login';
import Register from './components/auth/Register';
import Fetch from './components/auth/App';
import Search from './components/auth/search';
import Searchbar from './components/auth/searchbar';
import Cart from './components/auth/Cart';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register" component={Register} />
        <Route path="/profile">
          <Fetch></Fetch>
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/find">
          <Searchbar />
        </Route>
        <Route exact path="/Cart">
          <Cart />
        </Route>
      </Router>
    );
  }
}
export default App;
