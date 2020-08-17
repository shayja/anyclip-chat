import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import Notifications from './Notifications';
import { userService } from '../services/user.service';
import restApiService from '../services/restapi.service';

export const Chat = () => {

    let [message, setMessage] = useState('');
    let [messages, setMessages] = useState([]);
    let [username, setUsername] = useState('');
    let [avatar, setAvatar] = useState('');

    useEffect(() => {

        const user = userService.getUser();

        setUsername(user.username);
        setAvatar(user.avatar);

        getLatest();
        
    }, []);

    const socket = io('localhost:3001');

    socket.on('RECEIVE_MESSAGE', function(data){
        console.log('RECEIVE_MESSAGE', data);
        addMessage(data);
    });

    const addMessage = data => {
        console.log(data);
        setMessages([...messages, data]);
        console.log(messages);
    };

    const sendMessage = async(ev) => {
        ev.preventDefault();
        console.log('sendMessage');

        const chatMsg = {
            author: username,
            message: message,
            avatar: avatar
        };
        
        socket.emit('SEND_MESSAGE', chatMsg);
        await saveMessage(chatMsg);
        setMessage('');
    }

    const saveMessage = async(chatMsg) => {
        await restApiService.postAsync(`messages/save`, chatMsg)
        .then((data) => {
            if (data) {
                console.log(data);  
                Notifications.success('Message saved');
            } else {
                Notifications.error('Message save failed', 'error when saving to db.');
            }},
            (error) => {
                Notifications.error('Message save failed', error);
              }
        )
    };

    const getLatest = async() => {
        await restApiService.getAsync(`messages/get-latest`)
        .then((data) => {
            if (data) {
                console.log(data);
            } else {
                Notifications.error('Latest messages', 'error when reading from db.');
            }},
            (error) => {
                Notifications.error('Latest messages get failed', error);
              }
        )
    };
    
    return (
        <div className="col-md-8 col-md-offset-3">
            <Notifications.NotificationContainer />
            <div>
                <h5>AnyClip Chat room</h5>
                <hr/>
                <div className="messages">
                    {messages.map((message, i) => {
                        return (
                            <div key={i}>
                                <img src={`${process.env.PUBLIC_URL}/img/${avatar}`} alt={message.author} />
                                {message.author}: 
                                {message.message}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Message" className="form-control" value={message} onChange={e => setMessage(e.target.value)}/>
            </div>

            <div className="form-group">
                <button onClick={sendMessage} className="btn btn-primary form-control">Send</button>
            </div>

        </div>
    );
};
