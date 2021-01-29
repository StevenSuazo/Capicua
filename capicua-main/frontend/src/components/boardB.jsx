import React from "react";
import Konva from "konva"
import { Stage, Layer, Group, Text} from 'react-konva';
// import Bone from "./bone"
import BoneL from "../classes/bone"
import Hand from "./handB"
import Arena from "./arenaB"
import OtherHands from "./otherHands"
import Boneyard from "./boneyardServer"

import { allDominos } from "./allDominos"


class Board extends React.Component {

    componentDidMount(){
        // this.getNums()
    }

    attachImages(){
        // const
    }

    findPlayerOnThisSocket = () => {
            let num;

            for(let i = 0; i < this.props.gameState.players.length; i++){
                if (this.props.gameState.players[i].id === this.props.socket.id){

                    num = i;
                }
            }
            return num;
            
    }

    

    render(){
        const boardDimen = this.props.gameState.boardDimen;
        const boneWidth = 30;
        const boneHeight = 60;
        const boneIsRevYPos = (boneWidth / 2);
        const boneNotRevYPos = ((boneWidth / 2) * 3);
        const thisPlayerIdx = this.findPlayerOnThisSocket();

        let {arena, currentPlayer, socket} = this.props.gameState;


        arena = arena.map(boneOptions => {
                return (new BoneL(boneOptions.boneVal, boneOptions.isReversed))
        })
        


        // these 4 lines are required to center the arena in the middle of the board
        // for Konva Group
        const currArenaLength = arena.length;
        const offSetCenterArena = ((currArenaLength / 2) * boneWidth);
        const startBoxforArena = ((boardDimen / 2) - offSetCenterArena);
        const startHeightArena = (boardDimen / 2) - boneHeight;

        // the math on the right side is the same as the commented code below. 
        // 9 / 2 is a random scale factor that looked nice.
        const maxLeftStartBoxforArena = ((boardDimen / 2) - (( ((boneWidth / 2) + boneWidth) / 10 ) * boneWidth));
        // const maxLeftStartBoxforArena = ((boardDimen / 2) - (( 9 / 2 ) * boneWidth));


        const boneValToString = (boneVal) => {
            let firstNumStr = boneVal[0].toString();
            let secondNumStr = boneVal[1].toString();
            let boneValStrA = firstNumStr + secondNumStr;
            let boneValStrB = secondNumStr + firstNumStr;

            // The Idea here is the Top num is always on the left even when
            // rotated -90 Degrees.
            // ~
            // If the bone has been rotated then it is boneValStrB and we
            // can add rotational Logic to the front End.
            return [boneValStrA, boneValStrB]
        }

        

            
        // These will determine the length of the playerID owner's hand and render them
        // centered in the right place. We use startBoxforHand to pick a 
        // startX for the rendering of <Hand></Hand>

        //works
        const currHandLength = this.props.gameState.players[thisPlayerIdx].hand.length
        // // mult by 40 because width of bone is 30 plus 10 more pixels of space
        const offSetCenter = ((currHandLength / 2) * boneWidth + (boneWidth / 3))  

        const startBoxforHand = ((boardDimen / 2) - offSetCenter)
        // works
            
           
            // the arena is simply to show the current pieces in play
        return (
            <div className="board-arena-container">
            <Stage width={boardDimen} height={boardDimen}>
                <Layer>
                    {/* y will shift up as length grows until length is 13 then shifting stops */}
                    <Group x={currArenaLength <= 9 ? startBoxforArena : maxLeftStartBoxforArena} 
                    y={currArenaLength <= 8 ? startHeightArena :
                    currArenaLength >= 9 && currArenaLength <= 13 ? startHeightArena - (boneHeight  * (currArenaLength - 8)) :
                    startHeightArena - (boardDimen / 3) }>
                        <Arena arena={arena} boardDimen={boardDimen}
                         allDominos={allDominos} boneValToString={boneValToString}
                         boneWidth={boneWidth} boneHeight={boneHeight}
                         boneIsRevYPos={boneIsRevYPos}
                         boneNotRevYPos={boneNotRevYPos}/>
                    </Group>
                    {/* <Group x={startBoxforArena} y={(boardDimen / 2) + 60}>
                        {capDom}
                    </Group> */}
                    {/* <OtherHands board={board} boardDimen={boardDimen} allDominos={allDominos}
                    boneWidth={boneWidth} boneHeight={boneHeight} boneValToString={boneValToString}/> */}

                    <Text x={boardDimen /2} y={boardDimen - (boneHeight * 2)} 
                    text={`Curr Player is : ${currentPlayer.username}`} fontSize={25} />
                    
                    <Boneyard boneyardLength={this.props.gameState.boneyard.bones.length}
                    inSession={this.props.gameState.inSession} 
                    currentPlayer={this.props.gameState.currentPlayer}
                    players={this.props.gameState.players}/>

                    <Group x={startBoxforHand} y={boardDimen - boneHeight}>

                        <Hand offSetCenter={offSetCenter} gameState={this.props.gameState}
                        // hand={currentPlayer.hand}
                        thisPlayerIdx={thisPlayerIdx}
                        socket={this.props.socket}
                        boneWidth={boneWidth} boneHeight={boneHeight} 
                        updateGame={this.props.updateGame} allDominos={allDominos}
                        boneValToString={boneValToString}  /> 
                    </Group>
                </Layer>
            </Stage>
          </div>
        );
    }
}






export default Board;