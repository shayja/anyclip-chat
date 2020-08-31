import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Chat from './Chat';
import SignIn from './SignIn';
import Header from './Header';
import Footer from './Footer';
import PrivateRoute from '../helpers/PrivateRoute';
import userService from '../services/user.service';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" render={() => (userService.isLoggedIn ? <Redirect to="/chat" /> : <Redirect to="/signin" />)} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/chat" component={Chat} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
