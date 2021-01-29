const Bone = require("./bone.js")
// import Bone from "./bone"


class Boneyard {
    constructor(board){
        this.bones = this.generateBoneyard()
        this.shuffleBoneYard(this.bones)
    }

    //Function generates a 2 length string of Integer values that match the face of a Domino/Bone
    getUniqueDominoNums(){
        let dominoStrs = []

        
        for (let i = 0; i < 7; i++) {
            for (let j = i; j < 7; j++) {
                dominoStrs.push(`${i}${j}`)
            }
        }

        return dominoStrs
    }

    // Function generates an array of objects. Objects are Bone Objects from Bone.js. 28 total
    generateBoneyard(){
        let allBones;
        let dominoNums = this.getUniqueDominoNums()

        allBones = dominoNums.map((numberPair, idx) => {
            return new Bone([parseInt(numberPair[0]),  parseInt(numberPair[1])])
        })

        return allBones
        debugger
    }


    //Shuffles existing boneyard so that it is random. All 28
    shuffleBoneYard(allBones){

            for(let i = allBones.length - 1; i > 0; i--){
                const randomMathFloorIdx = Math.floor(Math.random() * i)
                const lastIdx = allBones[i]
                const temp = allBones[randomMathFloorIdx]  
                allBones[i] = temp;
                allBones[randomMathFloorIdx] = lastIdx
            }
                return allBones
    }

    isEmpty(){
        if (this.bones.length === 0){
            return true
        }
        return false
    }

    // draws last bone from boneyard
    draw(){
        return this.bones.pop()
    }

    

    


    
}

// export default Boneyard;
module.exports = Boneyard

