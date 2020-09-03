import React from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Teams from "./components/Teams";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Form from "./components/forms/form";
import PlayerInfo from "./components/playerInfo";
import Compare from "./components/Compares";
import Donate from "./components/Donate";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <div style={{ padding: "30px" }}>
            <Route exact path="/" render={() => <Dashboard />} />
            <Route exact path="/teams" render={() => <Teams />} />
            <Route exact path="/form" render={() => <Form />} />
            <Route exact path="/playerInfo" render={() => <PlayerInfo />} />
            <Route exact path="/Compare" render={() => <Compare />} />
            <Route exact path="/Donate" render={() => <Donate />} />
          </div>
        </Switch>
      </Router>
      {/* <div
        style={{
          background: "#19398A",
          height: "20px",
          textAlign: "center",
          color: "white",
          bottom: "0px",
          width: "100%",
          position: "fixed"
        }}
      >
        @Fan made Dream11 analysis application
      </div> */}
    </div>
  );
}

export default App;
