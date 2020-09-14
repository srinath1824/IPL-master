import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import { Dialog, DialogTitle, Grid } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { EventTracker } from "@devexpress/dx-react-chart";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap",
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

const Stats = (props) => {
  return (
    <Paper>
      <Chart data={props.chartData}>
        <ArgumentAxis />
        <ValueAxis />
        <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
        <BarSeries
          name={props.player1}
          valueField="player1"
          argumentField="field"
          color={props.jerseyColors[props.team1]}
        />
        <BarSeries
          name={props.player2}
          valueField="player2"
          argumentField="field"
          color={props.jerseyColors[props.team2]}
        />
        <Animation />
        <Title text={`${props.player1} vs ${props.player2}`} />
        <EventTracker />
        <Tooltip />
        <Stack />
      </Chart>
    </Paper>
  );
};

class CompareStats extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data: chartData,
      player1,
      player2,
      jerseyColors,
      team1,
      team2,
    } = this.props;

    let batStats = chartData.slice(0, 5);
    let bowlStats = chartData.slice(5);
    return (
      <Dialog
        aria-labelledby="customized-dialog-title"
        fullScreen
        open={this.props.show}
        onClose={this.props.close}
      >
        <DialogContent>
          <Stats
            chartData={batStats}
            player1={player1}
            player2={player2}
            team1={team1}
            team2={team2}
            jerseyColors={jerseyColors}
          />
          <Stats
            chartData={bowlStats}
            player1={player1}
            player2={player2}
            team1={team1}
            team2={team2}
            jerseyColors={jerseyColors}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.close}
            autoFocus
            variant="contained"
            color="secondary"
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    jerseyColors: state.compare.colors,
    team1: state.compare.team1,
    team2: state.compare.team2,
    player1: state.compare.player1,
    player2: state.compare.player2,
    teamData: state.teams,
  };
}

export default compose(
  connect(mapStateToProps, null),
  withRouter
)(CompareStats);
