import React from "react";
import Game from './game.jsx';
// import Chat from './chat/chat';
import bodega from "../assets/img/La_Bodega.jpg"
// import Score from './gameScore.jsx';
import Navbar from './navbar.jsx';

 export const GameViewComponent = (props) => {

   // debugger
     return (
        <div className="master-game-container flex-col-start">

           <Navbar/>

           <div className="flex-row-start">
              <Game gamePlayers={props.history.location.state.players} heightDimen={window.innerHeight - 65}/>
           </div>
           <img src={bodega} alt="bodega" className="bodega-img" ></img>
        </div>
     )
 }
