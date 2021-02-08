import Bone from "./bone"


// reactKey, draggable?, x, y, width, height, source, rotation, inArena?, 
//offSetCenter, boneIdx, updateGame, board
export const constructBone = (reactKeyVal, draggable, x, y, width, height,
    source, rotation, inArena, offsetX = 0, offsetY = 0, offSetCenter = 0, 
    boneIdx = 99, updateGame, board) => {

    return <Bone
    key={reactKeyVal} 
    draggable={draggable}
    x={x}
    y={y}
    width={width}
    height={height}
    src={source}
    rotation={rotation}
    inArena={inArena}
    offsetX={offsetX}
    offsetY={offsetY}
    offSetCenter={offSetCenter}
    boneIdx={boneIdx}
    updateGame={updateGame}
    board={board}
    />

}

