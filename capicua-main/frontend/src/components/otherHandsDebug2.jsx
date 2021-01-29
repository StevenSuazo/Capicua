import React from "react";
import {Group} from 'react-konva';
import {constructBone} from "./constructBone";



class OtherHands extends React.Component {


    render() {
        const {board, boardDimen, boneWidth,
            boneHeight, boneValToString, allDominos} = this.props;

        const renderHandFn = (player, offSetCenter, playerIdx, currPlayerIdx) => {
            // debugger
            
         const renderedHand = player.hand.map((bone,idx) => {

            const singleBoneVal =  boneValToString(bone.boneVal)[0]
            const reactKeyVal = parseInt(singleBoneVal + playerIdx)

            //width of domino plus spacing
            const width = (boneWidth + (boneWidth / 3));

            const pos = (width * idx);

            if (((currPlayerIdx + 1) % board.players.length)  === playerIdx % board.players.length){

                // width and height are reversed because the bone is flat
                // constructBone FN -> reactKey, draggable?, x, y, width, height, source, rotation, inArena?, 
                //offSetCenter, boneIdx

                return constructBone(reactKeyVal, false,
                0, pos, boneHeight, boneWidth, allDominos["cdl"],
                0, true, 0, 0, offSetCenter, idx)
            } 
            else if(((currPlayerIdx + 2) % board.players.length) === playerIdx % board.players.length){
            

                // constructBone FN -> reactKey, draggable?, x, y, width, height, source, rotation, inArena?, 
                //offSetCenter, boneIdx

                return constructBone(reactKeyVal, false,
                pos, 0, boneWidth, boneHeight, allDominos["cdt"],
                0, true, 0, 0, offSetCenter, idx)
            }
            else if(((currPlayerIdx + 3) % board.players.length) === playerIdx % board.players.length){

                // constructBone FN -> reactKey, draggable?, x, y, width, height, source, rotation, inArena?, 
                //offSetCenter, boneIdx

                return constructBone(reactKeyVal, false,
                0, pos, boneHeight, boneWidth, allDominos["cdr"],
                0, true, 0, 0, offSetCenter, idx)
            }
            // this return is here because instead of the previous else if(lots of logic)
            // does the cpu know EXACTLY what is intended with just else {}?
            // ex: else if(((currPlayerIdx + 3) % board.players.length) === playerIdx % board.players.length)
            return null
        })

            return renderedHand
        }

        const currPlayerIdx = board.players.indexOf(board.currentPlayer);

        
        // allPlayers[someIdx]
        //The important thing here is that the index to access allPlayers Obj will
        // always match the index of the next player (p2) and beyond regardless of
        // where the currentPlayer index is...
        const allPlayersDataObj = (numPlayers, currPlayerIdx) => {
            let allPlayers = {};

            /* all the metadata necessary to populate the hidden hands
               - offSetCenter is the midpoint of board minus the total width of all bones
                   to center the hand on the board regardless of length
                - startBoxforPlayerHand is the start x or start y of this div on
                  the board. relative to board (x,y) @ (0,0)
                - renderedHandPlayer is a collection of ImageNodes(Domnios/Bones) 
                  of the count of all bones in that players hand.
            */
            for(let i = currPlayerIdx; i < (currPlayerIdx + numPlayers); i++){
                allPlayers[i % numPlayers] = {
                    playerIdx: null,
                    player: null,
                    playerHand: null,
                    offSetCenter: null,
                    startBoxforPlayerHand: null,
                    renderedHandPlayer: null
                         
                }
            }

            // this for loop builds out metadata per player to be accessed later 
            // by the function generateHands
            for(let j = currPlayerIdx; j < (currPlayerIdx + numPlayers); j++){

                allPlayers[j % numPlayers].playerIdx = (j % numPlayers);
                allPlayers[j % numPlayers].player = board.players[allPlayers[j % numPlayers].playerIdx];
                allPlayers[j % numPlayers].playerHand = allPlayers[j % numPlayers].player.hand;
                allPlayers[j % numPlayers].offSetCenter = ((allPlayers[j % numPlayers].playerHand.length / 2) * ((boneWidth / 3) + boneWidth));
                allPlayers[j % numPlayers].startBoxforPlayerHand = ((boardDimen / 2) - allPlayers[j % numPlayers].offSetCenter);
                allPlayers[j % numPlayers].renderedHandPlayer = renderHandFn(allPlayers[j % numPlayers].player,
                         allPlayers[j % numPlayers].offSetCenter,
                         allPlayers[j % numPlayers].playerIdx, currPlayerIdx)
                
                }

            return allPlayers;

        }

        const allPlayers = allPlayersDataObj(board.players.length, currPlayerIdx)

        const generateHands = (numPlayers, websocketsId) => {
                // debugger
            
            // const player2Idx = ((currPlayerIdx + 1) % board.players.length);
            // const player2 = board.players[player2Idx];
            // const player2Hand = player2.hand;
            // const offSetCenterP2 = ((player2Hand.length / 2) * 40);
            // const startBoxforPlayer2Hand = ((boardDimen / 2) - offSetCenter);  

            // const renderedHandplayer2 = renderHandFn(player2, offSetCenter, player2Idx, "cdt")
            const player2Idx = ((currPlayerIdx + 1) % board.players.length);
            const player3Idx = ((currPlayerIdx + 2) % board.players.length);
            const player4Idx = ((currPlayerIdx + 3) % board.players.length);
            switch(numPlayers){
                case 2:
        
                    return <Group x={0} y={allPlayers[player2Idx].startBoxforPlayerHand}> 
                                {allPlayers[player2Idx].renderedHandPlayer}
                            </Group>
                case 3:
                    
                     return <Group x={0} y={0}>
                                {/* player on left of board below */}
                                <Group x={0} y={allPlayers[player2Idx].startBoxforPlayerHand}> 
                                    {allPlayers[player2Idx].renderedHandPlayer}
                                </Group>
                                {/* player on top of board below */}
                                <Group x={allPlayers[player3Idx].startBoxforPlayerHand} y={0}>
                                    {allPlayers[player3Idx].renderedHandPlayer}
                                </Group>
                            </Group>
                case 4:
                
                    return <Group x={0} y={0}>
                                {/* player on left of board below */}
                                <Group x={0} y={allPlayers[player2Idx].startBoxforPlayerHand}> 
                                    {allPlayers[player2Idx].renderedHandPlayer}
                                </Group>
                                {/* player on top of board below */}
                                <Group x={allPlayers[player3Idx].startBoxforPlayerHand} y={0}>
                                    {allPlayers[player3Idx].renderedHandPlayer}
                                </Group>
                                {/* player on right of board below */}
                                <Group x={boardDimen - boneHeight} y={allPlayers[player4Idx].startBoxforPlayerHand}>
                                    {allPlayers[player4Idx].renderedHandPlayer}
                                </Group>
                           </Group>

                default:
                    return <Group></Group>
            }

        }
        let handsToGenerate = null;
        if(board){
            handsToGenerate = generateHands(board.players.length);

        }

        return (
            <>
            {handsToGenerate}
            </>
        )
    }
}
 export default OtherHands;
