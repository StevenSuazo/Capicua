// const Boneyard = require("./boneyard");
// const Player = require("./player");
import Boneyard from "./boneyard";
import Player from "./player";

Array.prototype.myFlatten = function () {
    let flattened = [];

    this.forEach((el) => {
        if (el instanceof Array) {
            flattened = flattened.concat(el.myFlatten());
        } else {
            flattened.push(el);
        }
    });
    return flattened;
}; 
class Board {
    constructor(axiosPlayerData, boardDimen, roomName = undefined, io = undefined){
        this.boneyard = new Boneyard(this);
        this.arena = [];
        this.roomName = roomName;
        this.io = io;
        this.players = this.generatePlayers(axiosPlayerData);
        this.currentPlayer = undefined;
        this.aIFirstMove = undefined;
        this.inSession = true;
        this.winningPlayer = null;
        this.lockedGame = false;
        this.skipCounter = 0;
        this.boardDimen = boardDimen;
        this.runningGame()
    }

    

    //axiosPlayerData comes in as in Array
    generatePlayers(axiosPlayerData){
        const players = axiosPlayerData.map((playerData) => {

            if (playerData.isAi){
                return new Player(playerData.username, this, true,
                    this.roomName, this.io);
            }
            return new Player(playerData.username, this, false, 
                this.roomName, this.io );
        })

        return players
    }

    init(){
        //distribute 7 bones to each player
        this.startingHand();

        // if boneyard has all 7 double Dominos. create new Boneyard obj
        if (this.sevenDoubles()){
            this.restartBoneYard();
            this.init();
        }

        //set the currentPlayer to...
        // returns playerIdx => boneIdxInHandOfDouble
        let playerAndBoneIdx = this.decideFirstPlayer();

        //check if player is AI
        if (this.players[playerAndBoneIdx[0]].isAi){
            // ****************
            // ****************
            // ****************
            //works...
        }

        return playerAndBoneIdx



    }

    /*
    ********************************INITIALIZE BOARD FUNCTIONS START HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS START HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS START HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS START HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS START HERE**************
    */

    restartBoneYard(){

        //empty boneyard and make new bones
        this.boneyard = new Boneyard(this);
    }

    startingHand(){
        //this function will iterate through the players in the game 
        // and distribute 7 bones to each player at random

        this.players.forEach((player) => {
            player.hand = [];

            for(let i = 0; i < 7; i++){  
                player.hand.push(this.boneyard.bones.pop());
            }
        });
    }

    //Checks to make sure at least one player has one double
    sevenDoubles() {
        let doubleBoneCounter = 0;
        this.boneyard.bones.forEach(boneObj => {
            if (boneObj.isDouble()) {
                doubleBoneCounter++;
            }
        })
        return doubleBoneCounter === 7 ? true : false;
    }

    decideFirstPlayer(){
        //Automatically pick lowest Double Domino with => playerIdx => boneIdxInHand
        let playerWithHighestDouble = ([[0, 0], null, null]);

        this.players.forEach((player, playerIdx) => {
            player.hand.forEach((bone, boneIdx) => {
                // test only doubles
                if (bone.isDouble()){
                    playerWithHighestDouble = this.highestDouble(bone,
                        playerWithHighestDouble,
                        playerIdx,
                        boneIdx)
                    }
                })
            })

        this.currentPlayer = this.players[playerWithHighestDouble[1]]

        //                  => playerIdx => boneIdxInHand
        return [playerWithHighestDouble[1], playerWithHighestDouble[2]]

    }

    highestDouble(bone, currentHigh, currentPlayerIdx, boneIdx) {

      if (bone.topNumber >= currentHigh[0][0]){
        currentHigh = ([bone.boneVal, currentPlayerIdx, boneIdx]);
        return currentHigh;
      }
      return currentHigh;
    }

