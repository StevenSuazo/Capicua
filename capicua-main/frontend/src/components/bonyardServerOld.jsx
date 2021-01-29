import React from "react";
import useImage from 'use-image';
import Bone from "./bone"
import Konva from "konva";
import { Group, Image, Text } from 'react-konva';
import Draw from '../assets/img/modals/draw.png'
//blank domino
// import domino01 from '../assets/img/dominos_pieces_vector_svg/dominos_bone_0:1.svg';

class Boneyard extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            image: null,
            drawImagex: 300,
            drawImagey: 240,
            drawImageToggle: false
        }
        this.diff = undefined;
    }

    componentDidMount() {
        this.loadImage();
    }
        
    componentDidUpdate(prevProps){
        // this.showDrawAlert()
        if (this.props.boneyardLength < (28 - (this.props.playerLength * 7)) && 
        (prevProps.boneyardLength !== this.props.boneyardLength)) {
            // debugger
            this.diff = prevProps.boneyardLength - this.props.boneyardLength;

            if(this.diff !== 0){
                this.setState({ drawImageToggle: true }, () => {
                this.oldTimerId = setTimeout(() => {
                    // debugger
                    this.setState({drawImageToggle: false})
                }, 2000);
            });
            }
            

            // setTimeout(this.setState({ drawImageToggle: false }), 3000)
        }
        

        // if (prevProps.src !== this.props.src) {
        //     this.loadImage();
        // }
    }

    componentWillUnmount() {
        debugger
        this.image.removeEventListener('load', this.handleLoad);
        clearTimeout(this.oldTimerId)
    }

    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        this.image.src = Draw;
        this.image.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };

    render(){
        const textProps = {
            x : 100,
            y : 250,
            text : `${this.props.player} '\n' draws ${this.diff}`,
            fontFamily: "'M PLUS Rounded 1c'",
            fontSize: 26,
            fill: '#FFFFFF',
            stroke: 'white',
            strokeWidth: 1,


        }

         

        return (
        <>
            {this.state.drawImageToggle ?
            <Group x={this.state.drawImagex} y={this.state.drawImagey}>
                <Image   
                image={this.state.image}
                ref={node => {
                    this.imageNode = node;
                }}
                 /> 
                 <Text {...textProps} />
                   
            </Group> : null}

        </>
        )

    }
}

export default Boneyard