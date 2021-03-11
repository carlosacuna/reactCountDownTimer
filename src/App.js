import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CountDownTimer from './components/countDownTimer';
import SelectStorage from './components/selectStorage';

const App = () => {
  return (
    <Router>
      <div>
        <div style={{ float: 'left', width: '20%' }}>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/countdowntimer">CountDownTimer</Link>
            </li>
            <li>
              <Link to="/selectstorage">Selects storage</Link>
            </li>
          </ul>
        </div>
        <div style={{ float: 'left', width: '80%', paddingTop: 20 }} >
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/countdowntimer">
              <CountDownTimer />
            </Route>
            <Route path="/selectstorage">
              <SelectStorage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

const Home = () => {
  return (
    <div>
      <h2>Inicio: seleccione una opción.</h2>
    </div>
  );
}

export default App;
