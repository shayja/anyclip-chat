import React, { useState, useEffect } from 'react';
import Notifications from '../helpers/Notifications';
import userService from '../services/user.service';
import restApiService from '../services/restapi.service';
import util from '../helpers/utils';
import './Chat.css';

const io = require('socket.io-client');

// make sure that this env variable is configured.
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

  /**
   * Get latest chat messages
   */
  const getLatest = async () => {
    await restApiService.getAsync('messages/get-latest')
      .then((data) => {
        if (data) {
          // console.log('getLatest', data);
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
        // console.error(error);
        Notifications.error('Latest messages get failed', error);
        setIsLoading(false);
      });
  };

  /**
   * save message to data source
   */
  const saveMessage = async (chatMsg) => {
    await restApiService.postAsync('messages/save', chatMsg)
      .then((success) => {
        if (success) {
          // console.log('saveMessageToDb=', success);
          Notifications.success('OK', 'Message successfuly saved');
        } else {
          Notifications.error('Message save failed', 'error when saving to db.');
        }
      },
      (error) => {
        // console.error(error);
        Notifications.error('Message save failed', error);
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
      // console.log('RECEIVE_MESSAGE', data);
      setMessages((m) => [...m, data]);
    });
  }, []);

  /**
   * Handles form button click
   * Create a new chat message.
   */
  const handleNewMessage = () => {
    if (!username || !message) {
      Notifications.error('Empty message', 'Please write some message');
    } else {
      const data = {
        message,
        createdAt: new Date(),
        user: {
          username,
          avatar,
        },
      };
      // console.log('emitting new message', data);
      socket.emit('SEND_MESSAGE', data);
      saveMessage(data);
      setMessage('');
    }
  };

  return (

    <div className="container">
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
                <p>
                  <b>
                    {`${msg.user.username}: `}
                  </b>
                  {msg.message}
                </p>
                <small>{util.formatDate(msg.createdAt)}</small>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col-2" />
            <div className="col-7">
              <input type="text" placeholder="Your Message" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div className="col-3">
              <button type="button" onClick={() => handleNewMessage()} className="btn btn-primary btn-md"> Send </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};
export default Chat;
