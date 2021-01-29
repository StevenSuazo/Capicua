import React from "react";
import {Image} from 'react-konva';

class Bone extends React.Component {
    constructor(props){
        super(props)

        this.state = {
             board: null,
             image: null,
             draggable: null,
             offSetCenter: null,
             updateGame: null,
             boneIdx: null,
             rotation: null,
             inArena: null,
             x: null,
             y: null,
             width: null,
             height: null,
             offsetX: 0,
             offsetY: 0
        };


    }
    
  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    } 
    if (oldProps.x !== this.props.x){
      this.loadImage();
    } 
    if (oldProps.y !== this.props.y){
      this.loadImage();
    } 
    
    
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    // debugger
    this.setState({
      board: this.props.board,
      image: this.image,
      draggable: this.props.draggable,
      offSetCenter: this.props.offSetCenter,
      updateGame: this.props.updateGame,
      boneIdx: this.props.boneIdx,
      rotation: this.props.rotation,
      inArena: this.props.inArena,
      x: this.props.x,
      y: this.props.y,
      width: this.props.width,
      height: this.props.height,
      offsetX: this.props.offsetX,
      offsetY: this.props.offsetY
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };


  mouseDownStartCoord(e){

    // console.log(`MDX: ${e.target.attrs.x}`)
    // console.log(`MDY: ${e.target.attrs.y}`)
    // console.log("------")
  }

  // decides where the player wants to play
  mouseUpCoord(e, updateGame) {
      // debugger
      const xPosPlay = e.target.attrs.x 
      const center = e.target.attrs.offSetCenter


      //to use Konva indexing per group. use below
      const boneIdx = e.target.index

      // to use props it's this below
      // const boneIdx = e.target.attrs.boneIdx

      const yCoord = e.target.attrs.y
      
      console.log(`BoneIdxIs: ${e.target.attrs.boneIdx}`)
      console.log(`konvaBoneIdxIs: ${boneIdx}`)
      // console.log(`Center: ${e.target.attrs.offSetCenter}`)
      // console.log(`X: ${e.target.attrs.x}`)
      // console.log(`Y: ${e.target.attrs.y}`)


      // Remember to remove the left side of IF statement
      // for testing only
      // ******************************
      // ******************************
      // ******************************
      // ******************************
      // ******************************
      // ******************************
      // ******************************
      
      // if (!this.props.inArena && yCoord < -50) {
      // if
      if (this.state.board.arena.length <= 15){
        if (yCoord < -50) {

            updateGame(xPosPlay, center, boneIdx);
        }

      } else {
        // debugger

        const halfBoardHeight = (this.props.board.boardDimen / 2);
        const absPos = e.target.getAbsolutePosition();
        // console.log(`AbsPos: x:${absPos.x} y: ${absPos.y}`)
        
        if (yCoord < -50){
          if (absPos.y < halfBoardHeight){
            // debugger
            updateGame(absPos.y, halfBoardHeight, boneIdx);
        } else {
          // debugger
            updateGame(absPos.y, halfBoardHeight, boneIdx);
        }
        }
        
      }
      
          // console.log(e.target)
    }
    slideUp(e){
      // debugger
      // console.log(`thisX: ${e.target.attrs.x}`)
      // console.log(`thisY: ${e.target.attrs.y}`)
      // console.log(this.absolutePosition())
      
      if(!this.attrs.inArena){
        this.to({
          scaleX: 1.2,
          scaleY: 1.2,
          y: -20,
          duration: 0.2
        });
        // this.getLayer().batchDraw();
      }
        
    }

    slideDown(e){
      if(!this.attrs.inArena){
          this.to({
            scaleX: 1.0,
            scaleY: 1.0,
            y: 0,
            duration: 0.2
          });
        // this.getLayer().batchDraw();
      }
      
    }

    //this FN disallows a domino to be dragged outside of the board
    enforceBoundingBox(e){
      const boneBox = e.target.getClientRect()
      const absPos = e.target.getAbsolutePosition();
      
      // save the old position at any given time with x and y
      const newAbsPos = {...absPos}
      const boardWidth = e.target.getCanvas().width;
      const boardHeight = e.target.getCanvas().height;
      
      
      if (boneBox.x < 0) {
        newAbsPos.x = 0;
      }
      if (boneBox.y < 0) {
        newAbsPos.y = 0;
      }
      if (boneBox.x + boneBox.width > boardWidth) {
        newAbsPos.x = boardWidth - boneBox.width;
      }
      if (boneBox.y + boneBox.height > boardHeight) {
        newAbsPos.y = boardHeight - boneBox.height
      }

      // console.log(`newAbsPos: x:${newAbsPos.x} y: ${newAbsPos.y}`)

      e.target.setAbsolutePosition(newAbsPos)

    }

    


  render() {



    
    return (
      <Image
        board={this.state.board}
        x={this.state.x}
        y={this.state.y}
        offSetCenter={this.state.offSetCenter}
        image={this.state.image}
        width={this.state.width}
        height={this.state.height}
        boneIdx={this.state.boneIdx}
        offsetX={this.state.offsetX}
        offsetY={this.state.offsetY}
        draggable={this.state.draggable}
        onMouseDown={this.mouseDownStartCoord}
        onMouseOver={this.slideUp}
        onMouseOut={this.slideDown}
        onDragEnd={(e) => this.mouseUpCoord(e, this.state.updateGame)}
        onDragMove={this.enforceBoundingBox}
        rotation={this.state.rotation}
        inArena={this.state.inArena}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}

export default Bone;





