import React from "react";
import {constructBone} from "./constructBone";



class Hand extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameState: undefined
        }
    }

    componentDidMount() {
        debugger
        this.setState({ gameState: this.props.board })
    }


    componentDidUpdate(prevProps, prevState){
        debugger
        if (prevProps) {
            debugger
            if(prevState.gameState != this.state.gameState){
                debugger
                this.setState({gameState: this.state.gameState })
            }
        } else { console.log("null") }
    }

    render(){
        const {board, allDominos, boneValToString, offSetCenter,
            boneWidth, boneHeight, thisPlayerIdx} = this.props;


        // this will need to be changed to the axios player ID. 
        // SOLELY FOR TESTING...
        let renderedHand = null;
        let totalLengthHand;
        debugger
        if (this.state.gameState){
            debugger
            totalLengthHand = this.state.gameState.players[thisPlayerIdx].hand.length;

            renderedHand = this.state.gameState.players[0].hand.map((bone,idx) => {

               const singleBoneVal =  boneValToString(bone.boneVal)[0]
               const reactKeyVal = parseInt(singleBoneVal)

               //width of domino plus spacing
               const width = (boneWidth + (boneWidth / 3));

               const pos = (width * idx);
                // constructBone FN -> reactKey, draggable?, x, y, width, height, source, rotation, inArena?, 
                //offSetCenter, boneIdx, updateGameFN
                // if (board.players[thisPlayerIdx].username === board.players[0].username){
                //     console.log(`${board.players[0].username} SAME AS ${board.currentPlayer.username}`)
                //     debugger
                    
                //     return constructBone(reactKeyVal, true,
                //     pos, 0, boneWidth, boneHeight, allDominos[singleBoneVal],
                //     0, false, 0, 0, offSetCenter, idx, this.props.updateGame, board)

                // } else {
                //     debugger
                //     console.log("CANT MOVE!!!!")
                //     return constructBone(reactKeyVal, false,
                //     pos, 0, boneWidth, boneHeight, allDominos[singleBoneVal],
                //     0, false, 0, 0, offSetCenter, idx, this.props.updateGame, board)
                // }

                if ((this.state.gameState.currentPlayer === this.state.gameState.players[thisPlayerIdx])){
                    // console.log("TRUE!!!!!!")
                    if (totalLengthHand > 15) {
                        console.log("TRUE!!!!!!")
                        return constructBone(reactKeyVal, true,
                        (pos / 2), (boneHeight / 2), (boneWidth / 2), (boneHeight / 2), allDominos[singleBoneVal],
                        0, false, 0, 0, (offSetCenter/2), idx, this.props.updateGame, board)
                        debugger
                    } else {
                        console.log("TRUE!!!!!!")
                        return constructBone(reactKeyVal, true,
                        pos, 0, boneWidth, boneHeight, allDominos[singleBoneVal],
                        0, false, 0, 0, offSetCenter, idx, this.props.updateGame, board)
                    }
                    debugger
                } else {
                    console.log("!!!!!!!FALSE")
                    if(totalLengthHand > 15){
                        return constructBone(reactKeyVal, false,
                        (pos / 2), (boneHeight / 2), (boneWidth / 2), (boneHeight / 2), allDominos[singleBoneVal],
                        0, false, 0, 0, (offSetCenter/2), idx, this.props.updateGame, board)
                    } else {
                        return constructBone(reactKeyVal, false,
                        pos, 0, boneWidth, boneHeight, allDominos[singleBoneVal],
                        0, false, 0, 0, offSetCenter, idx, this.props.updateGame, board)
                    }
                    debugger
                }
                debugger


                // return <Bone 
                // x={pos} 
                // width={boneWidth}
                // height={boneHeight}
                // updateGame={this.props.updateGame}
                // boneIdx={idx}
                // offSetCenter={offSetCenter}
                // draggable={true}
                // key={reactKeyVal}
                // src={allDominos[singleBoneVal]}
                // inArena={false}/>    
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