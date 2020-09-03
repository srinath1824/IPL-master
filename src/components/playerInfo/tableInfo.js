import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function TableInfo(props) {
  const classes = useStyles();
  let tableColsBat = [
    "Date",
    "Matches",
    "Score",
    "Balls",
    "SR",
    "4s",
    "6s",
    "Wicket"
  ];
  let tableColsBowl = [
    "Date",
    "Overs",
    "Runs",
    "Wickets",
    "Maiden",
    "Eco",
    "Catches",
    "Stumps"
  ];

  let tableData = [];
  let tableColumns =
    props.name === "bat"
      ? tableColsBat.map(c => <StyledTableCell>{c}</StyledTableCell>)
      : tableColsBowl.map(c => <StyledTableCell>{c}</StyledTableCell>);

  tableData =
    props.data &&
    props.data.map(d => {
      return Object.values(d);
    });

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>{tableColumns}</TableRow>
        </TableHead>
        {tableData.length !== 0 ? (
          <TableBody>
            {tableData.map(x => (
              <StyledTableRow>
                {x.map(d => (
                  <StyledTableCell>{d}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>No Data Found</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
