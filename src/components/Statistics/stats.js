import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Grid, Container } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import actionTypes from "../actions";
import axios from "axios";
import { SERVER_URL } from "../constants";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  head: {
    backgroundColor: "black",
    color: "white",
  },
  container: {
    maxHeight: 440,
  },
  table: {
    //minWidth: 700,
    //tableLayout: "fixed",
  },
});

function Stats(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [rows, setRows] = React.useState([]);
  const [selectTeam, setSelectTeam] = React.useState("");

  const columns = [
    { id: "Player Name", label: "Player Name" },
    { id: "Role", label: "Role" },
    { id: "Dream11 Points", label: "Dream11 Points Average" },
  ];

  function createData(name, role, points) {
    return { "Player Name": name, Role: role, "Dream11 Points": points };
  }

  const DropDown = ({ value, change: handleChange, name, label, disabled }) => (
    <Select
      label={label}
      name={name}
      value={selectTeam}
      disabled={disabled}
      style={{ width: "100%" }}
      onChange={(e) => handleChange(e)}
    >
      {value}
    </Select>
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const changeHandler = async (e) => {
    setSelectTeam(e.target.value);
    let pointsTableData = [];
    if (
      props.teamsData[e.target.value] &&
      !props.teamsData[e.target.value].length > 0
    ) {
      //api call
      await axios
        .get(`${SERVER_URL}/api/getdata/${e.target.value}`)
        .then((res) => {
          props.setTeamData({
            name: e.target.value,
            role: e.target.value,
            players: res.data,
          });
          pointsTableData =
            res.data &&
            res.data.map((d) => {
              return createData(
                d.playerName,
                d.role,
                d["Dream11"] / d.matches.length
                  ? d["Dream11"] / d.matches.length
                  : 0
              );
            });
          pointsTableData.sort(
            (x, y) => y["Dream11 Points"] - x["Dream11 Points"]
          );
          setRows(pointsTableData);
        })
        .catch((err) => console.log("error"));
    } else {
      pointsTableData =
        props.teamsData[e.target.value] &&
        props.teamsData[e.target.value].map((d) => {
          return createData(
            d.playerName,
            d.role,
            d["Dream11"] ? d["Dream11"] : 0
          );
        });
      pointsTableData.sort((x, y) => y["Dream11 Points"] - x["Dream11 Points"]);
      setRows(pointsTableData);
    }
  };

  let teams =
    props.teamsData &&
    Object.keys(props.teamsData).map((team) => {
      return <MenuItem value={team}>{team}</MenuItem>;
    });

  return (
    <Container maxWidth="md">
      <div
        style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}
      >
        Dream11 Points table
      </div>
      <Grid container style={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={4} lg={3} />
        <Grid
          item
          xs={12}
          sm={4}
          lg={3}
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Select Team</InputLabel>
            <DropDown
              name="team"
              label="Select Team1"
              value={teams}
              change={(e) => changeHandler(e)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} lg={3} />
      </Grid>
      <br />
      {rows && rows.length > 0 && (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table className={classes.table} aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      className={classes.head}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    teamsData: state.teams,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setTeamUpdate: (data) => dispatch({ type: actionTypes.TEAM_SELECT, data }),
    setTeamData: (data) => dispatch({ type: actionTypes.TEAMS_SELECT, data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
