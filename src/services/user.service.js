const userService = {
  getUser: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log('getUser', user);
    return user;
  },

  /**
     * remove user from local storage to log user out
     * */
  deleteUserFromStorage: () => {
    localStorage.removeItem('user');
  },

  logout: (redirUrl) => {
    this.deleteUserFromStorage();

    window.location.href = redirUrl || '/';
  },

  isLoggedIn: () => {
    const user = userService.getUser();
    // console.log('isLoggedIn', user && user.token);
    return user && user.token;
  },

  getAuthHeader: () => {
    // return authorization header with jwt token
    const user = userService.getUser();
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  },

  auth: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

};
export default userService;
