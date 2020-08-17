export const userService = {
    getUser,
    logout,
    deleteUserFromStorage,
    isLoggedIn,
    getAuthHeader,
    auth
};

function getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log('getUser', user);
    return user;
}

/**
 * remove user from local storage to log user out
 * */
function deleteUserFromStorage() {
    localStorage.removeItem('user'); 
}

function logout(redirUrl) {
    this.deleteUserFromStorage();

    window.location.href = redirUrl || '/'
}

function isLoggedIn() {
    const user = getUser();
    // console.log('isLoggedIn', user && user.token);
    return user && user.token;
}

function getAuthHeader() {
    
    // return authorization header with jwt token
    const user = getUser();
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

function auth(user) {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}
