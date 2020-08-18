import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import Notifications from './Notifications';
import { userService } from '../services/user.service';
import restApiService from '../services/restapi.service';
import {formatToString} from '../helpers/utils';
import { config } from '../helpers/config';
import './Chat.css';


export const Chat = () => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {

        // set once the current user from the user token.
        const currentUser = userService.getUser();

        setUsername(currentUser.username);
        setAvatar(currentUser.avatar);

        // Get messages from data source
        getLatest();
        
    }, []);

    const socket = io(config.apiUrl);

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
            message,
            createdAt: new Date(),
            user: {
                username,
                avatar,
            }

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
                Notifications.success('Message saved', '');
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
                // Set messages list.
                if (data && data.length > 0){
                    setMessages(data);
                }
            } else {
                Notifications.error('Latest messages', 'error when reading from db.');
            }},
            (error) => {
                Notifications.error('Latest messages get failed', error);
              }
        )
    };
    
    return (



<div>
<Notifications.NotificationContainer />


<div className="messaging">
      <div className="inbox_msg">
     

          {messages.map((message, i) => {
                const cls = i%2===0? `incoming`: `outgoing`;
                return (
                    <div key={i} className={cls+ `_msg`}>
                        <div className={cls+ `_msg_img`}>
                            <img src={`${config.imageUrl}${message.user.avatar || `none.png`}`} alt={message.user.username} />
                        </div>
                    
                        <div className={cls+ `_txt`}>
                            <div className={cls+ `_withd_msg`}>
                                <p>{message.message}</p>
                                <span className="time_date">{formatToString(message.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
            
            <div className="type_msg">
                <div className="input_msg_write">
                    <input type="text" placeholder="Message" className="write_msg" value={message} onChange={e => setMessage(e.target.value)}/>
                    <button onClick={sendMessage} className="btn btn-primary btn-sm">Send</button>
                </div>
            </div>
            </div>
        </div>
      
      
      <p className="text-center top_spac">AnyClip chat app (Shay Jacoby Test 2020)</p>
      

    </div>
    
    );
};
