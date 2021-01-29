import React from 'react';
import { Link } from "react-router-dom";
import title_bone from '../assets/img/dominos_pieces_vector_svg/capicua_domino.png'
import '../stylesheets/splash.css';
import sergio_photo from '../assets/engineers/sergio-capicua.jpeg';
import steven_photo from '../assets/engineers/steven-capicua.jpeg';
import chris_photo from '../assets/engineers/chris-capicua.jpeg';
import yangel_photo from '../assets/engineers/yangel-capicua.jpeg';
import bodega from "../assets/img/La_Bodega.jpg"
import hireMe from "../assets/img/icons/hireMe.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithubSquare, faLinkedin, faWpforms} from "@fortawesome/free-brands-svg-icons"



class Splash extends React.Component {
  
  render(){
    // <i class="fab 
        const github = <FontAwesomeIcon icon={faGithubSquare} size="3x" />
        const linkedIn = <FontAwesomeIcon icon={faLinkedin} size="3x" />
        const resume = <FontAwesomeIcon icon={faWpforms} size="3x" />
    return (
      <div>
        <h1 className="capicua-title">
          <img src={title_bone} alt="title-bone-1" className="title-bone-1"/>
          CAPICUA
          <img src={title_bone} alt="title-bone-2" className="title-bone-2"/>
        </h1>
        <p className="game-description" >Online 2-4 player Dominoes called 'Capicua Slam'. 
          Filled with robust animations and genuine soundbites to match the authenticity of a real game of dominos.
          We will also build an AI opponent for offline play and include in game meters to achieve the SLAM! function in the game. 
          We will also add in a game voice chat feature to allow players to interact and influence the game.
        </p>
        <div className="pick-game">
          <form className="start-game-container">
            {/* <input
            className="input-name"
            placeholder="Enter a name"
            >
            </input> */}
            <div className="start-game-btn-container">
              <Link to={{pathname: `/joinSoloGame`,
                        state: {
                          title: "Solo Game",
                          gameType: "solo",
                          buttonText: "Start Game Vs AI",
                          isOnline: false,
                          totalPlayers: 2
                        }
                        }}>
                <button className="start-btn"> <span>1 Player <br></br>vs A.I.</span></button>
              </Link>
              <Link to={{pathname: `/join2playergame`,
                        state: {
                          title: "2 Player Online",
                          gameType: "multiplayer",
                          buttonText: ["Join Room", "Create Room", "I'm ready"],
                          isOnline: true,
                          totalPlayers: 2
                        }
                        }}>
              <button className="start-btn"> <span>2-Player Online</span></button>
              </Link>
              <Link to={{pathname: `/join4playergame`,
                        state: {
                          title: "4 Player Online",
                          gameType: "multiplayer",
                          buttonText: ["Join Room", "Create Room", "I'm ready"],
                          isOnline: true,
                          totalPlayers: 4
                        }
                        }}>
              <button className="start-btn"> <span>4-Player Online</span></button>
              </Link>
            </div>
          </form>
        </div>
        <h1 className="developers-title">MERN (MongoDB, Express, React, and Node.js) Stack Team </h1>
        <h1 className="photo-description"> Click on photo to view software engineer's portfolio</h1>
        <div className="MERN-team">

          <div className="sergio flex-col-center">
            <a href="https://ilo161.github.io/" target="_blank" rel="noopener noreferrer">
              <img className="sergio-photo" src={sergio_photo} alt="sergio"/>
            </a>
            <h2 className="name-title">Sergio Medina</h2>
            <div className="flex-row-start evenly">
              <a className="hireMe" href="https://github.com/ilo161/" target="_blank">
                {github}
              </a>
              <a href="" target="_blank">
                <img className="hireMe" src={hireMe} alt="hire me image"></img>
              </a>
              <a className="hireMe" href="https://www.linkedin.com/in/sergio-medina-36937668/" target="_blank">
                {linkedIn}
              </a>
              
            </div>
          </div>

          <div className="steven flex-col-center">
            <a href="https://stevensuazo.github.io/portfolio_site/" target="_blank" rel="noopener noreferrer">
              <img className="steven-photo" src={steven_photo}alt="steven"/>
            </a>
            <h2 className="name-title">Steven Suazo</h2>
            <div className="flex-row-start evenly">
              <a className="hireMe" href="https://github.com/ilo161/" target="_blank">
                {github}
              </a>
              <a href="" target="_blank">
                <img className="hireMe" src={hireMe} alt="hire me image"></img>
              </a>
              <a className="hireMe" href="https://www.linkedin.com/in/sergio-medina-36937668/" target="_blank">
                {linkedIn}
              </a>
              
            </div>
          </div>
          <div className="chris flex-col-center">
            <a href="https://crslpz.github.io/" target="_blank" rel="noopener noreferrer">
              <img className="chris-photo" src={chris_photo} alt="chris"/>
            </a>
            <h2 className="name-title">Chris Lopez</h2>
            <div className="flex-row-start evenly">
              <a className="hireMe" href="https://github.com/ilo161/" target="_blank">
                {github}
              </a>
              <a href="" target="_blank">
                <img className="hireMe" src={hireMe} alt="hire me image"></img>
              </a>
              <a className="hireMe" href="https://www.linkedin.com/in/sergio-medina-36937668/" target="_blank">
                {linkedIn}
              </a>
              
            </div>
          </div>
          <div className="yangel flex-col-center">
            <a href="https://yangel20.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
              <img className="yangel-photo" src={yangel_photo} alt="yangel"/>
            </a>
            <h2 className="name-title">Yangel Aguilera </h2>
            <div className="flex-row-start evenly">
              <a className="hireMe" href="https://github.com/ilo161/" target="_blank">
                {github}
              </a>
              <a href="" target="_blank">
                <img className="hireMe" src={hireMe} alt="hire me image"></img>
              </a>
              <a className="hireMe" href="https://www.linkedin.com/in/sergio-medina-36937668/" target="_blank">
                {linkedIn}
              </a>
              
            </div>
          </div>
        </div>
        <img src={bodega} alt="bodega" className="bodega-img-splash" ></img>
      </div>    
    )
  }
}

export default Splash;