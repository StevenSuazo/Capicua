import React from 'react';
import sergio_photo from '../assets/engineers/sergio-capicua.jpeg';
import steven_photo from '../assets/engineers/steven-capicua.jpeg';
import chris_photo from '../assets/engineers/chris-capicua.jpeg';
import yangel_photo from '../assets/engineers/yangel-capicua.jpeg';
import '../stylesheets/navbar.css';
import '../stylesheets/modal.css';
import Music from './musicPlayer';

class Navbar extends React.Component {
    
    // let btnModal = document.querySelectorAll("music-rules-btn");
    // let modalShow = document.querySelectorAll("modal-container");
    // btnModal.addEventListener('click', function(){
    //     modalShow.classList.add('modal-show');
    // })

    showModal(){
        let yerr = document.querySelector(".modal-container");
        yerr.classList.toggle('modalshow');
    }
    render(){
        
        
        return(
            <div className="navbar-container flex-row-start">
                <nav className="navbar">
                     <h2 className="nav-title">capicua</h2>
                     <div className="engineers-music-rules">
                    
                        <div className="nav-engineer" >
                            <a href="https://ilo161.github.io/" target="_blank" rel="noopener noreferrer">
                            <img className="nav-photo" src={sergio_photo} alt="sergio"/>
                            </a>
                            <h2 className="nav-name-title">Sergio Medina</h2>
                        </div>
                        <div className="nav-engineer">
                            <a href="https://stevensuazo.github.io/portfolio_site/" target="_blank" rel="noopener noreferrer">
                            <img className="nav-photo" src={steven_photo}alt="steven"/>
                            </a>
                            <h2 className="nav-name-title">Steven Suazo</h2>
                        </div>
                        <div className="nav-engineer">
                            <a href="https://crslpz.github.io/" target="_blank" rel="noopener noreferrer">
                            <img className="nav-photo" src={chris_photo} alt="chris"/>
                            </a>
                            <h2 className="nav-name-title">Chris Lopez</h2>
                        </div>
                        <div className="nav-engineer">
                            <a href="https://yangel20.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
                            <img className="nav-photo" src={yangel_photo} alt="yangel"/>
                            </a>
                            <h2 className="nav-name-title">Yangel Aguilera </h2>
                        </div>
                     </div>
                     <Music/>
                        <button className="music-rules-btn" onClick={this.showModal} >Rule's</button>
                        <div className="modal-container">
                            <div className="modal">
                                <div className="rules-music-container">
                                    <ul>
                                        <li className="game-rule">- Each player starts with 7 bone’s.</li>
                                        <li className="game-rule">- Player with the highest double goes first.</li>
                                        <li className="game-rule">- A played bone must match one of the end’s of the current bones on the board.</li>
                                        <li className="game-rule">- You must draw a bone if you don’t have one to play with or your turn get skip.</li>
                                        <li className="game-rule">- Capicua is when you play a winning bone, that can go on ether side of board (+25 points)</li>
                                    </ul>
                                    
                                    <button className="close-modal" onClick={this.showModal} >X</button>
                                </div>
                            </div>
                        </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;