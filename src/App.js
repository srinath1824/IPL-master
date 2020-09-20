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
import PointsTable from "./components/Statistics/pointsTable";
import ScheduleTable from "./components/Statistics/schedule";
import Donate from "./components/Donate";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <div style={{ padding: "30px" }}>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/teams" component={Teams} />
            <Route exact path="/form" component={Form} />
            <Route exact path="/playerInfo" component={PlayerInfo} />
            <Route exact path="/Compare" component={Compare} />
            <Route exact path="/Donate" component={Donate} />
            <Route exact path="/Points" component={PointsTable} />
            <Route exact path="/Dream11" component={Stats} />
            <Route exact path="/Schedule" component={ScheduleTable} />
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
