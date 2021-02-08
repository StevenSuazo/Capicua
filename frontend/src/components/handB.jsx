import React from "react";
import {constructBone} from "./constructBoneB";
import {Text} from 'react-konva';



class Hand extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            gameState: undefined
        }

        // this.renderedHand = [];
        // this.thisPlayerIdx;
    }

    componentDidMount(){
        this.setState({gameState: this.props.gameState})
        // debugger
    }

    componentDidUpdate(prevProps, prevState){

        if(prevState.gameState !== undefined){
            // debugger
            if(prevState.gameState.players != this.props.gameState.players){
                // debugger
                this.setState({gameState: this.props.gameState })
            }
        }
    }



    findPlayerOnThisSocket = () => {
            let num;

            for(let i = 0; i < this.state.gameState.players.length; i++){
                if (this.state.gameState.players[i].id === this.props.socket.id){

                    num = i;
                }
            }
            return num;
            
    }

    render(){

        const {gameState, hand, socket, allDominos, boneValToString, offSetCenter,
        boneWidth, boneHeight, thisPlayerIdx} = this.props;

        let renderedHand = null
        // let thisPlayerIdx;
        let totalLengthHand;


        // this will need to be changed to the axios player ID. 
        // SOLELY FOR TESTING...




        if (this.state.gameState){
            if(this.state.gameState.inSession){

            //    thisPlayerIdx = this.findPlayerOnThisSocket()
               totalLengthHand = gameState.players[thisPlayerIdx].hand.length;
                 // debugger
                 // renderedHand = gameState.currentPlayer.hand.map((bone,idx) => {
               renderedHand = gameState.players[thisPlayerIdx].hand.map((bone,idx) => {
                // debugger

               const singleBoneVal =  boneValToString(bone.boneVal)[0]
               const reactKeyVal = parseInt(singleBoneVal)

               //width of domino plus spacing
               const width = (boneWidth + (boneWidth / 3));

               const pos = (width * idx);

                // constructBone FN -> reactKey, draggable?, x, y, width, height, source, rotation, inArena?, 
                //offSetCenter, boneIdx, updateGameFN

                if(gameState.currentPlayer.id === socket.id){

                    if(totalLengthHand > 15){
                        return constructBone(reactKeyVal, true,
                        (pos / 2), (boneHeight / 2), (boneWidth / 2), (boneHeight / 2), allDominos[singleBoneVal],
                        0, false, 0, 0, (offSetCenter/2), idx, this.props.updateGame, gameState.arena, gameState)
                    } else {
                        return constructBone(reactKeyVal, true,
                        pos, 0, boneWidth, boneHeight, allDominos[singleBoneVal],
                        0, false, 0, 0, offSetCenter, idx, this.props.updateGame, gameState.arena, gameState)
                    }
                    
                } else {
                    if(totalLengthHand > 15){
                        return constructBone(reactKeyVal, false,
                        (pos / 2), (boneHeight / 2), (boneWidth / 2), (boneHeight / 2), allDominos[singleBoneVal],
                        0, false, 0, 0, (offSetCenter/2), idx, this.props.updateGame, gameState.arena, gameState)
                    } else {
                        return constructBone(reactKeyVal, false,
                        pos, 0, boneWidth, boneHeight, allDominos[singleBoneVal],
                        0, false, 0, 0, offSetCenter, idx, this.props.updateGame, gameState.arena, gameState)
                    }
                }
                

                
            })

            }
            
        }
        // debugger
         return(
                <>          
                 {renderedHand}
                </>
         )

    }

}
export default Hand;