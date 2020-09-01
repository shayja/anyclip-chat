/**
* set user local storage
* */
const auth = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

/**
* remove user from local storage to log user out
* */
const deleteUserFromStorage = () => {
  localStorage.removeItem('user');
};

/**
* get current user info from localstorage
* */
const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

/**
* add authentication header to each request.
* */
const getAuthHeader = () => {
  // return authorization header with jwt token
  const user = getUser();
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

/**
* is current user loggen in?
* */
const isLoggedIn = () => {
  const user = getUser();
  // console.log('isLoggedIn', user && user.token);
  return user && user.token;
};

/**
* log user out.
* */
const logout = (redirUrl) => {
  this.deleteUserFromStorage();
  window.location.href = redirUrl || '/';
};

export default {
  auth,
  deleteUserFromStorage,
  getAuthHeader,
  getUser,
  isLoggedIn,
  logout,
};
