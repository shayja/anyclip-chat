import React, { useState, useEffect } from 'react';
import Notifications from '../helpers/Notifications';
import userService from '../services/user.service';
import restApiService from '../services/restapi.service';
import formatToString from '../helpers/utils';
import './Chat.css';

const io = require('socket.io-client');

if (!process.env.REACT_APP_API_BASE_URL) {
  throw new Error('FATAL ERROR: API_URL is not configured.');
}

const socket = io(process.env.REACT_APP_API_BASE_URL);

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getLatest = async () => {
    await restApiService.getAsync('messages/get-latest')
      .then((data) => {
        if (data) {
          console.log('getLatest', data);
          // Set messages list.
          if (data && data.length > 0) {
            setMessages(data);
          }
        } else {
          Notifications.error('Latest messages', 'error when reading from db.');
        }
        setIsLoading(false);
      },
      (error) => {
        Notifications.error('Latest messages get failed', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    // set once the current user from the user token.
    const currentUser = userService.getUser();

    setUsername(currentUser.username);
    setAvatar(currentUser.avatar);

    // Get messages from data source
    getLatest();

    socket.on('RECEIVE_MESSAGE', (data) => {
      console.log('RECEIVE_MESSAGE', data);
      setMessages((m) => [...m, data]);
    });
  }, []);

  // save message to data source
  const saveMessage = async (chatMsg) => {
    await restApiService.postAsync('messages/save', chatMsg)
      .then((success) => {
        if (success) {
          console.log('saveMessageToDb=', success);
          Notifications.success('Message saved', '');
        } else {
          Notifications.error('Message save failed', 'error when saving to db.');
        }
      },
      (error) => {
        Notifications.error('Message save failed', error);
      });
  };

  const handleNewMessage = () => {
    console.log('emitting new message');

    const chatMsg = {
      message,
      createdAt: new Date(),
      user: {
        username,
        avatar,
      },
    };

    socket.emit('SEND_MESSAGE', chatMsg);
    saveMessage(chatMsg);
    setMessage('');
  };

  return (

    <div className="container">

      <Notifications.NotificationContainer />

      {isLoading ? (
        <img alt="Loading" src={`${process.env.PUBLIC_URL}/img/loading.gif`} />
      ) : (
        <div className="messaging">
          {messages.map((msg, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className={i % 2 === 0 ? 'incoming' : 'outgoing'}>
              <div className="img">
                <img src={`${process.env.REACT_APP_IMG_URL}${msg.user.avatar || 'none.png'}`} alt={msg.user.username} />
              </div>
              <div className="txt">
                <p>{msg.message}</p>
                <small>{formatToString(msg.createdAt)}</small>
              </div>
            </div>
          ))}
          <input type="text" placeholder="Your Message" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="button" onClick={() => handleNewMessage()} className="btn btn-primary btn-sm">Send</button>
        </div>
      )}

      <p className="credit">AnyClip chat app (Shay Jacoby Test 2020)</p>
    </div>

  );
};
export default Chat;
