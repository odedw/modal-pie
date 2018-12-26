import React, { Component } from "react";
import "./App.css";
import ModesChartView from "./ModesChartView";
import ModeView from "./ModeView";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Route path="/" exact component={ModesChartView} />
            <Route path="/:name" component={ModeView} />
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