    /*
    ********************************INITIALIZE BOARD FUNCTIONS END HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS END HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS END HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS END HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS END HERE**************
    */



    /*
    ********************************RUNNING GAMEPLAY FUNCTIONS START HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS START HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS START HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS START HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS START HERE**************
    */

    //Ensures currentPlayer plays highest Double
    firstMoveAndCorrectBone(mandatoryBoneIdxToPlay){
        this.arena.push(this.currentPlayer.hand.splice(mandatoryBoneIdxToPlay[1],1)[0]);
        this.renderArena();
    }

    runningGame(){
        //force an initial play of the highest double when arena is empty.
        if (this.arena.length === 0){
            const mandatoryBoneIdxToPlay = this.init()
            this.firstMoveAndCorrectBone(mandatoryBoneIdxToPlay)
            this.nextPlayerAssignTurn()
        } else {

        }

    }

    //function checks in advance if the currPlayer has a playable piece
    isBonePlayable(bone){
        const arenaLeftBoneVal = this.arena[0].boneVal[0];
        const arenaRightBoneVal = this.arena[this.arena.length-1].boneVal[1];

        const leftSidePlayable  = ((bone.boneVal[0] === arenaLeftBoneVal ) || (bone.boneVal[1] === arenaLeftBoneVal));
        const rightSidePlayable = ((bone.boneVal[0] === arenaRightBoneVal) || (bone.boneVal[1] === arenaRightBoneVal));

        if (leftSidePlayable || rightSidePlayable) return true;
        return false
    }



    //Changes currentPlayer to the next player
    nextPlayerAssignTurn(){
        let idxCurrPlayer ;
        idxCurrPlayer = this.players.indexOf(this.currentPlayer)   

        this.currentPlayer = this.players[((idxCurrPlayer + 1) % this.players.length)]
        let isGameLocked = undefined;

        // if NEW currentPlayer CANNOT make a valid move... 
        if(!this.currentPlayer.hasPlayableBones()){
            // 
            
            // If boneyard empty, changePlayer to nextPlayer
            if (this.boneyard.bones.length === 0){
                isGameLocked = this.addOneToSkipCounter();

                if(isGameLocked){
                    // 
                    return false
                }
                this.nextPlayerAssignTurn()
                //insert currying function here
                // **** VERY IMPORTANT ****
            } else {
                //currentPlayer draws from boneyard
                // auto draw feature. (no animation yet)
                while ((!this.currentPlayer.hasPlayableBones()) && (this.boneyard.bones.length > 0)){
                    // 
                    this.currentPlayer.drawBone()
                    
                }

                //player draws all bones && still has no valid move
                if((this.boneyard.bones.length === 0) && (!this.currentPlayer.hasPlayableBones())){
                    // 
                    isGameLocked = this.addOneToSkipCounter();

                    if (isGameLocked) {
                        // 
                        return false
                    }
                    this.nextPlayerAssignTurn()
                }
                
            }
        }

        

        return true;
    }

    makeMove(xPosPlay, center, bone){
        // extracting the far left number on the arena
        const arenaLeftBoneVal = this.arena[0].boneVal[0];
        // extracting the far right number on the arena
        const arenaRightBoneVal = this.arena[this.arena.length-1].boneVal[1];
        // Player plays left side
        if(xPosPlay < center){
            
            //we use this return of play in update Game in Game.jsx
           return this.playerPlaysLeft(arenaLeftBoneVal, bone);
        } else {
            
            // Player plays right side
            return this.playerPlaysRight(arenaRightBoneVal, bone)

        }
        // make move ought to return a boolean and then we use that boolean
        // to determine a draw or a skip or a commitMove
        // draw(this.currentPlayer)
       
    }

