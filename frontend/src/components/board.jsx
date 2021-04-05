import React from "react";
// import Konva from "konva";
import { Stage, Layer, Group } from 'react-konva';
// import Bone from "./bone"
import Hand from "./hand"
import Arena from "./arena"
import OtherHands from "./otherHands"
import Boneyard from "./boneyard"
import YourTurn from './yourTurn'
import { allDominos } from "./allDominos"


class Board extends React.Component {

    findPlayer = () => {
        let num;
        for (let i = 0; i < this.props.board.players.length; i++) {
            if (this.props.board.players[i] === this.props.board.currentPlayer) {

                num = i;
            }
        }
        return num;
    }

    render() {
        // const this.props.heightDimen = 900;
        // const boneWidth = 30;
        // const boneHeight = 59;
        // debugger
        const backgroundDimen = { width: this.props.heightDimen, height: this.props.heightDimen }
        const boneWidth = (this.props.heightDimen * 0.0333);
        const boneHeight = (this.props.heightDimen * 0.0666);
        const boneIsRevYPos = (boneWidth / 2);
        const boneNotRevYPos = ((boneWidth / 2) * 3);
        const thisPlayerIdx = this.findPlayer();

        const { board } = this.props;

        // const capDom = [<Bone key={"cd"}
        //             draggable={true}
        //             x={0}
        //             width={boneWidth}
        //             height={boneHeight}
        //             src={allDominos["cd"]}
        //             rotation={0}
        //             inArena={true} />]

        // offsetX={boneWidth / 2}
        // offsetY={boneHeight / 2}


        // these 3 lines are required to center the arena in the middle of the board
        // for Konva Group
        const currArenaLength = board.arena.length;
        const offSetCenterArena = ((currArenaLength / 2) * boneWidth);
        const startBoxforArena = ((this.props.heightDimen / 2) - offSetCenterArena);
        const startHeightArena = (this.props.heightDimen / 2) - boneHeight;

        // the math on the right side is the same as the commented code below. 
        // 9 / 2 is a random scale factor that looked nice.
        const maxLeftStartBoxforArena = ((this.props.heightDimen / 2) - ((((boneWidth / 2) + boneWidth) / 10) * boneWidth));
        // const maxLeftStartBoxforArena = ((this.props.heightDimen / 2) - (( 9 / 2 ) * boneWidth));


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

        const startBoxforHand = ((this.props.heightDimen / 2) - offSetCenter)


        // const boneyardInt = this.boneyard.testFunction();
        // the arena is simply to show the current pieces in play
        return (
            <div className="board-arena-container" style={backgroundDimen}>
                <Stage width={this.props.heightDimen} height={this.props.heightDimen}>
                    <Layer>
                        {/* y will shift up as length grows until length is 13 then shifting stops */}
                        <Group x={currArenaLength <= 9 ? startBoxforArena : maxLeftStartBoxforArena}
                            y={currArenaLength <= 8 ? startHeightArena :
                                currArenaLength >= 9 && currArenaLength <= 13 ? startHeightArena - (boneHeight * (currArenaLength - 8)) :
                                    startHeightArena - (this.props.heightDimen / 3)}>
                            <Arena board={board} heightDimen={this.props.heightDimen}
                                allDominos={allDominos} boneValToString={boneValToString}
                                boneWidth={boneWidth} boneHeight={boneHeight}
                                boneIsRevYPos={boneIsRevYPos}
                                boneNotRevYPos={boneNotRevYPos} />
                        </Group>
                        {/* <Group x={startBoxforArena} y={(this.props.heightDimen / 2) + 60}>
                        {capDom}
                    </Group> */}
                        <OtherHands board={board} heightDimen={this.props.heightDimen} allDominos={allDominos}
                            boneWidth={boneWidth} boneHeight={boneHeight} boneValToString={boneValToString} />

                        {/* testing show name */}
                        {/* <Text x={this.props.heightDimen / 2} y={this.props.heightDimen - (boneHeight * 2)}
                        text={board.players[0].username} fontSize={25} /> */}
                        {/* testing */}

                        <Group x={startBoxforHand} y={this.props.heightDimen - boneHeight}>

                            <Hand offSetCenter={offSetCenter} board={board}
                                boneWidth={boneWidth} boneHeight={boneHeight}
                                updateGame={this.props.updateGame} allDominos={allDominos}
                                boneValToString={boneValToString} thisPlayerIdx={thisPlayerIdx} />
                        </Group>
                        <Boneyard boneyardLength={board.boneyard.bones.length}
                            //  playerLength={board.players.length} 
                            player={board.currentPlayer.username}
                            currentPlayer={board.currentPlayer}
                            players={board.players}
                            arenaLength={board.arena.length}
                        />

                        <YourTurn currentPlayer={board.currentPlayer} players={board.players} heightDimen={this.props.heightDimen}/>

                    </Layer>
                </Stage>
                {/* <p> {boneyardInt}</p> */}
            </div>
        );
    }
}






export default Board;