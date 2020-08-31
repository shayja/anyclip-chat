import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Notifications from '../helpers/Notifications';
import restApiService from '../services/restapi.service';
import userService from '../services/user.service';
import validateUploadFile from '../services/upload.service';
import './SignIn.css';

const SignIn = () => {
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
    <div className="form-signin">
      <Notifications.NotificationContainer />
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label htmlFor="username" className="sr-only">Username</label>
      <input id="username" name="username" type="text" placeholder="Choose Username" value={username} onChange={inputChangeHandler} className="form-control" />
      <label htmlFor="avatar" className="sr-only">avatar</label>
      <input name="avatar" type="file" multiple={false} accept="image/jpeg, image/png, image/gif" className="form-control" onChange={validateFileUpload} />
      <button type="button" className="btn btn-lg btn-primary btn-block" disabled={!username} onClick={loginToChat}>Continue to Chat room</button>
    </div>
  );
};
export default SignIn;
