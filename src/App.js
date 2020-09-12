import React from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Teams from "./components/Teams";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Form from "./components/forms/form";
import PlayerInfo from "./components/playerInfo";
import Compare from "./components/Compares";
import Stats from "./components/Statistics/stats";
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
            <Route
              exact
              path="/Points"
              render={() => <Stats name="points_table" />}
            />
            <Route
              exact
              path="/Dream11"
              render={() => <Stats name="dream11_points" />}
            />
          </div>
        </Switch>
      </Router>
      {/* <div
        style={{
          background: "#19398A",
          height: "50px",
          textAlign: "center",
          color: "white",
          bottom: "0px",
          width: "100%",
          position: "fixed",
        }}
      >
        @Fan made Dream11 analysis application
      </div> */}
    </div>
  );
}

export default App;
