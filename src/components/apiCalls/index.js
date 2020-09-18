import axios from "axios";
import { SERVER_URL } from "../constants";

function teamsDataApiCall(teamName) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${SERVER_URL}/api/getdata/${teamName}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { teamsDataApiCall };
