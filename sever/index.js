const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/team/:name", (req, res) => {
  console.log(req.params);
  let miTeam = [
    { name: "rohit sharma", role: "batsman" },
    { name: "Hardik Pandya", role: "batsman" },
    { name: "Krunal Pandya", role: "batsman" }
  ];
  let cskTeam = [
    { name: "Dhoni", role: "batsman" },
    { name: "Harbajan", role: "batsman" },
    { name: "Bravo", role: "batsman" }
  ];
  if (req.params.name === "CSK") {
    res.send(cskTeam);
  } else if (req.params.name === "MI") {
    res.send(miTeam);
  } else {
    res.send({ ERROR: "PLEASE SEND VALID TEAM IN PARAMS" });
  }
});

app.listen(4000, () => {
  console.log("Server is listining to port 4000");
});
