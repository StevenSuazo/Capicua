import React from "react";
import Game from './gameB.jsx';
// import Chat from './chat/chat';
import bodega from "../assets/img/La_Bodega.jpg"
import Navbar from './navbar.jsx';

export const GameViewComponent = (props) => {
   debugger
   return (
      <div className="master-game-container">
         <Navbar />
         <div className="board-chat-container flex-row-start">
            <Game socket={props.socket} gameState={props.gameState} heightDimen={props.heightDimen} />
            <div className="flex-col-start">
            </div>
         </div>
         <div className="score-rules-container" >
         </div>
         <img src={bodega} alt="bodega" className="bodega-img" ></img>
      </div>
   )
}