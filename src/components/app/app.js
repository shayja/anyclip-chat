import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Chat from '../chat/chat';
import Login from '../Login';
import Header from '../Header';
import Footer from '../Footer';
import PrivateRoute from '../../helpers/PrivateRoute';
import userService from '../../services/user.service';
import './app.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={() => (userService.isLoggedIn ? <Redirect to="/chat" /> : <Redirect to="/login" />)} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/chat" component={Chat} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
