import React from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import {Chat} from './components/Chat';
import {Login} from './components/Login';
import Header from './components/Header';
import { PrivateRoute } from './helpers/PrivateRoute';
import { userService } from './services/user.service';
import './App.css';

function App() {
  return (
    <BrowserRouter>
       <div className="container">
          <Header />
          <Route exact path="/" render={
              () => (userService.isLoggedIn ? <Redirect to="/chat" /> : <Redirect to="/login" />)
          } />
          <Route path='/login' component={Login} />
          <PrivateRoute path='/chat' component={Chat} />
      </div>
    </BrowserRouter>
  );
}

export default App;
