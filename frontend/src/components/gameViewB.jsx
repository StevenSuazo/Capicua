const React = require("react");
// const queryString = require('query-string');
// const io = require("socket.io-client");

const Game = require('./gameB.jsx');
// const Chat = require('./chat/chat');


const bodega = require("../assets/img/La_Bodega.jpg");
// const Score = require('./gameScore.jsx');
// const Rules = require('./gameRule.jsx');
const Navbar = require('./navbar.jsx');

 export const GameViewComponent = (props) => {
    // debugger
     return (
        <div className="master-game-container">
           <Navbar/>

           <div className="board-chat-container flex-row-start">
               <Game socket={props.socket} gameState={props.gameState}/> 
            <div className="flex-col-start">
               {/* <Chat/> */}
               {/* <Score/> */}

            </div>
           </div>

           <div className="score-rules-container" >
            {/* <Score/> */}
            
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

