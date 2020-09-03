import React, { Component } from "react";
import { Grid, Container } from "@material-ui/core";
import FlightIcon from "@material-ui/icons/Flight";
import CopyrightIcon from "@material-ui/icons/Copyright";

class CompareCard extends Component {
  render() {
    let filteredData =
      this.props.teamsData &&
      this.props.teamsData[this.props.team].find(
        a => a.playerName === this.props.name
      );
    return (
      <Container fixed>
        <Grid container>
          <Grid item xs={12} sm={12} lg={12}>
            {filteredData && (
              <img src={`/Teams/${this.props.team}/${this.props.name}.png`} />
            )}
            {filteredData && filteredData.overseas && (
              <FlightIcon style={{ transform: "translate(0px, -150px)" }} />
            )}
            {filteredData && filteredData.Captain && (
              <CopyrightIcon
                color="primary"
                style={{ transform: "translate(0px, -150px)" }}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            lg={12}
            // style={{ textAlign: "center", marginTop: "80px" }}
          >
            {filteredData && (
              <strong>
                {filteredData.playerName}&nbsp;&nbsp;(
                {this.props.team})
              </strong>
            )}
            <div>{filteredData && filteredData.role}</div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default CompareCard;
