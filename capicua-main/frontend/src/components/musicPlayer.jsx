import React from "react";
import '../stylesheets/music.css';
import basic from'../assets/music/BasicMusic.mp3'
import mild from'../assets/music/mildMusic.mp3'
import Caliente from'../assets/music/calienteMusic.mp3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faVolumeUp, faVolumeMute  } from '@fortawesome/free-solid-svg-icons'


const track1 = basic;
const track2 = mild;
const track3 = Caliente;

class Music extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTrack: null,
            player: "stopped",
            value: null,
            muted: null
        }

        this.soundCheck = this.soundCheck.bind(this);
    }


    componentDidUpdate(prevProps, prevState){
        if (this.state.selectedTrack !== prevState.selectedTrack) {
            let track;

            switch (this.state.selectedTrack) {
                case "Plain":
                    track = track1
                    break;
                case "Mild":
                    track = track2
                    break;
                case "Caliente":
                    track = track3
                    break;
                default:
                    break;
            }
            
            if (track) {
                this.player.src = track;
                this.player.play();
                
                this.setState({ player: "playing", muted: this.player.muted })
            }
        }
        if (this.state.player !== prevState.player) {
            if (this.state.player === "paused") {
              this.player.pause();
            } else if (this.state.player === "stopped") {
              this.player.pause();
              this.setState({ selectedTrack: null });
            } else if (
              this.state.player === "playing" &&
              prevState.player === "paused"
            ) {
              this.player.play();
            }
          }
    }
    soundCheck(event) {
        debugger
        this.setState({value: event.target.value});
        this.player.volume = event.target.value //this.state.value
        console.log(this.state.value)
        this.state.value <= 0.09 ? this.player.muted = true : this.player.muted = false
    }


    render(){
        const playBtn = <FontAwesomeIcon className="control-btn" icon={faPlay} />
        const pauseBtn = <FontAwesomeIcon className="control-btn" icon={faPause} />
        const stopBtn = <FontAwesomeIcon className="control-btn" icon={faStop} />
        const volBtn = <FontAwesomeIcon className="control-btn" icon={faVolumeUp} />
        const volMuteBtn = <FontAwesomeIcon className="control-btn" icon={faVolumeMute} />
        const divPlayBtn = <div >
            {/* this is what chooses if the play button or pause button appears, 
        also when no track is selected chooses plain track to play first */}
            {this.state.player === "stopped" || this.state.player === "paused" ?
                this.state.selectedTrack === null ?
                    <div className="play-pause-btn" onClick={() => this.setState({ player: "playing", selectedTrack: "Plain" })}>
                        {playBtn}
                    </div>
                    :
                    <div className="play-pause-btn" onClick={() => this.setState({ player: "playing" })}>
                        {playBtn}
                    </div>
                :
                <div className="play-pause-btn" onClick={() => this.setState({ player: "paused" })}>
                    {pauseBtn}
                </div>

            }
        </div>

        const mute = <div>

                { this.state.value === 0.1 ?
                     <div className="vol-icon" onClick={() => this.setState({ value: "1" }) && console.log("pressed")}>
                     {volMuteBtn}
                    </div> 
                    :
                    <div className="vol-icon" onClick={() => this.setState({ value: "0.1" }) && console.log("pressed")}>
                     {volBtn}
                    </div> 
                }
            
            {/* { this.state.muted === false ?
            <div className="vol-icon" onClick={() => this.player.muted = true && this.setState({muted: true})} >{volBtn}</div>
            :
            <div className="vol-icon" onClick={() => (this.player.muted = false) && this.setState({muted: false})} >{volMuteBtn}</div>} */}
        </div>

        // faPlay
        // <i class="fas fa-play"></i>
        const musicList = [
            { id: 1, title: "Plain" },
            { id: 2, title: "Mild" },
            { id: 3, title: "Caliente"}
        ].map(item => {
            {/* this is where i change and insert a photo */ }

            return (
                this.state.selectedTrack === item.title ?
                <li
                className="song1 song-highlite"
                key={item.id}
                onClick={() => this.setState({selectedTrack: item.title})}
                >
                    {item.title} 
                </li>
                :
                <li
                className="song1"
                key={item.id}
                onClick={() => this.setState({selectedTrack: item.title})}
                >
                    {item.title} 
                </li>
            )
        })
        musicList.push(divPlayBtn)

    
        
        return(

        <div className="music-container">
            {/* flex Start */}
            <h1 className="music-title">Play Song</h1>
            <div className="songs-container"> 
                <ul className="songs">{musicList}</ul>
            {/* flex Start */}
            {/* Flex End */}
            </div>
            {/* <p>HELLO</p> */}
            
            
                

                
                    {/* <button onClick={this.state.player === "paused" && (() => this.setState({ player: "playing" }))}>
                        Play
                    </button>
              */}



                    {/* <button onClick={this.playMusic}>
                        Play
                    </button> */}
                {/* {this.state.player === "playing" && (
                     <div onClick={() => this.setState({ player: "paused" })}>
                         {pauseBtn}
                     </div>
                )} */}
                {/* {this.state.player === "playing" || this.state.player === "paused" ? (
                    <div onClick={() => this.setState({ player: "stopped" })}>
                        {stopBtn}
                    </div>
                ) : (
                    ""
                )}  */}
             
           
            <div className="music-vol-container ">
                {/* { this.state.muted === false ?
                <div className="vol-icon" onClick={() => this.setState({ muted: true }) } >{volBtn}</div>
                :
                <div className="vol-icon" onClick={() => this.setState({ muted: false }) } >{volMuteBtn}</div> 
                } */}

                    {/* {this.state.muted ? this.player.muted = true :this.player.muted = false } */}
                    {/* <div className="vol-icon" onClick={() => this.player.muted = true} > {volBtn} </div> */}
                
                {/* {mute} */}
                {/* { this.state.muted === false ?
                {<div className="vol-icon" onClick={() => this.player.muted = true && this.setState({muted: true})} >{volBtn}</div>
                :
                <div className="vol-icon" onClick={() => (this.player.muted = false) && this.setState({muted: false})} >{volMuteBtn}</div>}
                */}
                <input 
                className="music-vol"
                type="range" 
                min="0.01" 
                max="1" 
                defaultValue="1" 
                className="volume-slider"
                step="0.001"
                onChange={this.soundCheck} 
                />
            </div>

                <audio ref={ref => (this.player = ref)} loop={true} muted={false} />
        </div>)
    }
}

export default Music;