    playerPlaysLeft(arenaLeftBoneVal, bone){
        // 
        //check bottom number of player hand bone first
        // second test checks top number of player hand bone second
        //orig below
        // if(bone.boneVal[1] !== arenaLeftBoneVal && bone.boneVal[0] === arenaLeftBoneVal){
            // 
        if((bone.boneVal[1] !== arenaLeftBoneVal) && (bone.boneVal[0] === arenaLeftBoneVal)){
            
            bone.boneReverse();
            this.arena.unshift(bone);

            return true;
        } else if(bone.boneVal[1] === arenaLeftBoneVal){
            
            //bone bottom val playable on left - as is. just rotate svg -90
            this.arena.unshift(bone);

            return true;
        } else {
            
            // left play not playable - make player draw
            //******************************* */
            //******************************* */
            //******************************* */
            return false
        }
    }

    playerPlaysRight(arenaRightBoneVal, bone){
        
        //orig below
        // if(bone.boneVal[0] !== arenaRightBoneVal && bone.boneVal[1] === arenaRightBoneVal){
            // 
        if((bone.boneVal[0] !== arenaRightBoneVal) && (bone.boneVal[1] === arenaRightBoneVal)){
            
                bone.boneReverse();
                this.arena.push(bone);

                return true;
            } else if(bone.boneVal[0] === arenaRightBoneVal){
                
                this.arena.push(bone);

                return true;
            } else {
                
                // right play not playable - make player draw
                //******************************* */
                //******************************* */
                //******************************* */
                return false;
            }
    }

    //this function will draw a bone/domino from the boneyard into the currentPlayerHand
    // draw(player) {
    //    let pickedBone = this.boneyard.bone 
    // }
    /*
    ********************************RUNNING GAMEPLAY FUNCTIONS END HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS END HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS END HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS END HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS END HERE**************
    */

    // Renders Arena for Terminal
    renderArena(){
        if (this.arena.length === 0){
            return "[]"

        }else{
            let arenaString = ""

            this.arena.forEach(bone => {
                arenaString += `[${bone.boneVal[0]}, ${bone.boneVal[1]}] ${bone.isReversed}, `
            })
            return arenaString
        }

    }

    isCurrentGameOver(){
        // 
        if(this.currentPlayer.hand.length === 0){
            // 
            this.inSession = false;
            this.winningPlayer = this.currentPlayer;
            this.tallyAllPointsForWinner();

            return true;
        }
        else if(this.lockedGame === true){
            this.inSession = false;
            let totalHandValues = [];

            this.players.forEach((player) => {
                let playerHandVals = [];

                player.hand.forEach(bone => {
                    playerHandVals.push(bone.boneVal);
                })

                totalHandValues.push(playerHandVals.myFlatten().reduce((a,b) => a + b, 0));
            })

            // The player with lowest points at game end gets all the points.
            let lowestTotalScore = Math.min(...totalHandValues);
            const indexOfWinner = totalHandValues.indexOf(lowestTotalScore);

            // this.currentPlayer = this.players[indexOfWinner];
            this.winningPlayer = this.players[indexOfWinner];

            this.tallyAllPointsForWinner();
            // this.currentPlayer.points -= lowestTotalScore;
            this.winningPlayer.points -= lowestTotalScore;
            return true
        }
        return false;
        
    }
    
    // When the round is over. Add all the points of all the players
    tallyAllPointsForWinner(){
        let allHands = [];

        this.players.forEach(player => {
            player.hand.forEach(bone => {
                allHands.push(bone.boneVal);
            })
        })

        this.winningPlayer.points += allHands.myFlatten().reduce((a, b) => a + b, 0)
    }

    endGame(){
        if (this.winningPlayer.points >= 80){
            return true
        }
        return false
    }

    addOneToSkipCounter(){
        this.skipCounter += 1;

        if (this.skipCounter >= this.players.length){
            this.lockedGame = true;
            return this.isCurrentGameOver();

        }

        return false;
    } 

    resetSkipCounter(){
        this.skipCounter = 0;
        this.lockedGame = false;
    }
}

// export default Board;
export default Board;
