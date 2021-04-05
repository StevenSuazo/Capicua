import React from "react";
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
    const { heightDimen } = this.props;
    this.loadImage();
    switch (this.props.players.length) {
      case 2:
        this.textFor0 = { x: (heightDimen * 0.47), y: (heightDimen * 0.87), text: this.props.players[0].username, fontSize: 30, fill: "white" };
        this.textFor1 = { x: (heightDimen * 0.10), y: (heightDimen * 0.444), rotation: 90, text: this.props.players[1].username, fontSize: 20, fill: "white" };
        break;
      case 3:
        this.textFor0 = { x: (heightDimen * 0.47), y: (heightDimen * 0.87), fontSize: 30, fill: "white" };
        this.textFor1 = { x: (heightDimen * 0.10), y: (heightDimen * 0.444), rotation: 90, text: this.props.players[1].username, fontSize: 20, fill: "white" };
        this.textFor2 = { x: (heightDimen * 0.47), y: (heightDimen * 0.070), text: this.props.players[2].username, fontSize: 20, fill: "white" };
        break;
      case 4:
        this.textFor0 = { x: (heightDimen * 0.47), y: (heightDimen * 0.87), text: this.props.players[0].username, fontSize: 30, fill: "white" };
        this.textFor1 = { x: (heightDimen * 0.10), y: (heightDimen * 0.444), rotation: 90, text: this.props.players[1].username, fontSize: 20, fill: "white" };
        this.textFor2 = { x: (heightDimen * 0.47), y: (heightDimen * 0.070), text: this.props.players[2].username, fontSize: 20, fill: "white" };
        this.textFor3 = { x: (heightDimen * 0.91), y: (heightDimen * 0.51), rotation: 270, text: this.props.players[3].username, fontSize: 20, fill: "white" };
        break;
      default: 
        break;
    }
  }


  componentDidUpdate(prevProps) {
    const { heightDimen } = this.props
    if (prevProps.currentPlayer !== this.props.currentPlayer) {
      switch (this.props.currentPlayer.username) {
        case this.props.players[0].username: 
          this.setState({ image: this.imageA, drawImageToggle: true, imageX: (heightDimen * 0.42), imageY: (heightDimen * 0.865) })
          break;
        case this.props.players[1].username: 
          this.setState({ image: this.imageB, drawImageToggle: true, imageX: (heightDimen * 0.072), imageY: (heightDimen * 0.385) })
          break;
        case this.props.players[2].username:
          this.setState({ image: this.imageB, drawImageToggle: true, imageX: (heightDimen * 0.42), imageY: (heightDimen * 0.067) })
          break;
        case this.props.players[3].username:
          this.setState({ image: this.imageB, drawImageToggle: true, imageX: (heightDimen * 0.89), imageY: (heightDimen * 0.52) })
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
              width={35}
              height={35}
              ref={node => {
                this.imageNode = node;
              }} />
          </Group> : null}
        {this.props.players.length === 2 ?
          <Group>
            <Text {...this.textFor0} />
            <Text {...this.textFor1} />

          </Group> : null}
        {this.props.players.length === 3 ?
          <Group>
            <Text {...this.textFor0} />
            <Text {...this.textFor1} />
            <Text {...this.textFor2} />

          </Group> : null}
        {this.props.players.length === 4 ?
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