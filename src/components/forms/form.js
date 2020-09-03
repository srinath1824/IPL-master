import React, { Component } from "react";
import {
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  Button,
  Divider,
} from "@material-ui/core";
import "./form.css";
import FormControl from "@material-ui/core/FormControl";
import Axios from "axios";
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Alert from "@material-ui/lab/Alert";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerDetails: {
        playerName: "",
        score: "",
        role: "",
        highScore: "",
        franchise: "",
      },
      error: "",
      formSubmited: false,
      vertical: "top",
      horizontal: "left",
    };
  }

  handleChange(e) {
    this.setState({
      playerDetails: {
        ...this.state.playerDetails,
        [e.target.name]: e.target.value,
      },
    });
  }

  Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  handleSubmit() {
    let clearForm = {
      playerName: "",
      score: "",
      role: "",
      highScore: "",
      franchise: "",
    };
    const { error } = this.state;
    let count = 0;
    for (let i in this.state.playerDetails) {
      console.log(this.state.playerDetails);
      if (this.state.playerDetails[i] === "") {
        this.setState({ error: `Please Enter ${i}` });
        count += 1;
      }
    }
    if (count === 0) {
      this.setState({ error: "" });
    }
    console.log("111111111", error);
    if (count === 0) {
      Axios.post("http://localhost:5000/api/savedata", this.state.playerDetails)
        .then((res) => {
          console.log(res);
          this.setState({ playerDetails: clearForm, formSubmited: true });
          this.form.reset();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleBulkUpload() {}

  handleClose() {
    this.setState({ formSubmited: false });
  }

  render() {
    const {
      playerName,
      score,
      role,
      highScore,
      franchise,
    } = this.state.playerDetails;
    const { error, formSubmited, vertical, horizontal } = this.state;
    return (
      <div>
        <Grid container>
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={6}
            style={{ justifyContent: "center" }}
          >
            <div style={{ textAlign: "center" }}>
              <h4>PLAYER DETAILS</h4>
              <p style={{ color: "red" }}>{error}</p>

              <form
                ref={(form) => (this.form = form)}
                className="Container"
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  name="playerName"
                  value={playerName}
                  id="standard-required"
                  label="Player Name"
                  variant="outlined"
                  onChange={(e) => this.handleChange(e)}
                />
                <br />
                <TextField
                  required
                  name="score"
                  id="standard-required"
                  label="Score"
                  value={score}
                  type="number"
                  variant="outlined"
                  onChange={(e) => this.handleChange(e)}
                />
                <br />
                <FormControl style={{ width: "100%" }}>
                  <InputLabel htmlFor="age-native-simple">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    variant="outlined"
                    label="role"
                    name="role"
                    value={role}
                    onChange={(e) => this.handleChange(e)}
                  >
                    <MenuItem value="BatsMan">BatsMan</MenuItem>
                    <MenuItem value="Bowler">Bowler</MenuItem>
                    <MenuItem value="Allrounder">Allrounder</MenuItem>
                    <MenuItem value="WK">WK</MenuItem>
                  </Select>
                  <FormHelperText>{error.role}</FormHelperText>
                </FormControl>
                <br />
                <FormControl style={{ width: "100%" }}>
                  <InputLabel htmlFor="age-native-simple">Franchise</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    variant="outlined"
                    label="franchise"
                    name="franchise"
                    value={franchise}
                    onChange={(e) => this.handleChange(e)}
                  >
                    <MenuItem value="RCB">RCB</MenuItem>
                    <MenuItem value="MI">MI</MenuItem>
                    <MenuItem value="KKR">KKR</MenuItem>
                    <MenuItem value="CSK">CSK</MenuItem>
                    <MenuItem value="SRH">SRH</MenuItem>
                    <MenuItem value="RR">RR</MenuItem>
                    <MenuItem value="DD">DD</MenuItem>
                    <MenuItem value="KXIP">KXIP</MenuItem>
                  </Select>
                  <FormHelperText>{error.franchise}</FormHelperText>
                </FormControl>
                <br />
                <TextField
                  required
                  id="standard-required"
                  label="HighScore"
                  value={highScore}
                  type="number"
                  variant="outlined"
                  name="highScore"
                  onChange={(e) => this.handleChange(e)}
                />
                <br />

                <br />
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.handleSubmit()}
                >
                  Submit
                </Button>
              </form>
            </div>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={5} lg={5} style={{ textAlign: "center" }}>
            <h2>Please Choose file</h2>
            <TextField
              required
              label="Upload Excel file"
              type="file"
              variant="outlined"
              name="highScore"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => this.handleChange(e)}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleBulkUpload()}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        {formSubmited && (
          <Snackbar
            autoHideDuration={3000}
            anchorOrigin={{ vertical, horizontal }}
            open={formSubmited}
            style={{ backgroundColor: "lightgreen", color: "white" }}
            message="Form submitted Successfully"
            key={"top" + "left"}
          >
            <Alert onClose={() => this.handleClose()} severity="success">
              Form submitted Successfully
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  }
}

export default Form;
