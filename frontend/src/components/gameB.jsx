import React from "react";
import Board from "./boardB"
import {allDominos} from "./allDominos"
import Chat from './messages/chat';
import Score from './gameScoreB.jsx';
import Countdown from "./countdownS";

// const React = require("react");
// const Board = require("./boardB");
// const BoardObject = require("../classes/board");
// const { set } = require("mongoose");
// const {allDominos} = require("./allDominos");
// const Chat = require('./messages/chat');
// const Score = require('./gameScoreB.jsx');
// const Countdown = require("./countdownS");

class GameB extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            board: "",
            gameState: undefined
            }
        
        this.socket = this.props.socket
        this.previousPlayersArr = undefined;
        this.updateGame = this.updateGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.findCurrPlayer = this.findCurrPlayer.bind(this)
        this.username = undefined;
        this.currPlayerIdx = this.findCurrPlayer();
        debugger
    }

    componentDidUpdate(prevProps) {


        if(prevProps.gameState.arena !== this.props.gameState.arena){
            this.setState({gameState: this.props.gameState})
        }
        if(prevProps.gameState.inSession !== this.props.gameState.inSession){
            this.setState({gameState: this.props.gameState})
        }
 
    }


    componentDidMount(){
        this.setState({gameState: this.props.gameState})    
    }

    restartGame(e, isNewGame = undefined) {

        //start a brand new game with everything reset
        if(isNewGame){

            //emit new game Request
             this.props.socket.emit("restartGame", {roomName: this.state.gameState.roomName,
                                 newGameBoolean: true, newRoundBoolean: false })
               
        } else {
            // continue on to next round.
            //emit new round request
            this.props.socket.emit("restartGame", {roomName: this.state.gameState.roomName,
                                newGameBoolean: false, newRoundBoolean: true })    
        }
       
    }

    findCurrPlayer = () => {
        let num;
        let username;

        for (let i = 0; i < this.props.gameState.players.length; i++) {
            if (this.props.gameState.players[i].id === this.props.socket.id) {
                num = i;
            }
        }
        username = this.props.gameState.players[num].username
        this.username = username;
        return num;

    }

    updateGame(posPlay, center, boneIdx) {
        //  
        this.socket.emit("sentPlayerInput", {posPlay: posPlay,
        center: center, boneIdx: boneIdx, roomName: this.state.gameState.roomName})
       
    }

    render(){
        let modal;
     
        
        //Restart Game Modal
        if (this.state.gameState){
            // 
            if(this.state.gameState.winningPlayer){

                const {endGame, winningPlayer, lockedGame} = this.state.gameState;
        
                const text = endGame ? `${winningPlayer.username} wins the Game!` :
                            lockedGame ? 
                        `${winningPlayer.username} wins the Round via lockout! ` :
                        `${winningPlayer.username} wins the Round!`;

                const text2 = `Total Points: ${winningPlayer.points}`


                modal =
                <div className='modal-float-container-win'>
                    <div className='modal-container-win flex-row-start'>
                        <img className="capicua-domino" src={allDominos["cd"]}></img>
                        <div className='modal-content'>
                            <p>{text}</p>
                            <p>{text2}</p>
                            <Countdown restartGame={this.restartGame} endGame={this.state.gameState.endGame} />
                        </div>
                        <img className="capicua-domino" src={allDominos["cd"]}></img>
                    </div>
                </div>;
            }

            
        }
                   

        debugger
        return (
            <>
                <div className="board-score-container flex-row-start">
                    {modal}
                    { this.state.gameState ? <Board gameState={this.state.gameState}
                        socket={this.props.socket} updateGame={this.updateGame} heightDimen={this.props.heightDimen} /> : null }
                    <div className="flex-col-start">
                        <Chat board={this.state.board} username={this.username} socket={this.socket} key={"chat"}/>
                        <Score gameState={this.state.gameState} key={999}/>
                    </div>
                </div>
            </>
        )
    }

}

export default GameB;
// module.exports = GameB;