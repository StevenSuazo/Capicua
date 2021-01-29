class Player {
    constructor(username, board, isAi, roomName = undefined, id = undefined, aiDifficulty) {
      this.username = username;
      this.roomName = roomName;
      this.id = id
      this.points = 0;
      this.hand = [];
      this.isAi = isAi ? true : false;
      this.board = board;
      this.winningPlayerPoints = 0;
      this.aiDifficulty = aiDifficulty ? aiDifficulty : "easy";


    }

    

      
    aiAutoPlay(difficulty){
      let randomBoneIdx;


      let posPlay = [1,3]
      let center = 2;

      switch(difficulty){
          case "easy":
              randomBoneIdx = Math.floor((Math.random() * (this.hand.length)));
              return [posPlay[Math.floor(Math.random() * 2)],
                      center,
                      randomBoneIdx
                ]
              // const currentBone = this.board.currentPlayer.hand.splice(randomBoneIdx,1)[0];


          case "smart":

          default:

      }  

      // this.revealHand();
      //   this.playerInput = correctAnswer

    }

    // let removedBone = player.hand.splice(randomMathFloorIdx, 1)

    //replaced canMove with hasPlayableBone()
    hasPlayableBones(){
        const canMakeMove = this.hand.some((bone) =>{
            return this.board.isBonePlayable(bone);
        });

        if (!canMakeMove) return false;
        return true
    }

    drawBone(){
      this.hand.push(this.board.boneyard.bones.pop())
      console.log(`${this.username} drew ${this.hand[this.hand.length-1].boneVal}`)
    }

    
    revealHand(){
      let handString = ""
        this.hand.forEach(bone => {
          handString += `[${bone.boneVal[0]}, ${bone.boneVal[1]}], `
        })

        console.log(`${this.username}'s Hand: `)

        console.log(`${handString}`)
        
    }

    restorePoints(num){
      this.points = num
    }
  }


// export default Player;
module.exports = Player;
  

