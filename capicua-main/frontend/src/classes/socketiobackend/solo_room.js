// import BoardObject from "../board"
const BoardObject = require("../boardB")

class SoloRoom {
    constructor(roomName, io, playerData){
        this.roomName = roomName;
        this.io = io;
        this.playerData = playerData;
        this.board = undefined;

    }


    createGame(){
        console.log("new room new solo game")
        this.board = new BoardObject(this.playerData, 900, this.roomName, this.io)

        // console.log(this.board)
    }

    sendGameState(){

        let showModalBoolean;

        // debugger
        // let inSession = this.board.isCurrentGameOver();
        // io: this.board.io,
        // return{   
        //         boneyard: this.board.boneyard,
        //         arena: this.board.arena,
        //         roomName: this.board.roomName,
                
        //         players: this.board.players,
        //         currentPlayer: this.board.currentPlayer.username,
        //         aIFirstMove: this.board.aIFirstMove,
        //         inSession: this.board.inSession,
        //         winningPlayer: this.board.winningPlayer,
        //         lockedGame: this.board.lockedGame,
        //         skipCounter: this.board.skipCounter,
        //         boardDimen: this.board.boardDimen
        //         }
        const removeProp = 'board';
        // const removeProp2 = 'io';

        const { [removeProp]: remove, 
                [removeProp2]: remove2, 
            ...currentPlayer } = this.board.currentPlayer;
        // debugger

        const players = []
        for(let i = 0; i < this.board.players.length; i++){
            let playerObj = {};
            let player = this.board.players[i];
            playerObj["username"] = player.username;
            playerObj["hand"] = player.hand;
            playerObj["points"] = player.points;
            playerObj["isAi"] = player.isAi;
            players.push(playerObj)
        }
            
        showModalBoolean = (!this.board.inSession || this.board.lockedGame)
        console.log(`Show modal:? ${showModalBoolean}`)
        
        return {arena: this.board.arena,
                boneyard: this.board.boneyard,
                players: players,
                currentPlayer: {username: this.board.currentPlayer.username,
                     isAi: this.board.currentPlayer.isAi,
                    hand: this.board.currentPlayer.hand},
                inSession: this.board.inSession,
                lockedGame: this.board.lockedGame,
                winningPlayer: this.board.winningPlayer,
                skipCounter: this.board.skipCounter,
                boardDimen: this.board.boardDimen,
                roomName: this.roomName,

        }


    }
}

module.exports = SoloRoom;
// export default SoloRoom;