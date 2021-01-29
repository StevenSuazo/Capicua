import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Game from './game.jsx';
// import Chat from './chat/chat';


import bodega from "../assets/img/La_Bodega.jpg"
// import Score from './gameScore.jsx';
import Rules from './gameRule.jsx';
import Navbar from './navbar.jsx';

 export const GameViewComponent = (props) => {

     return (
        <div className="master-game-container flex-col-start">

           <Navbar/>

           <div className="flex-row-start">
               <Game/> 
           
           </div>


           <img src={bodega} alt="bodega" className="bodega-img" ></img>
        </div>
     )
 }

//  module.exports = GameViewComponent
//  export default GameViewComponent

// const ENDPOINT = 'localhost:5000';

// let socket;

// const GameView = ({ location }) => {
//    const [name, setName] = useState('');
//    const [room, setRoom] = useState('');
//    const [users, setUsers] = useState('');
//    const [message, setMessage] = useState('');
//    const [messages, setMessages] = useState([]);

//    useEffect(() => {
//       const { name, room } = queryString.parse(location.search);

//       socket = io(ENDPOINT);

//       setRoom(room);
//       setName(name)

//       socket.emit('join', { name, room }, (error) => {
//          if (error) {
//             alert(error);
//          }
//       });
//    }, [ENDPOINT, location.search]);

//    useEffect(() => {
//       socket.on('message', message => {
//          setMessages(messages => [...messages, message]);
//       });

//       socket.on("roomData", ({ users }) => {
//          setUsers(users);
//       });
//    }, []);

//    const sendMessage = (event) => {
//       event.preventDefault();

//       if (message) {
//          socket.emit('sendMessage', message, () => setMessage(''));
//       }
//    }

//    return (
//       <div>
//          {/* <Game /> */}
//          {/* steves Chat was moved into <Game> */}
//          {/* <Chat /> */}
//       </div>
//       )
// }

