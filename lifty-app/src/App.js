import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Workout from "./components/Workout";
import Home from './components/Home'
import Exercise from './components/Exercise'
function App() {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <Link to="/home">Lifty</Link>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route
          exact
          path="/workout/:id"
          component={Workout} />
        
      </Switch>
    </div>
  )
};


export default App;
