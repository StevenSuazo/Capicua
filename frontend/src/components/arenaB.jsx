import React from "react";
// import Konva from "konva";

import {constructBone} from "./constructBoneB"


class Arena extends React.Component {

    render(){
        const {boneValToString, allDominos,
        boneWidth, boneHeight, boneIsRevYPos, boneNotRevYPos } = this.props;

        let {arena} = this.props;


        // we need the keys of all possible dominos to be rendered
        // allDominosArr is then keyed into with boneValToString to retrieve
        // The appropriate Domino Image
        const allDominosArr = Object.keys(allDominos);

        //this function returns a bone with the x position always at zero
        //unless the bone is Reversed. then X is +60 because Konva
        //offsets +90 degree rotation in the negative x-axis.
        const isFirstBone = (isDouble, isReversed, boneStrArr, reactKeyVal) => {
            if (isDouble){

                // reactKey, draggable?, x, y, width, height, source, rotation, inArena?, 
                //offSetCenter, boneIdx, updateGame, arena
                return constructBone(reactKeyVal, false,
                0, 0, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                0, true)
                // , 0, 99, undefined, )

                

            } else if (isReversed){
                // boneVal has been reversed. Rotate 90 Degrees
                // prop x is shifted 60 pixels to the right because rotation
                // auto-shifts it 60 pixels to the left??? (due to Konva)

                return constructBone(reactKeyVal, false,
                boneHeight, boneIsRevYPos, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                90, true)

            } else {
                //boneVal is NOT reversed. Rotate -90 Degrees

                return constructBone(reactKeyVal, false,
                0, boneNotRevYPos, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                -90, true)
            }
        }

        const xLengthAllBones = (boneDimenArr, currIdx, bentBoneIdx = 0, isBentAgain = false) => {
            let totalXPos = 0;

            if (!isBentAgain){
                for(let i = bentBoneIdx; i < currIdx; i++){
                    totalXPos += boneDimenArr[i].x;
                }
            } else {
                for(let i = bentBoneIdx; i < currIdx; i++){
                    totalXPos += boneDimenArr[i].isBentAgain.x;
                }
            }

            return totalXPos;
        }

        const yLengthAllBones = (boneDimenArr, currIdx) => {
            let totalYPos = 0;

            for(let i = 7; i < currIdx; i++){
                totalYPos += boneDimenArr[i].isBent.y;
            }

            return totalYPos;
        }

        const boneDimenArr = [];

        // const arena = board.arena.map((bone, idx) => {
        arena = arena.map((bone, idx) => {
            const boneStrArr = boneValToString(bone.boneVal);

            const singleBoneVal =  boneStrArr[0];
            const reactKeyVal = parseInt(singleBoneVal);
                   
            const boneXnY = (
                bone.isDouble() ? {
                    isDouble: true,
                    isReversed: false,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal,
                    isBent: idx === 7 ? {y: (boneHeight + boneHeight / 2)} : idx > 7 ? {y: boneWidth} : false,
                    isBentAgain: idx === 18 ? {x: (boneHeight + (boneWidth / 2))} : idx > 18 ? {x: boneWidth} : 0,
                    x: boneWidth,
                    y: 0} :
                (bone.isReversed ? {
                    isDouble: false,
                    isReversed: true,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal,
                    isBent: idx === 7 ? {y: (boneHeight + (boneWidth / 2))} : idx > 7 ? {y: boneHeight} : 0,
                    isBentAgain: idx >= 18 ? {x: boneHeight} : 0,
                    x: boneHeight,
                    y: boneIsRevYPos } : 
                    {
                    isDouble: false,
                    isReversed: false,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal, 
                    isBent: idx === 7 ? {y: (boneHeight + (boneWidth / 2))} : idx > 7 ? {y: boneHeight} : 0,
                    isBentAgain: idx >= 18 ? {x: boneHeight} : 0,
                    x: boneHeight, 
                    y: boneNotRevYPos
                    })
                );

            boneDimenArr.push(boneXnY);

            const lastBoneData = boneDimenArr[idx - 1];
            

            // These if statements and variables are to capture specific Distance Data for
            // the arena and are used for bending directions of the domino...
            // like a snake.
            let totalYPos = null;
            let topRowTotalPos = null;
            let bottomRowTotalPos = null;
            let totalXPos = null;
            let adjustedX = null;
            let adjustedY = null;
            let offsetX = (boneWidth / 2);
            let offsetY = (boneHeight / 2);
                
            //record running X length for top row to allow the next piece
            //to align correctly
            if (idx < 8){
                totalXPos = xLengthAllBones(boneDimenArr, idx);
            }

            // record Y length of all dominos on right side going down
            if (idx >= 8){
                if (idx <= 19){
                    totalYPos = yLengthAllBones(boneDimenArr, idx);
                } else {
                    totalYPos = yLengthAllBones(boneDimenArr, 19);
                }
            }

            // total X pos value for the top row of the arena
            // 8 because 8 idx is after it bends and sums up all xPos before 8 idx
            if (idx >= 8){
                topRowTotalPos = xLengthAllBones(boneDimenArr, 8);
            }

            // total X pos value for the bottom row of the arena
            if (idx >= 19){
                bottomRowTotalPos = xLengthAllBones(boneDimenArr, 
                    idx,
                    18,
                    true)
            }

            /*
            End of Distance Forumulas for Sides of Arena
            ********************************************
            ********************************************
            ********************************************
            */
        
            if (idx === 0){
                return isFirstBone(
                     boneDimenArr[0].isDouble,
                     boneDimenArr[0].isReversed,
                     boneDimenArr[0].boneStrArr,
                     boneDimenArr[0].reactKeyVal)
            } else if(idx < 8) {

                if (bone.isDouble()){
                    // console.log(`totalXPOS: ${totalXPos}`)

                    return constructBone(reactKeyVal, false,
                    totalXPos, 0, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                    0, true)
                }
                else if(allDominosArr.includes(boneStrArr[0])){
                    // bone is NOT reversed
                    //rotate once -90 degrees

                    //"top", "notReversed"
                    return constructBone(reactKeyVal, false,
                    totalXPos, boneNotRevYPos, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                    -90, true)
                } else {
                    //boneVal has been reversed. Rotate 90 Degrees

                    // totalXPos + 60 because of rotation without offset
                    totalXPos += boneHeight;
                    
                    //"top", "isReversed"
                    return constructBone(reactKeyVal, false,
                    totalXPos, boneIsRevYPos, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                    90, true)
                }
            } 
            
            // this is where the bones make a turn down
            else if (idx >= 8 && idx <= 18){
                // console.log(`totalYPos: ${totalYPos}`)
            
                switch(lastBoneData.isDouble){
                    case true:
                        if(allDominosArr.includes(boneStrArr[0])){
                            // bone is NOT reversed
                            //rotate once 0 degrees

                            // debugger
                            topRowTotalPos = topRowTotalPos - (boneWidth / 2);
                            
                            
                            //"rightSide", "notReversed"
                            return constructBone(reactKeyVal, false,
                            topRowTotalPos, totalYPos, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                            0, true , offsetX, offsetY)

                    } else {
                            //boneVal has been reversed. Rotate 180 Degrees
                            // const totalXPos = xLengthAllBones(boneDimenArr, idx) + 60;

                            topRowTotalPos = (topRowTotalPos - (boneWidth / 2));
                          
                            // "rightSide", "reversed"
                            return constructBone(reactKeyVal, false,
                            topRowTotalPos, totalYPos, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                            180, true , offsetX, offsetY)

                    }
                    case false:

                        if (bone.isDouble()){
                           
                            topRowTotalPos = (topRowTotalPos - (boneWidth / 2));
                            totalYPos = (totalYPos - (boneWidth / 2));

                            // "rightSide", "isdouble"
                            return constructBone(reactKeyVal, false,
                            topRowTotalPos, totalYPos, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                            90, true , offsetX, offsetY)

                        }
                        else if(allDominosArr.includes(boneStrArr[0])){
                        // bone is NOT reversed
                        //no rotate 
                        
                        topRowTotalPos = (topRowTotalPos - (boneWidth / 2));
                        
                        // "rightSide", "notReversed"
                        return constructBone(reactKeyVal, false,
                        topRowTotalPos, totalYPos, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                        0, true , offsetX, offsetY)

                    } else {
                        //boneVal has been reversed. Rotate 180 Degrees
                        topRowTotalPos = (topRowTotalPos - (boneWidth / 2));

                        // "rightSide", "isReversed"
                        return constructBone(reactKeyVal, false,
                        topRowTotalPos, totalYPos, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                        180, true , offsetX, offsetY)
                    }
                    default:
                        return null
                }
            }
            // above ends idx up to 19
            // else if(idx >= 19){
            else {

                // console.log(`IDX is 19 or +`)
                // console.log(`totalYPos: ${totalYPos}`)
                // console.log(`totalBottRowPos: ${bottomRowTotalPos}`)

                switch(lastBoneData.isDouble){
                    case true:

                        if(allDominosArr.includes(boneStrArr[0])){
                            // bone is NOT reversed
                            //rotate once +90 degrees

                            adjustedX = topRowTotalPos - bottomRowTotalPos;

                            //                      minus 45 on right side
                            adjustedY = (totalYPos - ((boneWidth / 2) * 3))

                            // "bottom", "notReversed"
                            return constructBone(reactKeyVal, false,
                            adjustedX, adjustedY, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                            90, true , offsetX, offsetY)
                    } else {
                            //boneVal has been reversed. Rotate NEG 90 Degrees
                            
                            adjustedX = topRowTotalPos - bottomRowTotalPos;

                            //                      minus 45 on right side
                            adjustedY = (totalYPos - ((boneWidth / 2) * 3))

                            // "bottom", "isReversed"
                            return constructBone(reactKeyVal, false,
                            adjustedX, adjustedY, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                            -90, true , offsetX, offsetY)
                    }
                    case false:

                        if (bone.isDouble()){
                            // debugger


                            adjustedX = topRowTotalPos - bottomRowTotalPos + (boneWidth / 2);

                            //                      minus 45 on right side
                            adjustedY = (totalYPos - ((boneWidth / 2) * 3))

                            // "bottom", "isDouble"
                            return constructBone(reactKeyVal, false,
                            adjustedX, adjustedY, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                            0, true , offsetX, offsetY)
                        }
                        else if(allDominosArr.includes(boneStrArr[0])){
                            // debugger
                        // bone is NOT reversed
                        // rotate once  +90 degrees
                        
                            adjustedX = topRowTotalPos - bottomRowTotalPos;

                            //                      minus 45 on right side
                            adjustedY = (totalYPos - ((boneWidth / 2) * 3))

                            // "bottom", "notReversed"
                            return constructBone(reactKeyVal, false,
                            adjustedX, adjustedY, boneWidth, boneHeight, allDominos[boneStrArr[0]],
                            90, true , offsetX, offsetY)

                    } else {
                        //boneVal has been reversed. Rotate -90 Degrees

                        // debugger
                        
                        adjustedX = topRowTotalPos - bottomRowTotalPos;

                        //                      minus 45 on right side
                        adjustedY = (totalYPos - ((boneWidth / 2) * 3))

                        // "bottom", "isReversed"
                        return constructBone(reactKeyVal, false,
                        adjustedX, adjustedY, boneWidth, boneHeight, allDominos[boneStrArr[1]],
                        -90, true , offsetX, offsetY)
                    }
                    default:
                        return null
                }
            }
           
        })


        return (
            <>
            {arena}
            </>
        )
    }
}

export default Arena;



