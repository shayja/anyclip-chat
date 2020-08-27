import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Notifications from '../helpers/Notifications';
import restApiService from '../services/restapi.service';
import userService from '../services/user.service';
import validateUploadFile from '../services/upload.service';

const Login = () => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState({});
  const [isLoggenIn, setIsLoggenIn] = useState(false);

  useEffect(() => {
    if (userService.isLoggedIn()) {
      setIsLoggenIn(true);
    }
  }, []);

  const validateFileUpload = (e) => {
    try {
      validateUploadFile(e, (img) => {
        if (img) {
          setAvatar(img);
        }
      });
    } catch (error) {
      Notifications.error('Login failed', error);
    }
  };

  const validate = () => {
    if (!username) {
      // console.log('validate: username');
      Notifications.error('Login failed', 'please enter username');
      return false;
    }
    return true;
  };

  const inputChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const saveUser = async () => {
    const user = { username, avatar };

    await restApiService.postAsync('accounts/authenticate', user)
      .then((data) => {
        if (data) {
          // console.log(data);

          if (data && data.token) {
            userService.auth(data);
            setIsLoggenIn(true);
          }
        } else {
          Notifications.error('Chat Login failed', 'No token returned.');
        }
      },
      (error) => {
        Notifications.error('Chat Login failed', error);
      });
  };

  const loginToChat = async (evt) => {
    evt.preventDefault();
    console.log('loginToChat');

    const isValid = validate();

    console.log('isValid', isValid);

    if (isValid) {
      await saveUser();
    }
  };

  if (isLoggenIn) {
    return (<Redirect to="/chat" />);
  }

  return (
    <div className="container">
      <div className="col-md-6">
        <Notifications.NotificationContainer />
        <div className="col-sm">
          <div className="form-group">
            <label htmlFor="username">
              Username:
              <input name="username" type="text" placeholder="Choose Username" value={username} onChange={inputChangeHandler} className="form-control" />
            </label>
          </div>
        </div>

        <div className="col-sm">
          <div className="form-group">
            <label htmlFor="avatar">
              Upload avatar
              <input name="avatar" type="file" multiple={false} accept="image/jpeg, image/png, image/gif" className="form-control" onChange={validateFileUpload} />
            </label>
          </div>
        </div>

        <div className="form-group">
          <button type="button" className="btn btn-success" disabled={!username} onClick={loginToChat}>Continue to AnyClip Chat room</button>
        </div>

      </div>
    </div>
  );
};
export default Login;
