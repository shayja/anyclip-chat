import { store } from 'react-notifications-component';

const setMessage = (header, msg, msgType) => {
  store.addNotification({
    title: header,
    message: msg,
    type: msgType,
    container: 'top-right',
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

const success = (header, message) => {
  setMessage(header, message, 'success');
};

const error = (header, message) => {
  setMessage(header, message, 'danger');
};

// info default warning
export default {
  success,
  error,
};
