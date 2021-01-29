import Bone from "./boneB"


// reactKey, draggable?, x, y, width, height, source, rotation, inArena?, 
//offSetCenter, boneIdx, updateGame, arena
export const constructBone = (reactKeyVal, draggable, x, y, width, height,
    source, rotation, inArena, offsetX = 0, offsetY = 0, offSetCenter = 0, 
    boneIdx = 99, updateGame = undefined, arena, gameState = undefined) => {
        // debugger
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
    arena={arena}
    gameState={gameState}
    />

}

