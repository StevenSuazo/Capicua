import './stylesheets/App.css';
import './stylesheets/reset.css';
import { Switch, Route } from "react-router-dom"
import bodega from "./assets/img/La_Bodega.jpg"
import Splash from './components/splash';
import {GameViewComponent} from './components/gameView';
import Join from './components/chat/joinB';
import Lobby from "./components/chat/lobby"


function App() {

  return (
    <div className="App">
      <header className="App-header">
      </header>
      
        <Switch>
          {/* <Route exact path="/join" component={Join} /> */}
          <Route exact path="/joinSoloGame" component={Join} />
          <Route exact path="/join2playergame" component={Join} />
          <Route exact path="/join4playergame" component={Join} />
          {/* <Route exact path="/joinSoloGameServer" component={Join} /> */}
          

          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/" component={Splash}/>
          <Route path="/play_game" component={GameViewComponent}/>
        </Switch>
      

    </div>
  );
}

export default App