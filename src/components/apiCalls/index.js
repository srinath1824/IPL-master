import axios from "axios";
require("dotenv").config();

function teamsDataApiCall(teamName) {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`${process.env.SERVER_URL}/api/getdata/${teamName}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { teamsDataApiCall };
