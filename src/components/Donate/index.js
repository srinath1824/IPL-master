import React, { Component } from "react";
import { Grid, Container } from "@material-ui/core";

class Donate extends Component {
  render() {
    return (
      <Container maxWidth="md">
        <h1>Donate us</h1>
        <Grid container>
          <Grid item xs={12} md={4} lg={4}>
            <img src="/payment/google_pay.png" width="200px" height="200px" />
            <h3 style={{ textAlign: "center" }}>Gpay</h3>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <img src="/payment/phonepe.jpg" width="200px" height="200px" />
            <h3 style={{ textAlign: "center" }}>Phonepe</h3>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <img src="/payment/paytm.jpg" width="200px" height="200px" />
            <h3 style={{ textAlign: "center" }}>Paytm</h3>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default Donate;
