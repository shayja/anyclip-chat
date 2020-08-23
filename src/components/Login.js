import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Notifications from '../helpers/Notifications';
import restApiService from '../services/restapi.service';
import { userService } from '../services/user.service';

export const Login = () => {

    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState({});
    const [isLoggenIn, setIsLoggenIn] = useState(false);
   
    useEffect(() => {
        if (userService.isLoggedIn()){
            setIsLoggenIn(true);
        }
      }, []);

  

    const validateFileUpload = e => {
        console.log(e.target.name);
        // let name = e.target.name;
        let value = e.target.files[0];
        let errormessage = null;
        if (value) {
            const validFileExtensions = ['image/jpg', 'image/png', 'image/jpeg'];
            console.log(`file size: ${value.size}, type: ${value.type}`);

            if (!validFileExtensions.includes(value.type)) {
                const ext = validFileExtensions.join();
                errormessage = `Please upload file type: ${ext.replace(/image/g, "").replace(/,/g, "")}`;
            }
            else if (value.size > 3145728) {
                console.log(`current file size is too large: ${value.size}`);
                errormessage = `File size limit is 3 MB`;
            }
        }
        else {
            errormessage = `Please upload your avatar image file.`;
        }

        if (errormessage){
            Notifications.error('Login failed', errormessage);         
            value = {};
        } else if (value) {
            console.log(value);
            setAvatar(value);
            imageToBase64(value);

        }
    }

    const imageToBase64 = (imageFile) => {

        if (avatar) {
            console.log(`imageToBase64->imageFile: ${imageFile}`);
            let reader = new FileReader();

            reader.readAsDataURL(imageFile);

            reader.onloadend = () => {
                const result = reader.result;
                // console.log("image Base64 Result", result);
    
                setAvatar(result);
                //copy.imageName = menuItem.image.name;
            }
        }
    }

    const validate = () => {
    
        if (!username){
            console.log('validate: username');
            Notifications.error('Login failed', 'please enter username');
            return false;
        }
        /*
        if (!avatar || avatar.length === 0){
            console.log('validate: avatar image');
            Notifications.error('Login failed', 'please upload your avatar image');
            return false;
        }
        */
        return true;
    }

    const inputChangeHandler = (e) => {
        setUsername(e.target.value);
    };


    const saveUser = async(user) => {
        await restApiService.postAsync(`accounts/authenticate`, user)
        .then((data) => {
            if (data) {
                // console.log(data);  

                if (data && data.token)
                {
                    userService.auth(data);
                    setIsLoggenIn(true);
                }
                
            } else {
                Notifications.error('Chat Login failed', 'No token returned.');
            }},
            (error) => {
                Notifications.error('Chat Login failed', error);
              }
        )
    };
    
    const loginToChat = async(evt) => {
        evt.preventDefault();
        console.log('loginToChat');
        
        const isValid = validate();

        console.log('isValid', isValid);

        if (isValid){
            console.log(username, avatar);
            await saveUser({username, avatar});
        }
    }

    if (isLoggenIn) {
        return (<Redirect to='/chat' />);
    }

    return (
        <div className="container">
            <div className="col-md-6">
                    <Notifications.NotificationContainer />
                    <div className="col-sm">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input name="username" type="text" placeholder="Choose Username" value={username} onChange={inputChangeHandler} className="form-control"/>
                        </div>
                    </div>
                    
                    <div className="col-sm">
                        <div className="form-group">
                            <label htmlFor="avatar">Upload avatar</label>
                            <input name="avatar" type="file" multiple={false} accept="image/jpeg, image/png, image/gif" className="form-control" onChange={validateFileUpload} />
                        </div>
                    </div>
            
            
                <div className="form-group">
                    <button className="btn btn-success" disabled={!username} onClick={loginToChat}>Continue to AnyClip Chat room</button>
                </div>

            </div>
        </div>
    );
}
