import React, { useState } from 'react';
import { Link } from "react-router-dom";
import io from "socket.io-client";
import HOST from "../../util/host";
import {GameViewComponent} from '../gameViewB';
import ChooseAi from "../chooseAi"
import Lobby from "./lobby"
import {capitalize, truncate} from "../../util/strUtil"
import bodega from "../../assets/img/La_Bodega.jpg"

import './join.css';


class Join extends React.Component{
    constructor(props){
      super(props)

      this.state = {
        gameType: undefined,
        title: undefined,
        players: null,
        username: "",
        totalPlayers: undefined,
        roomName: "",
        isOnline: undefined,
        buttonText: undefined,
        phase: "prelobby",
        gameState: "",
        aiMove: "",
        numAiPlayers: undefined,
        joinOrCreate: undefined,
        placeholderError: "Choose your Username",
        placeholderErrorRoom: "Room Name",
        lobbyPlayers: [],
        playerDisconnected: undefined
        
      }

      this.socket = null;

      this.update = this.update.bind(this);
      this.handlePhaseChange = this.handlePhaseChange.bind(this);
      this.receiveGameState = this.receiveGameState.bind(this);
      this.handleGameStart = this.handleGameStart.bind(this);
      this.handleSetJoinOrCreate = this.handleSetJoinOrCreate.bind(this);
      this.handleServerLogic = this.handleServerLogic.bind(this);
      this.receiveJoinRoom = this.receiveJoinRoom.bind(this);
      this.receiveLobbyPlayers = this.receiveLobbyPlayers.bind(this);
      this.receiveRoomError = this.receiveRoomError.bind(this);

      //disconnect
      this.handleDisconnect = this.handleDisconnect.bind(this);

      //testing
      this.handleStartSoloServer = this.handleStartSoloServer.bind(this);
      this.receiveAiAutoPlayData = this.receiveAiAutoPlayData.bind(this);

      //Offline settings
      this.handleSetAiPlayers = this.handleSetAiPlayers.bind(this);
    }

  componentDidMount(){
    // this.socket = io(HOST);
    // debugger
    
    if(this.props.location.state.isOnline === true){
      // debugger
      this.socket = io(HOST);
      this.socket.on('connect', socket => {

      console.log("hooray")

      
      this.socket.on("changePhase", this.handlePhaseChange)
      this.socket.on("receiveGameState", this.receiveGameState)
      this.socket.on("AiAutoPlayData", this.receiveAiAutoPlayData)
      this.socket.on("joinRoom", this.receiveJoinRoom)
      this.socket.on("updateRoomPlayers", this.receiveLobbyPlayers)
      this.socket.on("receiveRoomError", this.receiveRoomError)


      
      })
    }
    

    this.setState({title: this.props.location.state.title,
                   gameType: this.props.location.state.gameType,
                   buttonText: this.props.location.state.buttonText,
                   totalPlayers: this.props.location.state.totalPlayers,
                   isOnline: this.props.location.state.isOnline
                  }) 

    // if(this.state.phase === "solo"){
    //     this.socket.emit("askingForGameState", this.roomName)
    // }
  }

  componentDidUpdate(prevProps) {
    // debugger
    // if(prevProps.history.location.state.phase == "prelobby"){
    //   if(prevProps.history.location.state.phase !== this.state.phase){
    //     debugger
    //     this.socket.emit("askingForGameState", this.roomName)
    //   }
    // }

    // if(this.state.phase === "soloLobby"){
    //   debugger
    //   this.socket.emit("askingForGameState", this.roomName)
    // }
  }

  update(field){
    let truncated; 
    return e => {
      // if(this.state.username !== e.currentTarget.value){
          if(e.currentTarget.value.length > 12){
            truncated = truncate(e.currentTarget.value, 12);
        } else if(e.currentTarget.value.length > 0){
            this.setState({[field]: truncated ? capitalize(truncated) : capitalize(e.currentTarget.value)})
        }else{
            this.setState({[field]:e.currentTarget.value})
        }
      // }
      }
     
  }

  handleStartSoloServer(e, isOnline) {

    if(this.state.username != ""){
        if(isOnline){
          this.socket.emit("startSoloGame", {username: this.state.username});
          this.setState({ roomName: this.socket.id });  
      } else {
          this.setState({phase: "soloLobby"})
      }
    }else if(this.state.username === ""){
      this.setState({placeholderError: "Username cannot be empty"})
    }
    
    
  }

  handleServerLogic(serverInstruction){
    if(this.state.username !== "" && this.state.roomName !== ""){

      //Join a Server Room
      if(serverInstruction === "join"){
        this.setState({lobbyPlayers: [{username: this.state.username}]}, () => {
          this.socket.emit("joinExistingRoom", {username: this.state.username, 
                                          roomName: this.state.roomName})
          })
      } else {
        // Create a Server Room
        // debugger
        // this.setState({lobbyPlayers: this.state.lobbyPlayers.push({username:this.state.username})}, () => {
        this.setState({lobbyPlayers: [{username: this.state.username}]}, () => {
          // debugger
            this.socket.emit("createRoom",
            {roomName: this.state.roomName,
              username: this.state.username,
              numPlayers: this.state.totalPlayers})
            })
        
      }
    }
    if(this.state.username === ""){
      this.setState({placeholderError: "Username cannot be empty"})
    }
    if(this.state.roomName === ""){
      this.setState({placeholderErrorRoom: "Room name cannot be empty"})
    }
}

