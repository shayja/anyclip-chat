/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import userService from '../services/user.service';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      userService.isLoggedIn()
        ? <Component {...props} />
        : <Redirect to="/signin" />
    )}
  />
);

export default PrivateRoute;
