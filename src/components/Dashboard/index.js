import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import actionTypes from "../actions";
import { teamsDataApiCall } from "../apiCalls";
import Popup from "../Popup";
import "./index.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donationPopup: true
    };
  }

  componentWillMount() {
    let popup = sessionStorage.getItem("donatePopup");
    if (popup !== "false") {
      sessionStorage.setItem("donatePopup", true);
    }
  }

  componentDidMount() {
    if (this.props.teamSelected) {
      this.props.setTeamSelected("");
      //this.props.setPlayerSelected("");
    }
  }

  handleDisagree() {
    this.setState({ donationPopup: false });
    sessionStorage.setItem("donatePopup", false);
  }

  handleDonatePopup() {
    sessionStorage.setItem("donatePopup", false);
    this.setState({ donationPopup: false });
    this.props.history.push("Donate");
  }

  async handleClick(team) {
    this.props.setTeamSelected(team.name);
    sessionStorage.setItem("teamSelected", team.name);
    sessionStorage.setItem("jerseyColor", team.color);
    this.props.setJersey(team.color);
    this.props.loadingSelected(true);
    if (this.props.iplTeams[team.name].length > 0) {
      this.props.loadingSelected(false);
      this.props.getTeamSelected(this.props.iplTeams[team.name]);
      this.props.teamsSelected({
        name: team.name,
        players: this.props.iplTeams[team.name]
      });
    } else {
      await teamsDataApiCall(team.name)
        .then(res => {
          this.props.loadingSelected(false);
          this.props.getTeamSelected(res.data);
          this.props.teamsSelected({ name: team.name, players: res.data });
        })
        .catch(err => console.log("error"));
    }
    this.props.history.push("teams");
  }

  teamCard(team) {
    return (
      <Card
        onClick={() => this.handleClick(team)}
        style={{ cursor: "pointer", opacity: "0px" }}
      >
        <CardContent
          className="cards"
          style={{
            height: "300px",
            background: team.color
          }}
        >
          <div
            style={{
              height: "14rem",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <CardMedia>
              <img src={team.image} />
            </CardMedia>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "1.5rem", color: "white", fontWeight: "bold" }}
            >
              {team.shortName}
            </div>
          </div>
          {team.win && (
            <div style={{ textAlign: "center", padding: "15px" }}>
              <div
                style={{
                  background: "hsla(0,0%,7%,.35)",
                  borderRadius: "1000px",
                  textAlign: "left",
                  fontSize: "0.8rem",
                  padding: "0 1rem .4rem",
                  display: "inline-block",
                  color: "#e2d612",
                  fontWeight: "700"
                  // textAlign: "center"
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="15pt"
                  //viewBox="0 0 0 0"
                  width="15pt"
                  id="icn-trophy"
                  fill="yellow"
                  style={{ transform: "translate(0px, 7px)" }}
                >
                  <path
                    d="M10.791 1.334c.042-.417.042-.792.042-1.25H2.5c0 .458 0 .833.041 1.25H0v.416c0 3.709 4.709 6.334 5.834 6.916l-.001 1.418c0 .708-.542 1.25-1.25 1.25h-.834V13h5.834v-1.666h-.834c-.708 0-1.25-.542-1.25-1.25V8.667c1.125-.583 5.834-3.208 5.834-6.916v-.417H10.79zm-9.916.833h1.75c.166 1.875.625 3.209 1.125 4.167-1.334-1.042-2.709-2.5-2.875-4.167zm8.75 4.167c.5-.959.959-2.292 1.125-4.167h1.75c-.209 1.667-1.584 3.125-2.875 4.167z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
                {team.win}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  render() {
    let donationPopupShown = sessionStorage.getItem("donatePopup");
    return (
      <div style={{}}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4} lg={3}>
            {this.teamCard({
              shortName: "Chenai Super Kings",
              name: "CSK",
              color: "linear-gradient(136deg,#fdb913,#f85c00)",
              win: "2010,2011,2018",
              image: process.env.PUBLIC_URL + "/captains/dhoni.png"
            })}
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            {this.teamCard({
              shortName: "Delhi Capitals",
              name: "DC",
              color: "linear-gradient(136deg,#004c93,#0358a7)",
              win: "",
              image: process.env.PUBLIC_URL + "/captains/sreyas_iyer.png"
            })}
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            {this.teamCard({
              shortName: "Kings X1 Punjab",
              name: "KXIP",
              color: "linear-gradient(136deg,#aa4545,#740f0b)",
              win: "",
              image: process.env.PUBLIC_URL + "/captains/kl_rahul.png"
            })}
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            {this.teamCard({
              shortName: "Kolkata Knight Riders",
              name: "KKR",
              color: "linear-gradient(136deg,#70458f,#3d2057)",
              win: "2012,2014",
              image: process.env.PUBLIC_URL + "/captains/dinesh_karthik.png"
            })}
          </Grid>

          <Grid item xs={12} sm={4} lg={3}>
            {this.teamCard({
              shortName: "Mumbai Indians",
              name: "MI",
              color: "linear-gradient(136deg,#005da0,#003a63)",
              win: "2013,2015,2017,2019",
              image: process.env.PUBLIC_URL + "/captains/rohit.png"
            })}
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            {this.teamCard({
              shortName: "Rajasthan Royals",
              name: "RR",
              color: "linear-gradient(136deg,#2d4d9d,#172e5e)",
              win: "2008",
              image: process.env.PUBLIC_URL + "/captains/smith.png"
            })}
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            {this.teamCard({
              shortName: "Royal Challengers Bangalore",
              name: "RCB",
              color: "linear-gradient(136deg,#000,#464646)",
              win: "",
              image: process.env.PUBLIC_URL + "/captains/kohli.png"
            })}
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            {this.teamCard({
              shortName: "Sunrisers Hyderabad",
              name: "SRH",
              color: "linear-gradient(136deg,#fb643e,#b81c25)",
              win: "2016",
              image: process.env.PUBLIC_URL + "/captains/warner.png"
            })}
          </Grid>
        </Grid>
        {this.state.donationPopup && donationPopupShown === "true" && (
          <Popup
            show={this.state.donationPopup}
            title="Fan made Dream11 analysis application"
            content="Donate us and encorage our efforts"
            disagree={() => this.handleDisagree()}
            close={() => this.handleDonatePopup()}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teamSelected: state.dashboard.teamSelected,
    playerSelected: state.dashboard.playerSelected,
    iplTeams: state.teams
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setTeamSelected: data => dispatch({ type: actionTypes.TEAM_SELECT, data }),
    getTeamSelected: data => dispatch({ type: actionTypes.SELECT_TEAM, data }),
    loadingSelected: data => dispatch({ type: actionTypes.LOADING_PAGE, data }),
    teamsSelected: data => dispatch({ type: actionTypes.TEAMS_SELECT, data }),
    setJersey: data => dispatch({ type: actionTypes.SET_JERSEY, data }),
    setPlayerSelected: data =>
      dispatch({ type: actionTypes.PLAYER_SELECT, data })
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Dashboard);
