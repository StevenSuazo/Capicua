// import SoloRoom from "./frontend/src/classes/socketiobackend/solo_room"
const SoloRoom = require("./frontend/src/classes/socketiobackend/solo_room")
const Room = require("./frontend/src/classes/socketiobackend/room")

const express = require("express");
// const request = require("request");
const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

// app.get("/join2playergame", (req,res) => {
// })  

// const mongoose = require("mongoose");
// const db = require("./config/keys").mongoURI;
// const users = require("./routes/api/users");
// const User = require("./models/User");
// const bodyParser = require("body-parser");

const path = require('path');

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('frontend/public'));
//   app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'start', 'index.html'));
//   })
// }

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to mongoDB"))
//   .catch(err => console.log(err))

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   const user = new User({
//     username: "Demo",
//     password: "password"
  // })
//   app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

//   app.get("/joinSoloGame", (req, res) => {
//   request(
//     { url: 'http://localhost:3000/#/joinSoloGame' },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: err.message });
//       }

//       res.json(JSON.parse(body));
//     }
//   )
// });

//   user.save()
//   res.send("Hello World!");
// });

// app.use("/api/users", users)


// const WebSocket = require('ws');

// const wss = new WebSocket.Server(process.env.PORT || { port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });
// });

// app.listen(port, () => {console.log(`Listening on port ${port}`)});

const server = require('http').createServer(app);
// const options = { /* ... */ };
// const io = require('socket.io')(server, options);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;

let rooms = {};
let roomAtSocket = {}


io.on('connection', socket => { 

  socket.on("createRoom", (data) => {
    let roomName = data.roomName;
    

    if (rooms[roomName]) {
            socket.emit('receiveRoomError', 'Room already exists!');
    } else {
      
      let username = data.username;
      let id = socket.id;
      let _data = {username, id};
      
      //total number of expected players
      let numPlayers = data.numPlayers;


      socket.join(roomName);
      roomAtSocket[id] = roomName;
      rooms[roomName] = new Room(numPlayers, roomName, io);

      rooms[roomName].addPlayer(_data);
      socket.emit("joinRoom", roomName);

    }




  })

  socket.on("joinExistingRoom", (data) => {
    let roomName = data.roomName;
    

      if (!rooms[roomName]) {
          socket.emit("receiveRoomError", "Room does not exist") 
    } else {

      let username = data.username
      let id = socket.id;
      let _data = {username, id}



      socket.join(roomName)
      roomAtSocket[id] = roomName;

      rooms[roomName].addPlayer(_data)



      socket.emit("joinRoom", roomName)

      io.in(roomName).emit("updateRoomPlayers", {lobbyPlayers: rooms[roomName].players});



    }
  })

// this is no longer useful since 1player is offline
  socket.on("startSoloGame", (data) => {

    // socket ID is room name
    let roomName = socket.id;
    // join a room
    socket.join(roomName);
    
    //construct data
    const playerData = [{username: "Cyborg", isAi: false},
    {username: data.username, isAi: false}]

    //create Room Object
    let newRoom = new SoloRoom(roomName, io, playerData);
    rooms[roomName] = newRoom;

    //create game inside room object
    newRoom.createGame();

    //tell client game is ready
    socket.emit("changePhase", "soloLobby")
    // socket.to(roomName).emit("changePhase", "solo")

    //testing
    let currentGame = rooms[socket.id];
    let newGameState = currentGame.sendGameState();
    socket.emit("receiveGameState", newGameState)
    //testing

  })

  socket.on("askingForGameState", (roomName) => {
      
      let currentGame = rooms[roomName];
      let newGameState = currentGame.sendGameState();

      socket.emit("receiveGameState", newGameState)
  })

  //this trigger is on the <Lobby Component> for multiplayer Games
  socket.on("gameStartRender", (roomName) => {

    let currentFullRoom = rooms[roomName]
    currentFullRoom.createGame()

    io.in(roomName).emit("changePhase", "multiPlayerGameStart");  


      //testing
          // let currentGame = rooms[socket.id];
          // let newGameState = currentGame.sendGameState();
          // socket.emit("receiveGameState", newGameState)

      //testing

  })

  // here server receives a players move
  socket.on("sentPlayerInput", (data)=> {
    let posPlay = data.posPlay;
    let center = data.center;
    let boneIdx = data.boneIdx;
    let roomName = data.roomName

    let currentGame;
    let newGameState;

    let isCurrentGameOver
    let showModalBoolean;




    const room = rooms[roomName];

    if(room){

        
          const currentBone = room.board.currentPlayer.hand.splice(boneIdx,1)[0];
          const verifyMove = room.board.makeMove(posPlay, center, currentBone);

          if(verifyMove){
                isCurrentGameOver = room.board.isCurrentGameOver();
            if (isCurrentGameOver){

                // probably emit here gameState
                showModalBoolean = (!room.board.inSession || room.board.lockedGame)
     

                currentGame = rooms[roomName];
                newGameState = currentGame.sendGameState();
                newGameState[showModalBoolean] = showModalBoolean;
              
                
                // this exits early with extra key in the newGameState object
                return io.in(roomName).emit("receiveGameState", newGameState)
            }

            room.board.resetSkipCounter();

            if(room.board.inSession === true){
              room.board.nextPlayerAssignTurn();

              //emit here gameState
            } else {
              //game is NOT in Session
              //emit gameState
            }
        } else {
          // move is invalid
            // debugger
            room.board.currentPlayer.hand.splice(boneIdx, 0, currentBone); 
            
            //emit gameState

        }
      
        room.board.currentPlayer.revealHand()
     
        
      }
    
    
        
    // This could stay here or it can go above in else Statements ^^
    // Once is cleaner
    currentGame = rooms[roomName];

    newGameState = currentGame.sendGameState();

    io.in(roomName).emit("receiveGameState", newGameState);
    

  })

  // This is where the server sends out restart game / new game information.
  socket.on("restartGame", data => {
    let newGameBoolean = data.newGameBoolean;
    let newRoundBoolean = data.newRoundBoolean;
    let roomName = data.roomName;

    let currentGame = rooms[roomName];
    let newGameState;

    if(newGameBoolean === true){
      currentGame.createGame()

    } else if(newRoundBoolean === true){
      currentGame.newNextRound();

    }

    newGameState = currentGame.sendGameState()
    io.in(roomName).emit("receiveGameState", newGameState);
  })


  // Here a player disconnects from server however the room is still available.
  // I suggest the room is deleted as well
  socket.on("disconnect", id => {
    let roomName = roomAtSocket[socket.id];
    io.in(roomName).emit("changePhase", "playerDisconnect");

  })

  

});


// No need for this since gameState is sent on a per turn basis
// setInterval(() => {
//     Object.keys(rooms).forEach(roomName => {
//         const room = rooms[roomName];
//         if (room) {

//             let newGameState = room.sendGameState();
//             io.to(room.roomName).emit('receiveGameState', newGameState);
//             // io.to(room.roomName).emit('receiveConsoleMessage', 'Updating game state');
//         }
//     })
// }, 200);

// server.listen(3000);








const router = require('./router');
// const { useParams } = require("react-router-dom");
// const cors = require('cors');


// let users = [];

// const messages = {
//   room1: [],
//   room2: [],
//   room3: [],
//   room4: []
// }





//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);

//     io.to(user.room).emit('message', { user: user.name, text: message });

//     callback();
//   });




app.use(router);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));