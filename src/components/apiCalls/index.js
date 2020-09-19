import axios from "axios";
import { SERVER_URL } from "../constants";

function teamsDataApiCall(teamName) {
  const promise = new Promise((resolve, reject) => {
    axios
      .get(`${SERVER_URL}/api/getdata/${teamName}`, 
        {headers: {
           "Access-Control-Allow-Origin": '*' ,
           'Content-Type': 'application/json',
           "Access-Control-Allow-Headers": "X-Requested-With"
        }})
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
}

export { teamsDataApiCall };
