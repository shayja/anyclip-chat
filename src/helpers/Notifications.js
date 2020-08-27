import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/dist/react-notifications.css';

const notificationInMs = 2000;
const errorNotificationInMs = 1000 * 15;

const wrapper = (title, message, callback, name) => {
  const ms = name === 'error' ? errorNotificationInMs : notificationInMs;
  let msg;
  if (name === 'error' && message.error) {
    msg = message.error;
  } else {
    msg = message;
  }

  NotificationManager[name](msg, title, ms, callback);
  if (callback) {
    window.setTimeout(callback, ms);
  }
};

export default {
  info: (title, message, callback) => wrapper(title, message, callback, 'info'),
  success: (title, message, callback) => wrapper(title, message, callback, 'success'),
  warning: (title, message, callback) => wrapper(title, message, callback, 'warning'),
  error: (title, message, callback) => wrapper(title, message, callback, 'error'),
  NotificationContainer,
};
