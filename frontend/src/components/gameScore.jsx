import React from "react";
import '../stylesheets/gameScore.css';
const currentPlayer = {username: "sergio", score: 68}
const names = [
    {username: "sergio", score: 68},
    {username: "yangel", score: 63},
    {username: "chris", score: 62},
    {username: "steven", score: 61}

]
 
class Score extends React.Component {
    

    render(){
        const {board} = this.props;

        const nameScores = board.players.map((player) => (
                    <ul className="flex-row-start" key={player.username+player.points.toString()}>
                        <li className="name-score1" key={player.username}>Player: {player.username}</li>
                        <li className="name-score2" key={player.points.toString()+player.username}> Score: {player.points}</li>
                    </ul>
                                ))

        return(
            <div className="score-box-container">
            
                {/* <div className="current-player">{currentPlayer.username} </div> */}
                
                
                <div className="name-and-points">
                {nameScores}
                </div>
        
            </div>
        )
    }
}

export default Score