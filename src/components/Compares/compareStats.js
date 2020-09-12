import React from "react";
import { Dialog, DialogTitle, Grid } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Stack, Animation } from "@devexpress/dx-react-chart";

const data = [
  { year: "Matches", population: 2.525 },
  { year: "1960", population: 3.018 },
  { year: "1970", population: 3.682 },
  { year: "1980", population: 4.44 },
  { year: "1990", population: 5.31 },
  { year: "2000", population: 6.127 },
  { year: "2010", population: 6.93 },
];

function CompareStats(props) {
  //   const [data, setData] = React.useState();
  //   setData(data);
  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={props.show}
        onClose={props.close}
      >
        {/* <DialogTitle id="customized-dialog-title"></DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Paper>
              <Chart data={data}>
                <ArgumentAxis />
                <ValueAxis max={7} />

                <BarSeries valueField="population" argumentField="year" />
                <Title text={`${props.player1} VS ${props.player2}`} />
                <Animation />
              </Chart>
            </Paper>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary" autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CompareStats;
