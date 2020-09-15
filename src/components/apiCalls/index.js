import axios from "axios";
import { SERVER_URL } from "../constants";

function teamsDataApiCall(teamName) {
  return new Promise(async (resolve, reject) => {
    await axios
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
