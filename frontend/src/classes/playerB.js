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
          case "smart":
            break;

          default:
            return
      }  
    }

    hasPlayableBones(){
        const canMakeMove = this.hand.some((bone) =>{
            return this.board.isBonePlayable(bone);
        });

        if (!canMakeMove) return false;
        return true
    }

    drawBone(){
      this.hand.push(this.board.boneyard.bones.pop())
    }

    revealHand(){
      let handString = ""
        this.hand.forEach(bone => {
          handString += `[${bone.boneVal[0]}, ${bone.boneVal[1]}], `
        })
    }

    restorePoints(num){
      this.points = num
    }
  }


// export default Player;
module.exports =  Player;