import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter, Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {/* <img
              style={{ width: "150px", height: "auto" }}
              src="https://resources.platform.iplt20.com/IPL/photo/2018/05/13/445a4aab-3450-48d6-a0c1-5b56a78ddef5/logo.jpg"
              alt="logo"
            /> */}
            <Link style={{ color: "white", textDecoration: "none" }} to="/">
              Home
            </Link>
            <Link
              style={{
                color: "white",
                textDecoration: "none",
                marginLeft: "20px"
              }}
              to="/Compare"
            >
              Compare
            </Link>
            {/* <Link
              style={{
                color: "white",
                textDecoration: "none",
                marginLeft: "20px"
              }}
              to="/"
            >
              Stats
            </Link>
            <Link
              style={{
                color: "white",
                textDecoration: "none",
                marginLeft: "20px"
              }}
              to="//www.dream11.com"
            >
              Dream11
            </Link>
            <Link
              style={{
                color: "white",
                textDecoration: "none",
                marginLeft: "20px"
              }}
              to="/Donate"
            >
              Donate
            </Link> */}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
