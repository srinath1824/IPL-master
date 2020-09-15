import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Grid, Container } from "@material-ui/core";
import { connect } from "react-redux";
import actionTypes from "../actions";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CompareCard from "./compareCard";
import CompareStats from "./compareStats";
import { SERVER_URL } from "../constants";

const DropDown = ({ value, change: handleChange, name, label, disabled }) => (
  <Select
    label={label}
    name={name}
    disabled={disabled}
    style={{ width: "100%" }}
    onChange={(e) => handleChange(e)}
  >
    {value}
  </Select>
);

class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDowm: true,
      player1Stage: false,
      player2Stage: false,
      showPopup: false,
      compareData: [],
    };
  }

  changeHandler(e) {
    this.props.setTeamUpdate(e.target);
    this.setState({ showDropDowm: false });
    if (e.target.name === "team1") {
      this.props.setTeamUpdate({ name: "player1", value: "" });
    } else if (e.target.name === "team2") {
      this.props.setTeamUpdate({ name: "player2", value: "" });
    } else if (e.target.name === "player1") {
      this.setState({ player1Stage: true });
    } else if (e.target.name === "player2") {
      this.setState({ player2Stage: true });
    }
    if (
      this.props.teamsData[e.target.value] &&
      !this.props.teamsData[e.target.value].length > 0
    ) {
      //api call
      axios
        .get(`${SERVER_URL}/api/getdata/${e.target.value}`)
        .then((res) => {
          this.props.setTeamData({
            name: e.target.value,
            role: e.target.value,
            players: res.data,
          });
        })
        .catch((err) => console.log("error"));
    }
  }

  handleCompare() {
    const {
      teamsData,
      team1Selected,
      team2Selected,
      player1Selected,
      player2Selected,
    } = this.props;
    let player1Data = teamsData[team1Selected].find(
      (p) => p.playerName === player1Selected
    );
    let player2Data = teamsData[team2Selected].find(
      (p) => p.playerName === player2Selected
    );
    let data = [
      {
        field: "Matches",
        player1: player1Data.matches.length,
        player2: player2Data.matches.length,
      },
      {
        field: "Runs",
        player1: player1Data.matches.reduce((x, y) => x + y["Score"], 0),
        player2: player2Data.matches.reduce((x, y) => x + y["Score"], 0),
      },
      {
        field: "S/R",
        player1:
          player1Data.matches.reduce((x, y) => x + y["SR"], 0) /
          player1Data.matches.length,
        player2:
          player2Data.matches.reduce((x, y) => x + y["SR"], 0) /
          player2Data.matches.length,
      },
      {
        field: "4's",
        player1: player1Data.matches.reduce((x, y) => x + y["4s"], 0),
        player2: player2Data.matches.reduce((x, y) => x + y["4s"], 0),
      },
      {
        field: "6's",
        player1: player1Data.matches.reduce((x, y) => x + y["6s"], 0),
        player2: player2Data.matches.reduce((x, y) => x + y["6s"], 0),
      },
      {
        field: "Overs",
        player1: player1Data.matches.reduce((x, y) => x + y["Overs"], 0),
        player2: player2Data.matches.reduce((x, y) => x + y["Overs"], 0),
      },
      {
        field: "Wickets",
        player1: player1Data.matches.reduce((x, y) => x + y["Wickets"], 0),
        player2: player2Data.matches.reduce((x, y) => x + y["Wickets"], 0),
      },
      {
        field: "Eco",
        player1:
          player1Data.matches.reduce((x, y) => x + y["Eco"], 0) /
          player1Data.matches.length,
        player2:
          player2Data.matches.reduce((x, y) => x + y["Eco"], 0) /
          player2Data.matches.length,
      },
      {
        field: "Catches",
        player1: player1Data.matches.reduce((x, y) => x + y["Catches"], 0),
        player2: player2Data.matches.reduce((x, y) => x + y["Catches"], 0),
      },
    ];
    this.setState({ compareData: data });
    this.setState({ showPopup: true });
  }
  render() {
    let team1 = Object.keys(this.props.teamsData).map((team) => {
      return <MenuItem value={team}>{team}</MenuItem>;
    });
    let team2 = Object.keys(this.props.teamsData).map((team) => {
      if (team !== this.props.team1Selected) {
        return <MenuItem value={team}>{team}</MenuItem>;
      }
    });

    let team1Players;
    if (
      this.props.team1Selected &&
      this.props.teamsData[this.props.team1Selected]
    ) {
      team1Players = this.props.teamsData[this.props.team1Selected].map((p) => {
        return <MenuItem value={p.playerName}>{p.playerName}</MenuItem>;
      });
    }
    let team2Players = "";
    if (
      this.props.team2Selected &&
      this.props.teamsData[this.props.team2Selected]
    ) {
      team2Players = this.props.teamsData[this.props.team2Selected].map((p) => {
        return <MenuItem value={p.playerName}>{p.playerName}</MenuItem>;
      });
    }

    return (
      <Container maxWidth="md">
        <Grid container style={{ justifyContent: "center" }}>
          <Grid
            item
            xs={12}
            sm={4}
            lg={3}
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Team1</InputLabel>
              <DropDown
                name="team1"
                label="Select Team1"
                value={team1}
                change={(e) => this.changeHandler(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} />
          <Grid
            item
            xs={12}
            sm={4}
            lg={3}
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Team2
              </InputLabel>
              <DropDown
                name="team2"
                label="Select Team2"
                value={team2}
                disabled={this.state.showDropDowm}
                change={(e) => this.changeHandler(e)}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={2} />
          {team1Players && (
            <Grid item xs={12} sm={4} lg={3} style={{ marginTop: "20px" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>{`Select ${this.props.team1Selected} Player`}</InputLabel>
                <DropDown
                  name="player1"
                  label="Select Player1"
                  value={team1Players}
                  change={(e) => this.changeHandler(e)}
                />
              </FormControl>
            </Grid>
          )}
          <Grid item xs={2} />
          {team2Players && (
            <Grid item xs={12} sm={4} lg={3} style={{ marginTop: "20px" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>{`Select ${this.props.team2Selected} Player`}</InputLabel>
                <DropDown
                  name="player2"
                  label="Select Player2"
                  value={team2Players}
                  change={(e) => this.changeHandler(e)}
                />
              </FormControl>
            </Grid>
          )}
        </Grid>
        <Grid item xs={2} />
        <div>
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={12} sm={4} lg={3}>
              {this.state.player1Stage && (
                <CompareCard
                  name={this.props.player1Selected}
                  team={this.props.team1Selected}
                  teamsData={this.props.teamsData}
                />
              )}
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={12} sm={4} lg={3}>
              {this.state.player2Stage && (
                <CompareCard
                  name={this.props.player2Selected}
                  team={this.props.team2Selected}
                  teamsData={this.props.teamsData}
                />
              )}
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </div>
        <div style={{ textAlign: "center" }}>
          {this.props.player1Selected && this.props.player2Selected && (
            <Button
              variant="contained"
              color="primary"
              disabled={
                !(this.props.player1Selected && this.props.player2Selected)
              }
              onClick={() => this.handleCompare()}
            >
              Compare
            </Button>
          )}
        </div>
        {this.state.showPopup && this.state.compareData && (
          <CompareStats
            player1={this.props.player1Selected}
            player2={this.props.player2Selected}
            show={this.state.showPopup}
            data={this.state.compareData}
            close={() => this.setState({ showPopup: false })}
          />
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    team1Selected: state.compare.team1,
    team2Selected: state.compare.team2,
    player1Selected: state.compare.player1,
    player2Selected: state.compare.player2,
    teamsData: state.teams,
    jerseyColors: state.compare.colors,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setTeamUpdate: (data) => dispatch({ type: actionTypes.TEAM_SELECT, data }),
    setTeamData: (data) => dispatch({ type: actionTypes.TEAMS_SELECT, data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