  receiveJoinRoom(roomName){
    this.setState({roomName: roomName, phase: "lobby"})

  }

  receiveRoomError(msg){
    this.setState({placeholderErrorRoom: msg, roomName: ""})
  }

  receiveLobbyPlayers(data){
    this.setState({lobbyPlayers: data.lobbyPlayers, phase: "lobby"})
  }

  handleGameStart(){
    if (this.state.isOnline){
      this.socket.emit("gameStartRender", this.state.roomName)
    } else {
      this.setState({phase: "soloGameStart"})
    }
  }

  handlePhaseChange(phase){
    // debugger

    if (phase === "playerDisconnect"){
      this.setState({phase: phase, playerDisconnected: true})
    } else {
      this.setState({phase: phase})

    }

    // debugger
    // this.receiveGameState()

  }

  receiveGameState(gameState) {
    // debugger
    this.setState({ gameState: gameState });
    // debugger
  }
  
  receiveAiAutoPlayData(aiMove) {
    this.setState({aiMove: aiMove})
  }

  handleSetAiPlayers(num){
    this.setState({numAiPlayers: num}, () => {
      
      this.generateAiPlayers()

    })
  }

  handleSetJoinOrCreate(str){
    this.setState({joinOrCreate: str})
  }

  handleDisconnect(){
    console.log(this.socket.id)
    console.log("has left Join B")
    // this.socket.emit("disconnect", this.socket.id)
  }

  generateAiPlayers() {
    let players = []

       players.push({username: capitalize(this.state.username)})

        const superHeroes = ["Peter Parker", "Bruce Wayne", "Clark Kent", "Diane Prince", 
          "Barbara Gordon", "Kara Danvers", "Carol Danvers", "Wally West",
          "Jon Stewart", "Virgil Hawkins"]

        // const superHeroes = ["Peter Parker", "Bruce Wayne", "Clark Kent"]

          let aiPlayer;
          const existingUsernames = {}

          existingUsernames[this.state.username.toLowerCase()] = this.state.username.toLowerCase()

          //FN prevent duplicate names for iterative solution
          // const isDuplicate = (existingPlayer) => existingPlayer.username === aiPlayer.username
          
          
          for(let i = 0; i < this.state.numAiPlayers; i++){
              let randomIdx = Math.floor(Math.random() * superHeroes.length);
              let aiUsername = superHeroes[randomIdx];
              aiPlayer = {username: aiUsername, isAi: true}
            
              //hash access solution
                while(existingUsernames[aiPlayer.username.toLowerCase()] === aiPlayer.username.toLowerCase()){
                    randomIdx = Math.floor(Math.random() * superHeroes.length);
                    aiUsername = superHeroes[randomIdx];
                    aiPlayer = {username: aiUsername, isAi: true}
                }

              existingUsernames[aiPlayer.username.toLowerCase()] = aiPlayer.username.toLowerCase()
              players.push(aiPlayer)

          }

          // this.setState({players: players}, ()=> {
          //   return players;
          // })
          this.setState({players: players})


          

      }
  

