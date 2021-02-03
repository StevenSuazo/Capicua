import React from "react";
import '../stylesheets/gameScore.css';

class Score extends React.Component {


  render() {
    return (
      <div className="score-box-container">

        {/* <div className="current-player">{currentPlayer.username} </div> */}


        <div className="name-and-points">
          {/* {nameScores} */}
          {this.props.gameState ? 
            this.props.gameState.players.map((player) => (
              <ul className="flex-row-start" key={player.username + player.points.toString()}>
                <li className="name-score1" key={player.username}>Player: {player.username}</li>
                <li className="name-score2" key={player.points.toString() + player.username}> Score: {player.points}</li>
              </ul>
            )) : null}
        </div>

      </div>
    )
  }

}

export default Score