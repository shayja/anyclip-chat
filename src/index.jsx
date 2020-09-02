import React from 'react';
import ReactDOM from 'react-dom';
import ReactNotification from 'react-notifications-component';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import 'react-notifications-component/dist/theme.css';

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
serviceWorker.unregister();
