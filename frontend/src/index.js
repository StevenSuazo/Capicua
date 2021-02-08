import React from 'react';
import ReactDOM from 'react-dom';
// import axios from "axios";
import './index.css';
import App from './App';
// import { Provider } from 'react-redux';
// import Game from './components/game';
import axios from "axios";
import {HashRouter} from "react-router-dom";






ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
    <App />
    {/* <Game /> */}
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
  );
  
  // let socket = io.connect("http://localhost:4000");
  window.axios = axios;
  

// Make connection

//game sound