    render(){

      let showInputField;
      let displayPhase;
      let players;

      
      
      // FN to generate AI Player objects 
      // const generateAiPlayers = () => {
        // players.push({username: this.state.username})
        // debugger
       

      // this sets the State with Random AI usernames
      // if(!this.state.players && this.state.numAiPlayers){
      if(this.state.players && this.state.numAiPlayers){
        players = this.state.players
      }

      const selectInputFields = () => {
        const userAndRoomInput =
                    <>
                    <div>
                      <input placeholder={this.state.placeholderError}
                      value={this.state.username} 
                      onChange={this.update("username")} className="joinInput" type="text" />
                    </div>
                    <div>
                      <input placeholder="Room" 
                      placeholder={this.state.placeholderErrorRoom}
                      value={this.state.roomName}
                      onChange={this.update("roomName")}
                      className="joinInput mt-20" type="text" />
                    </div>
                    </>
                  

        if(this.state.gameType){
            switch(this.state.gameType){
              case "solo":
                return (
                  <div>
                    <input placeholder={this.state.placeholderError}
                    value={this.state.username}
                    onChange={this.update("username")} className="joinInput" type="text" />
                  </div>
                )

                break;

              case "multiplayer":
                // plus lobby phase
                switch(this.state.joinOrCreate){

                  default: 
                    return(userAndRoomInput)

                }
              
          }
        }
          
      }

      const displayPhaseFn = () => {
          let joinAndCreateText = ["Join Room", "Create Room"];
          let buttonToJoinServer;
          let buttonToCreateServer;
          let buttonToOfflineGame;

          
          

          //These appear first when user selects 2 Player Game
          // Simple dual button - Join - Create which populate the upcoming
          // Button to join a server or create a server
          const joinAndCreateArr = joinAndCreateText.map(text => {
            let callbackFn;
            if(text === "Join Room"){
                callbackFn = (e) =>{
                 this.handleSetJoinOrCreate("join") 
                 this.handlePhaseChange("startServer")
                }
            }else {
                callbackFn = (e) => {
                  this.handleSetJoinOrCreate("create")
                  this.handlePhaseChange("startServer")
                }
            }
            return (
                    <button key={text} className={'button mt-20 mlr-5'} 
                        onClick={callbackFn}
                        type="submit">{text}
                    </button>
            )
          })

          // These are the buttons under the input fields.
          if(this.state.buttonText){
            // debugger
            buttonToJoinServer = <button className={'button mt-20'} 
                        onClick={() => this.handleServerLogic("join")}
                        type="submit">{this.state.buttonText[0]}</button>

            buttonToCreateServer = <button className={'button mt-20'} 
                        onClick={() => this.handleServerLogic("create")}
                        type="submit">{this.state.buttonText[1]}</button>

            buttonToOfflineGame = <button className={'button mt-20'} 
                        onClick={(e) => this.handleStartSoloServer(e, false)}
                        type="submit">{this.state.buttonText}</button>
          }

          switch(this.state.phase){
              case "prelobby":
                return (
                  <div className="joinOuterContainer">
                    <div className="joinInnerContainer">
                      <h1 className="heading">{this.state.title}</h1>
                        {/* <div className="flex-row-start evenly">  */}
                        {/* this.state.joinOrCreate === "join" */}
                        {this.state.isOnline ? 
                          <div className="flex-row-start evenly">{joinAndCreateArr}</div> : showInputField}

                        {this.state.isOnline ? null : buttonToOfflineGame}
                        
                    </div>
                    <img src={bodega} alt="bodega" className="bodega-img-splash" ></img>
                  </div>
                )

                break;
              case "startServer":
                      return(
                        <div className="joinOuterContainer">
                          <div className="joinInnerContainer">
                            <h1 className="heading">{this.state.title}</h1>
                              {showInputField}
                              {this.state.joinOrCreate === "join" ? 
                        buttonToJoinServer : buttonToCreateServer }
                          </div>
                          <img src={bodega} alt="bodega" className="bodega-img-splash" ></img>
                        </div>
                      )

                  break;
              case "soloLobby":
                // debugger

                if(this.state.gameState){
                  // //this starts an online Lobby
                  // debugger
                  //   return (
                  //     // <GameViewComponent board={this.state.gameState}/>
                  //     <Lobby players={this.state.gameState.players}
                  //     totalPlayers={this.state.totalPlayers}
                  //     handleGameStart={this.handleGameStart}/>
                  //  )
                } else if(!this.state.isOnline && !this.state.numAiPlayers){
                    return (<ChooseAi handleSetAiPlayers={this.handleSetAiPlayers} 
                      username={this.state.username}/>)

                    
                } else if(this.state.players){
                    return (<Lobby username={this.state.username} 
                        players={this.state.players}
                        totalPlayers={this.state.numAiPlayers + 1}
                        isOnline={this.state.isOnline} 
                        handleGameStart={this.handleGameStart}/> )
                }

                break;

              case "soloGameStart":

                if(this.state.gameState){
                    return(<GameViewComponent socket={this.socket} gameState={this.state.gameState}/>)
                } else if (!this.state.isOnline && this.state.players){
                  debugger
                }

                break;
              case "lobby":
                if(this.state.roomName && this.state.lobbyPlayers){
                     return (
                      // <GameViewComponent board={this.state.gameState}/>
                      // players={this.state.gameState.players}
                      // debugger
                      <Lobby 
                      joinOrCreate={this.state.joinOrCreate}
                      roomName={this.state.roomName}
                      players={this.state.lobbyPlayers}
                      totalPlayers={this.state.totalPlayers}
                      isOnline={this.state.isOnline} 
                      handleGameStart={this.handleGameStart}/>
                   )
                }

                  break;

                case "multiPlayerGameStart":
                //this if statement is redundent, however react would complain without it
                  if(this.state.isOnline){
                      if(!this.state.gameState) this.socket.emit("askingForGameState", this.state.roomName);
                      if(this.state.gameState){
                        return (<GameViewComponent 
                          socket={this.socket}
                          gameState={this.state.gameState}/>)
                      }
                  }
                  
                  break;

                case "playerDisconnect":
                  if(this.state.playerDisconnected){
                      return (<Lobby 
                      // joinOrCreate={this.state.joinOrCreate}
                      roomName={this.state.roomName}
                      playerDisconnected={true}
                      // players={this.state.lobbyPlayers}
                      // totalPlayers={this.state.totalPlayers}
                      // handleGameStart={this.handleGameStart}
                      /> )
                  }

                  break;
                  

                default:
                  return <p>Loading... </p>

          }
      }
      
      showInputField = selectInputFields();
      displayPhase = displayPhaseFn();
      // debugger

      return (
        <>
        {displayPhase}
        </>
      );
  }
}

export default Join;