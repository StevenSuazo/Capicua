import React from "react";
import {constructBone} from "./constructBone";



class Hand extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: undefined
        }
    }

    componentDidMount() {
        this.setState({ gameState: this.props.board })
    }

    render(){
        const {board, allDominos, boneValToString, offSetCenter,
            boneWidth, boneHeight, thisPlayerIdx} = this.props;
        // this will need to be changed to the axios player ID. 
        // SOLELY FOR TESTING...
        let renderedHand = null;
        // let totalLengthHand;
        if (this.state.gameState){
            // totalLengthHand = board.players[thisPlayerIdx].hand.length;
            renderedHand = board.players[0].hand.map((bone,idx) => {

               const singleBoneVal =  boneValToString(bone.boneVal)[0]
               const reactKeyVal = parseInt(singleBoneVal)

               //width of domino plus spacing
               const width = (boneWidth + (boneWidth / 3));

               const pos = (width * idx);

                // constructBone FN -> reactKey, draggable?, x, y, width, height, source, rotation, inArena?, 
                //offSetCenter, boneIdx, updateGameFN
                // if (thisPlayerIdx == 0){
                    return constructBone(reactKeyVal, true,
                    pos, 0, boneWidth, boneHeight, allDominos[singleBoneVal],
                    0, false, 0, 0, offSetCenter, idx, this.props.updateGame, board)
                // } else {
                //     return constructBone(reactKeyVal, false,
                //     pos, 0, boneWidth, boneHeight, allDominos[singleBoneVal],
                //     0, false, 0, 0, offSetCenter, idx, this.props.updateGame, board)
                // }
  
            })

        }

         return(
                <>          
                 {renderedHand}
                </>
         )

    }

}
export default Hand;