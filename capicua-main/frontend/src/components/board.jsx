import React from "react";
import Konva from "konva";
import { Stage, Layer, Group, Text} from 'react-konva';
import Bone from "./bone"
import Hand from "./hand"
import Arena from "./arena"
import OtherHands from "./otherHands"
import Boneyard from "./boneyard"
import YourTurn from './yourTurn'
import { allDominos } from "./allDominos"


class Board extends React.Component {

    componentDidMount(){
        // this.getNums()
    }

    attachImages(){
        // const
    }



    // componentDidUpdate(prevProps){
    //     let prevPlayer = prevProps.board.currentPlayer.username;
    //     let nextPlayer = this.props.board.currentPlayer.username;
    //     // debugger
    //     if (prevProps.board.currentPlayer.hand.length !== this.props.board.currentPlayer.hand.length) {
    //         debugger
    //     } 
    // }


    render(){
        const boardDimen = 900;
        const boneWidth = 30;
        const boneHeight = 60;
        const boneIsRevYPos = (boneWidth / 2);
        const boneNotRevYPos = ((boneWidth / 2) * 3);

        const {board} = this.props;

        const capDom = [<Bone key={"cd"}
                    draggable={true}
                    x={0}
                    width={boneWidth}
                    height={boneHeight}
                    src={allDominos["cd"]}
                    rotation={0}
                    inArena={true} />]

                    // offsetX={boneWidth / 2}
                    // offsetY={boneHeight / 2}

        

        // these 3 lines are required to center the arena in the middle of the board
        // for Konva Group
        const currArenaLength = board.arena.length;
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
        const currHandLength = board.currentPlayer.hand.length
        // mult by 40 because width of bone is 30 plus 10 more pixels of space
        const offSetCenter = ((currHandLength / 2) * boneWidth + (boneWidth / 3))  

        const startBoxforHand = ((boardDimen / 2) - offSetCenter)

            
        // const boneyardInt = this.boneyard.testFunction();
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
                        <Arena board={board} boardDimen={boardDimen}
                         allDominos={allDominos} boneValToString={boneValToString}
                         boneWidth={boneWidth} boneHeight={boneHeight}
                         boneIsRevYPos={boneIsRevYPos}
                         boneNotRevYPos={boneNotRevYPos}/>
                    </Group>
                    {/* <Group x={startBoxforArena} y={(boardDimen / 2) + 60}>
                        {capDom}
                    </Group> */}
                    <OtherHands board={board} boardDimen={boardDimen} allDominos={allDominos}
                    boneWidth={boneWidth} boneHeight={boneHeight} boneValToString={boneValToString}/>

                    {/* testing show name */}
                    {/* <Text x={boardDimen / 2} y={boardDimen - (boneHeight * 2)}
                        text={board.players[0].username} fontSize={25} /> */}
                    {/* testing */}

                    <Group x={startBoxforHand} y={boardDimen - boneHeight}>

                        <Hand offSetCenter={offSetCenter} board={board}
                        boneWidth={boneWidth} boneHeight={boneHeight} 
                        updateGame={this.props.updateGame} allDominos={allDominos}
                        boneValToString={boneValToString}  />
                    </Group>
                        <Boneyard boneyardLength={board.boneyard.bones.length}
                        //  playerLength={board.players.length} 
                         player={board.currentPlayer.username}
                         currentPlayer={board.currentPlayer}
                         players={board.players}
                         arenaLength={board.arena.length}
                         />

                        <YourTurn currentPlayer={board.currentPlayer} players={board.players}/>

                </Layer>
            </Stage>
                {/* <p> {boneyardInt}</p> */}
          </div>
        );
    }
}






export default Board;