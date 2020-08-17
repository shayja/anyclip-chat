import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/dist/react-notifications.css';

const notificationInMs = 2000;
const errorNotificationInMs = 1000 * 15;

let wrapper = (title, message, callback, name) => {
    let ms = name === "error" ? errorNotificationInMs : notificationInMs;
    NotificationManager[name](message, title, ms, callback);
    if (callback) {
        window.setTimeout(callback, ms);
    }
}

export default {
    info: (title, message, callback) => wrapper(title, message, callback, "info"),
    success: (title, message, callback) => wrapper(title, message, callback, "success"),
    warning: (title, message, callback) => wrapper(title, message, callback, "warning"),
    error: (title, message, callback) => wrapper(title, message, callback, "error"),
    NotificationContainer
};
