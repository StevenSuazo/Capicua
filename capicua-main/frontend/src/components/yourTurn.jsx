import React from "react";
import useImage from 'use-image';
import Konva from "konva";
import { Group, Image, Text } from 'react-konva';
import YourMove from '../assets/img/modals/yourMove.png'
import OppMove from '../assets/img/modals/oppMove.png'

class YourTurn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageX: null,
      imageY: null,
      drawImageToggle: false,
      drawNameToggle: false
    }

    this.textFor0 = null;
    this.textFor1 = null;
    this.textFor2 = null;
    this.textFor3 = null;

  }

  componentDidMount() {
    this.loadImage();
    switch (this.props.players.length) {
      case 2:
        this.textFor0 = { x: 430, y: 785, text: this.props.players[0].username, fontSize: 30 };
        this.textFor1 = { x: 100, y: 400, rotation: 90, text: this.props.players[1].username, fontSize: 20 };
        break;
      case 3:
        this.textFor0 = { x: 430, y: 785, text: this.props.players[0].username, fontSize: 30 };
        this.textFor1 = { x: 100, y: 400, rotation: 90, text: this.props.players[1].username, fontSize: 20 };
        this.textFor2 = { x: 400, y: 70, text: this.props.players[2].username, fontSize: 20 };
        break;
      case 4:
        this.textFor0 = { x: 430, y: 785, text: this.props.players[0].username, fontSize: 30 };
        this.textFor1 = { x: 100, y: 400, rotation: 90, text: this.props.players[1].username, fontSize: 20 };
        this.textFor2 = { x: 400, y: 70, text: this.props.players[2].username, fontSize: 20 };
        this.textFor3 = { x: 810, y: 490, rotation: 270, text: this.props.players[3].username, fontSize: 20 };
        break;
      default: 
        break;
    }
  }


  componentDidUpdate(prevProps) {
    if (prevProps.currentPlayer !== this.props.currentPlayer) {
      switch (this.props.currentPlayer.username) {
        case this.props.players[0].username: 
          this.setState({ image: this.imageA, drawImageToggle: true, imageX: 380, imageY: 775 })
          break;
        case this.props.players[1].username: 
          this.setState({ image: this.imageB, drawImageToggle: true, imageX: 70, imageY: 350 })
          break;
        case this.props.players[2].username:
          this.setState({ image: this.imageB, drawImageToggle: true, imageX: 350, imageY: 60 })
          break;
        case this.props.players[3].username:
          this.setState({ image: this.imageB, drawImageToggle: true, imageX: 800, imageY: 500 })
          break;
        default:
          break;
      }
    }
  }


  componentWillUnmount() {
    this.imageA.removeEventListener('load', this.handleLoad);
    this.imageB.removeEventListener('load', this.handleLoad);
  }

  loadImage() {
    this.imageA = new window.Image();
    this.imageA.src = YourMove;
    this.imageA.addEventListener('load', this.handleLoad);
    this.imageB = new window.Image();
    this.imageB.src = OppMove;
    this.imageB.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    this.setState({ image: this.imageA })
  }

  render() {

    return(
      <>
        {this.state.drawImageToggle ? 
          <Group x={this.state.imageX} y={this.state.imageY}>
            <Image
              image={this.state.image}
              width={40}
              height={40}
              ref={node => {
                this.imageNode = node;
              }} />
          </Group> : null}
        {this.props.players.length == 2 ?
          <Group>
            <Text {...this.textFor0} />
            <Text {...this.textFor1} />

          </Group> : null}
        {this.props.players.length == 3 ?
          <Group>
            <Text {...this.textFor0} />
            <Text {...this.textFor1} />
            <Text {...this.textFor2} />

          </Group> : null}
        {this.props.players.length == 4 ?
          <Group>
            <Text {...this.textFor0} />
            <Text {...this.textFor1} />
            <Text {...this.textFor2} />
            <Text {...this.textFor3} />

          </Group> : null}
      </>
    )
  }
}

export default YourTurn;