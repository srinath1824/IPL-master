import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SERVER_URL } from "../constants";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    //minWidth: 700,
    //tableLayout: "fixed",
  },
});

function PointsTable() {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setOpen(true);
    axios
      .get(`${SERVER_URL}/api/getPointsTable`)
      .then((res) => {
        let tableData =
          res &&
          res.data &&
          res.data[0]["Points Table"].map((data) => {
            return data;
          });
        setRows(tableData);
        setOpen(false);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, []);

  return (
    <div>
      {rows && rows.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Team</StyledTableCell>
                <StyledTableCell>Played</StyledTableCell>
                <StyledTableCell>Won</StyledTableCell>
                <StyledTableCell>Lost</StyledTableCell>
                <StyledTableCell>Points</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .sort((x, y) => y.Points - x.Points)
                .map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell>{row.Team}</StyledTableCell>
                    <StyledTableCell>{row.Played}</StyledTableCell>
                    <StyledTableCell>{row.Won}</StyledTableCell>
                    <StyledTableCell>{row.Lost}</StyledTableCell>
                    <StyledTableCell>{row.Points}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default PointsTable;
