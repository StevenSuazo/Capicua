import React from "react";
import useImage from 'use-image';
import Bone from "./bone"
import Konva from "konva";
import { Group, Image, Text } from 'react-konva';
import Draw from '../assets/img/modals/draw.png'
import BoneyardRemaining from '../assets/img/modals/boneYardBox.png'
//blank domino
// import domino01 from '../assets/img/dominos_pieces_vector_svg/dominos_bone_0:1.svg';

class Boneyard extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            imageA: null,
            imageB: null,
            drawImagexA: 300,
            drawImageyA: 240,
            drawImagexB: 755,
            drawImageyB: 1,
            drawImageToggle : false,
            allPlayers: undefined,
            textProps: undefined,
            textPropsBY:this.props.boneyardLength
        }
        this.currPlayerIdx = undefined;
        
    }

    componentDidMount() {
        this.loadImage();
        let textPropsBY;
        const allPlayers =[];
        
        for(let i = 0; i < this.props.players.length; i++){
            allPlayers.push({ ...this.props.players[i], drawImageToggle: false  })
        }

        textPropsBY = {
            x: 65,
            y: 28,
            text: `${this.props.boneyardLength}`,
            fontFamily: "'M PLUS Rounded 1c'",
            fontSize: 17,
            fill: '#FFFFFF',
            stroke: 'white',
            strokeWidth: 1,
        }
        this.setState({allPlayers: allPlayers, textPropsBY})

    }

    findPlayerByIndex(){
        const {currentPlayer} = this.props
        let currPlayerIdx;

        this.state.allPlayers.forEach((player, idx) => {
            if(player.username === currentPlayer.username){
                currPlayerIdx = idx;
            }
        })

        return currPlayerIdx;
    }

    componentDidUpdate(prevProps){
        // this.showDrawAlert()

        if (this.props.boneyardLength < (28 - (this.props.players.length * 7)) && (prevProps.boneyardLength !== this.props.boneyardLength)) {
            let textPropsBY = Object.assign({},this.state.textPropsBY);
            textPropsBY.text = `${this.props.boneyardLength}`
            
            // debugger
            this.diff = prevProps.boneyardLength - this.props.boneyardLength

            if(this.state.allPlayers){
                this.currPlayerIdx = this.findPlayerByIndex()
                let textProps;
                let userName;

                if (this.state.allPlayers[this.currPlayerIdx].username.length <= 6){
                    userName = `     ${this.state.allPlayers[this.currPlayerIdx].username} \n    draws ${this.diff}`
                } else {
                    userName = `${this.state.allPlayers[this.currPlayerIdx].username} \n   draws ${this.diff}`
                }

                textProps = {
                    x: 105,
                    y: 248,
                    text: `${userName}`,
                    fontFamily: "'M PLUS Rounded 1c'",
                    fontSize: 20,
                    fill: '#FFFFFF',
                    stroke: 'white',
                    strokeWidth: 1,
                }

                setTimeout(() => {

                    let thisPlayer = this.state.allPlayers[this.currPlayerIdx];
                    thisPlayer.drawImageToggle = true;

                    let allPlayers = this.state.allPlayers;
                    allPlayers[this.currPlayerIdx] = thisPlayer;

                    this.setState({allPlayers, textProps, textPropsBY}, () => {
                        // debugger
                        setTimeout(() => {
                            thisPlayer.drawImageToggle = false;
                            let allPlayers = this.state.allPlayers;
                            allPlayers[this.currPlayerIdx] = thisPlayer;
                            this.setState({ allPlayers: allPlayers })
                        }, 1300)
                    })
                }, 1500)

            }
                //this code is perfect
                // this.setState({ drawImageToggle: true}, () => {
                //     setTimeout(() => {this.setState({ drawImageToggle : false })
                //         }, 2000);
                //     })
                // }
                //perfect ^^
            

        // if (prevProps.src !== this.props.src) {
        //     this.loadImage();
        // }
        }
    }
    
    componentWillUnmount() {
        this.imageA.removeEventListener('load', this.handleLoad);
        this.imageB.removeEventListener('load', this.handleLoad);
    }

    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.imageA = new window.Image();
        this.imageA.src = Draw;
        this.imageA.addEventListener('load', this.handleLoad);
        this.imageB = new window.Image();
        this.imageB.src = BoneyardRemaining;
        this.imageB.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      imageA: this.imageA,
      imageB: this.imageB
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };

    render(){
        let allToggles;
        let drawImageToggle;


        if(this.state.allPlayers){
            allToggles = this.state.allPlayers.map((player) => {
                return (player.drawImageToggle)
            })

            drawImageToggle = allToggles.some((x) => {
                return x === true
            })

        }
            // <Group x={this.state.drawImagex} y={this.state.drawImagey}>
            //         {this.state.drawImageToggle ? <Image
            //             x={0}
            //                 y={0}
            // image={this.state.image}
            //  ref={node => {
            //                     this.imageNode = node;
            //             }}
            //         /> : null}
            //         {this.diff && this.state.drawImageToggle ? <Text {...textProps} /> : null}
            // </Group>
            // [true, false false, true]
                    // <Text x={boardDimen - 860} y={boardDimen - (boneHeight)}
                    //     text={board.boneyard.bones.length} fontSize={25} />
                    // <Text x={boardDimen - 860} y={boardDimen - (boneHeight - 20)}
                    //     text={'dominoes remaining'} fontSize={25} />

        return (
        <>
                {drawImageToggle ?
                    <Group x={this.state.drawImagexA} y={this.state.drawImageyA}>

                        <Image
                            image= {this.state.imageA}
                            ref={node => {
                                this.imageNodeA = node; }} />
                            
                        <Text {...this.state.textProps} />
                    </Group> : null }
                <Group x={this.state.drawImagexB} y={this.state.drawImageyB}>

                    <Image
                        image={this.state.imageB}
                        width ={150}
                        height={150}
                        opacity={0.7}
                        ref={node => {
                            this.imageNodeB = node;
                        }} />

                    <Text {...this.state.textPropsBY} />
                </Group>

        </>
        )
    }
}

export default Boneyard