import React from 'react';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import Chat from '../chat/chat';
import Login from '../Login';
import Header from '../Header';
import PrivateRoute from '../../helpers/PrivateRoute';
import userService from '../../services/user.service';
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" render={() => (userService.isLoggedIn ? <Redirect to="/chat" /> : <Redirect to="/login" />)} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/chat" component={Chat} />
    </BrowserRouter>
  );
}

export default App;
