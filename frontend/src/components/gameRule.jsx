import React from "react";
import '../stylesheets/rules.css';

class Rules extends React.Component {

    render(){
        return (
            <div className="rules-music-container">
                <ul>
                    <li className="game-rule">- Each player starts with 7 bone’s.</li>
                    <li className="game-rule">- Player with the highest double goes first.</li>
                    <li className="game-rule">- A played bone must match one of the end’s of the current bones on the board.</li>
                    <li className="game-rule">- You must draw a bone if you don’t have one to play with or your turn get skip.</li>
                    <li className="game-rule">- Capicua is when you play a winning bone, that can go on ether side of board (+25 points)</li>
                </ul>
            </div>
        )
    }
}

export default Rules;