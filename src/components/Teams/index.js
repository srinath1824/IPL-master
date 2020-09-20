import { Grid, Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actionTypes from "../actions";
import { compose } from "redux";
import FlightIcon from "@material-ui/icons/Flight";
import CopyrightIcon from "@material-ui/icons/Copyright";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { teamsDataApiCall } from "../apiCalls";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

class Teams extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.playerSelected) {
      this.props.setPlayerSelected("");
    }
    if (
      this.props.teamsdata[sessionStorage.getItem("teamSelected")].length === 0
    ) {
      let team = sessionStorage.getItem("teamSelected");
      teamsDataApiCall(team)
        .then((res) => {
          this.props.loadingSelected(false);
          this.props.getTeamSelected(res.data);
          this.props.setTeamSelected(team);
          this.props.teamsSelected({ name: team, players: res.data });
          this.props.setJersey(sessionStorage.getItem("jerseyColor"));
        })
        .catch((err) => console.log("error"));
    }
  }
  handleData(name) {
    this.props.setPlayerSelected(name);
    sessionStorage.setItem("playerSelected", name);
    this.props.history.push("/playerInfo");
  }

  render() {
    let members = [];
    let teamOrder = ["Wicket Keeper", "Batsman", "All-Rounder", "Bowler"];
    let sortedList = this.props.team.sort(
      (a, b) => b.matches.length - a.matches.length
    );
    if (this.props.team.length > 0) {
      teamOrder.map((o) => {
        members.push(
          sortedList.map((m) => {
            let totalRuns = 0;
            let totalWickets = 0;
            if (o === m.role) {
              m.matches &&
                m.matches.forEach((val) => {
                  totalRuns += val.Score;
                  totalWickets += val.Wickets;
                });
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card
                    onClick={() => this.handleData(m.playerName)}
                    style={{ cursor: "pointer", opacity: "0px" }}
                  >
                    <CardContent
                      className="cards"
                      style={{
                        height: "300px",
                        background: this.props.jersey,
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <CardMedia>
                          <Grid container>
                            <Grid item xs={2}>
                              {m.Captain && (
                                <CopyrightIcon
                                  style={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    borderRadius: "50%",
                                  }}
                                />
                              )}
                              {m.overseas && (
                                <FlightIcon style={{ color: "white" }} />
                              )}
                            </Grid>
                            <Grid item xs={m.Captain || m.overseas ? 10 : 12}>
                              <img
                                src={`/Teams/${this.props.teamSelected}/${m.playerName}.png`}
                                width="180px"
                                height="180px"
                              />
                            </Grid>
                          </Grid>
                        </CardMedia>
                      </div>
                      <Grid container>
                        <Grid item xs={12}>
                          <div style={{ textAlign: "center" }}>
                            <div
                              style={{
                                fontSize: "1.5rem",
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              <div>{m.playerName}</div>
                              <div
                                style={{ fontSize: "1rem", fontWeight: 300 }}
                              >
                                {m.role}
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid
                            container
                            className="MatchesInfo"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                              fontSize: "larger",
                              color: "white",
                            }}
                          >
                            <Grid item xs={4}>
                              <div>Matches</div>
                              <div
                                style={{ fontSize: "30px", fontWeight: "bold" }}
                              >
                                {m?.matches ? m.matches.length : 0}
                              </div>
                            </Grid>
                            <Grid item xs={4}>
                              <div>Runs</div>
                              <div
                                style={{ fontSize: "30px", fontWeight: "bold" }}
                              >
                                {totalRuns}
                              </div>
                            </Grid>
                            <Grid item xs={4}>
                              <div>Wickets</div>
                              <div
                                style={{
                                  fontSize: "30px",
                                  fontWeight: "bold",
                                }}
                              >
                                {totalWickets}
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            }
          })
        );
      });
    } else {
      return (
        <Backdrop open={true}>
          <CircularProgress color="primary" />
        </Backdrop>
      );
    }
    return (
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            background: this.props.jersey,
            display: "inline-block",
            color: "white",
            borderRadius: "50px",
            padding: "5px",
          }}
        >
          {sessionStorage.getItem("fullTeamName")}
        </h1>
        <Container maxWidth="lg">
          <Grid container spacing={10}>
            {members}
          </Grid>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    team: state.dashboard.team,
    teamsdata: state.teams,
    teamSelected: state.dashboard.teamSelected,
    loading: state.dashboard.loading,
    jersey: state.dashboard.jersey,
    playerSelected: state.dashboard.playerSelected,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setPlayerSelected: (data) =>
      dispatch({ type: actionTypes.PLAYER_SELECT, data }),
    setTeamSelected: (data) =>
      dispatch({ type: actionTypes.TEAM_SELECT, data }),
    getTeamSelected: (data) =>
      dispatch({ type: actionTypes.SELECT_TEAM, data }),
    loadingSelected: (data) =>
      dispatch({ type: actionTypes.LOADING_PAGE, data }),
    teamsSelected: (data) => dispatch({ type: actionTypes.TEAMS_SELECT, data }),
    setJersey: (data) => dispatch({ type: actionTypes.SET_JERSEY, data }),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Teams);
