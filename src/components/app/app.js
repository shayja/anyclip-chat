import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Chat from '../chat/chat';
import SignIn from '../signin/signin';
import Header from '../header/header';
import Footer from '../footer/footer';
import PrivateRoute from '../../helpers/PrivateRoute';
import userService from '../../services/user.service';
import './app.css';

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
