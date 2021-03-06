import Notifications from '../helpers/Notifications';

const errorMessage = (status) => {
  switch (status) {
    case 401:
      // alert('unauthorized');
      return 'unauthorized';
    case 404:
      return 'No data found';
    case 500:
      return 'An error occured';
    default:
      return null;
  }
};

const handleResponse = (response) => new Promise((resolve, reject) => {
  if (response.ok) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      // call resolve if the method succeeds
      response.json().then((json) => resolve(json));
    } else {
      resolve();
    }
  } else {
    if ([401, 403].indexOf(response.status) !== -1) {
      Notifications.error('', 'Please sign in again.');
      // userService.logout('/login');
    }

    response.text().then((text) => {
      try {
        reject(JSON.parse(text));
      } catch (e) {
        reject(text || errorMessage(response.status));
      }
    });
    // console.log(response.status);
  }
});
const handleError = (error) => {
  // console.error(`error:${error}`);
  Promise.reject(error && error.message);
};

export default {
  handleResponse,
  handleError,
};
