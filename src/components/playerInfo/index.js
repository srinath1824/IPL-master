import React, { Component } from "react";
import { Grid, Card, Container } from "@material-ui/core";
import { connect } from "react-redux";
import TableInfo from "./tableInfo";
import actionTypes from "../actions";
import FlightIcon from "@material-ui/icons/Flight";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { teamsDataApiCall } from "../apiCalls";
import "./index.css";

class PlayerInfo extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    if (!this.props.teamSelected && !this.props.playerSelected) {
      this.props.setPlayerSelected(sessionStorage.getItem("playerSelected"));
      this.props.setTeamSelected(sessionStorage.getItem("teamSelected"));
      this.props.setJersey(sessionStorage.getItem("jerseyColor"));
    }
  }

  async componentDidMount() {
    const { teamSelected } = this.props;
    this.props.loadingSelected(true);
    if (!teamSelected) {
      await teamsDataApiCall(sessionStorage.getItem("teamSelected"))
        .then((res) => {
          this.props.loadingSelected(false);
          this.props.getTeamSelected(res.data);
          this.props.teamsSelected({ name: teamSelected, players: res.data });
        })
        .catch((err) => console.log("error"));
    }
  }

  render() {
    let playerInfo = this.props.team.find(
      (a) => a.playerName === this.props.playerSelected
    );
    let firstName, lastName;
    if (playerInfo && playerInfo.playerName) {
      let name = playerInfo.playerName.split(" ");
      if (name.length === 2) {
        firstName = name[0];
        lastName = name[1];
      } else if (name.length > 2) {
        firstName = name[0];
        lastName = name.slice(1, name.length).join(" ");
      }
    }

    let batStats = [];
    let bowlStats = [];
    let totalRuns = 0;
    let totalWickets = 0;
    if (playerInfo && playerInfo.matches) {
      playerInfo.matches.map((match) => {
        let bat = {
          Date: match.Date,
          Matches: match.team,
          Score: match.Score,
          Balls: match.Balls,
          SR: match.SR,
          "4s": match["4s"],
          "6s": match["6s"],
          Wicket: match.Wicket,
        };
        let bowl = {
          Date: match.Date,
          Overs: match.Overs,
          Runs: match.Runs,
          Wickets: match.Wickets,
          Maiden: match.Maiden,
          Eco: match.Eco,
          Catches: match.Catches,
          Stumps: match.Stumps,
        };
        batStats.push(bat);
        bowlStats.push(bowl);
        totalRuns += match.Score;
        totalWickets += match.Wickets;
      });
    }

    return (
      <Container maxWidth="md">
        <Card style={{ background: this.props.jerseyColor }}>
          <Grid container>
            <Grid item xs={12} sm={4} lg={3} style={{ textAlign: "center" }}>
              <img
                src={`/Teams/${this.props.teamSelected}/${
                  playerInfo && playerInfo.playerName
                }.png`}
                width="180px"
              />
            </Grid>
            <Grid
              item
              className="playerDetails"
              xs={12}
              sm={4}
              lg={3}
              style={{ color: "white" }}
            >
              <div
                style={{
                  fontWeight: 900,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "30px 0px 0px 0px",
                  fontSize: "x-large",
                }}
              >
                <div style={{ fontWeight: 100 }}>{firstName}</div>
                <div>
                  {lastName}
                  {playerInfo && playerInfo.Captain && (
                    <CopyrightIcon
                      color="primary"
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </div>
              </div>
              <Grid container className="playerInfo">
                <Grid item xs={3}>
                  <div>Role</div>
                  <div>Team</div>
                  <div>Price</div>
                </Grid>
                <Grid item xs={6}>
                  <div>{playerInfo && playerInfo.role}</div>
                  <div>{this.props.teamSelected}</div>
                  <div>{playerInfo && playerInfo.price}</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              lg={4}
              style={{
                color: "white",
                display: "flex",
              }}
            >
              <Grid
                container
                className="MatchesInfo"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "larger",
                }}
              >
                <Grid item xs={4}>
                  <div>Matches</div>
                  <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                    {playerInfo?.matches ? playerInfo.matches.length : 0}
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>Runs</div>
                  <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                    {totalRuns}
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>Wickets</div>
                  <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                    {totalWickets}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <h1>Batting</h1>
        <TableInfo data={batStats} name="bat" />
        <h1>Bowling</h1>
        <TableInfo data={bowlStats} name="bowl" />
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    teamSelected: state.dashboard.teamSelected,
    playerSelected: state.dashboard.playerSelected,
    team: state.dashboard.team,
    jerseyColor: state.dashboard.jersey,
    iplTeams: state.teams,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setPlayerSelected: (data) =>
      dispatch({ type: actionTypes.PLAYER_SELECT, data }),
    setTeamSelected: (data) =>
      dispatch({ type: actionTypes.TEAM_SELECT, data }),
    setJersey: (data) => dispatch({ type: actionTypes.SET_JERSEY, data }),
    getTeamSelected: (data) =>
      dispatch({ type: actionTypes.SELECT_TEAM, data }),
    loadingSelected: (data) =>
      dispatch({ type: actionTypes.LOADING_PAGE, data }),
    teamsSelected: (data) => dispatch({ type: actionTypes.TEAMS_SELECT, data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);
