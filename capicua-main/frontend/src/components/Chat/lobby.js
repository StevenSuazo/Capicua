import React from "react"
import './lobby.css';
import bodega from "../../assets/img/La_Bodega.jpg"

const Lobby = (props) => {
  let playerDisconnected;
  let players, totalPlayers, joinOrCreate, allUsernames;
  let buttonText;
  const {isOnline} = props;

  if (props.playerDisconnected){
      playerDisconnected = props.playerDisconnected;
  } else {
     players = props.players
     totalPlayers = props.totalPlayers
     joinOrCreate = props.joinOrCreate

     allUsernames = players.map(player => {
      return (
          <p className='lobby-player-p' key={player.username}>{player.username} has joined!</p>
      )
    })

    buttonText = players.length === totalPlayers ? "Start Game" : "Waiting for players";
  }
    
  return (
    <div className="lobbyOuterContainer">
      <div className="lobbyInnerContainer flex-col-start">
          {props.roomName ? <h1 className="heading">{props.roomName.toUpperCase()}</h1> : <h1 className="heading">LOBBY</h1>}

          
          {playerDisconnected ? null : 
           <div className='flex-row-center'>
            <div className="lobbyPlayers flex-col-center">
              {allUsernames}
            </div>
          </div>}

          {/* <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/play_game?name=${name}&room=${room}`}> */}

         { playerDisconnected ?
            <div className='flex-row-center'>
            <div className="lobbyPlayers flex-col-center">
              <p> A Player has disconnected </p>
            </div>
          </div>
         :
         
         isOnline ?
         joinOrCreate === "create" ?
         totalPlayers === players.length ? 
         <button className={'button mt-20 server-start-btn'}
            type="submit"
            onClick={props.handleGameStart}
            >{buttonText}
          </button>
          :
          <button className={'button mt-20 server-start-btn'}
            type="submit"
            disabled={true}
            >{buttonText}
          </button> 
          : 
          <p className="attentive-voice">Waiting on Host to start the game</p>
          :
          <button className={'button mt-20 server-start-btn'}
            type="submit"
            onClick={props.handleGameStart}
            >{"testing no click"}
          </button>
          
          } 



          <div className='flex-row-center'>
            <div className="lds-ripple"><div></div><div></div></div>
          </div>
      </div>
      <img src={bodega} alt="bodega" className="bodega-img-splash" ></img>
    </div>
  );
}

export default Lobby;