const BoardObject = require("../boardB");
const Player = require("../player");

class Room {
    constructor(numPlayers, roomName, io,){
        this.numPlayers = numPlayers
        this.roomName = roomName;
        this.io = io;
        this.gameState = {

        }
        this.players = [];
        this.previousPlayersArr = undefined;
    }

    addPlayer(data){
        const player = {username: data.username, id: data.id};
        this.players.push(player);
    }

    createGame(){
        console.log("new room new multiplayer game")
        this.board = new BoardObject(this.players, 900, this.roomName, this.io)

        // console.log(this.board)
    }

    newNextRound(){
        this.previousPlayersArr = this.board.players;
        this.createGame();
        this.giveBackPointsToPlayers(this.board);
    }

    giveBackPointsToPlayers(board){
        this.previousPlayersArr.forEach((oldPlayerObj, idx) => {
            board.players[idx].restorePoints(oldPlayerObj.points)
        })
    }

    // resetFauxBoneyard(numPlayers){
    //    this.board.boneyard.bones = this.board.boneyard.resetBoneyardForRestart(numPlayers);

    // }

    sendGameState(){

        let showModalBoolean;
        const removeProp = 'board';

        const { [removeProp]: remove, 
            ...currentPlayer } = this.board.currentPlayer;

        let winningPlayer;
        let endGame;
        if(this.board.winningPlayer) {
            winningPlayer = {username: this.board.winningPlayer.username,
                    hand: this.board.winningPlayer.hand,
                    id: this.board.winningPlayer.id,
                    points: this.board.winningPlayer.points}

            endGame = this.board.endGame()
        }

        const players = []
        for(let i = 0; i < this.board.players.length; i++){
            let playerObj = {};
            let player = this.board.players[i];
            playerObj["username"] = player.username;
            playerObj["hand"] = player.hand;
            playerObj["points"] = player.points;
            playerObj["isAi"] = player.isAi;
            playerObj["id"] = player.id
            players.push(playerObj)
        }

        // showModalBoolean = (!this.board.inSession || this.board.lockedGame)
        // console.log(`Show modal:? ${showModalBoolean}`)

        return {arena: this.board.arena,
                boneyard: this.board.boneyard,
                players: players,
                currentPlayer: {username: this.board.currentPlayer.username,
                     isAi: this.board.currentPlayer.isAi,
                    hand: this.board.currentPlayer.hand,
                    id: this.board.currentPlayer.id},
                inSession: this.board.inSession,
                lockedGame: this.board.lockedGame,
                winningPlayer: winningPlayer,
                skipCounter: this.board.skipCounter,
                endGame: endGame,
                boardDimen: this.board.boardDimen,
                roomName: this.roomName,

        }

    }
}

module.exports = Room;