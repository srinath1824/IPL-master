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

class CompareStats extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { data: chartData } = this.props;

    return (
      <Dialog
        aria-labelledby="customized-dialog-title"
        fullScreen
        open={this.props.show}
        onClose={this.props.close}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Paper>
              <Chart data={chartData}>
                <ArgumentAxis />
                {/* <ValueAxis /> */}
                <Legend
                  position="bottom"
                  rootComponent={Root}
                  labelComponent={Label}
                />
                <BarSeries
                  name={this.props.player1}
                  valueField="player1"
                  argumentField="field"
                  color={this.props.jerseyColors[this.props.team1]}
                />
                <BarSeries
                  name={this.props.player2}
                  valueField="player2"
                  argumentField="field"
                  color={this.props.jerseyColors[this.props.team2]}
                />
                <Animation />
                <Title
                  text={`${this.props.player1} vs ${this.props.player2}`}
                />
                <Stack />
                <EventTracker />
                <Tooltip />
              </Chart>
            </Paper>
          </DialogContentText>
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
