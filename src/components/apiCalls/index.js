import axios from "axios";

function teamsDataApiCall(teamName) {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`http://192.168.0.5:5000/api/getdata/${teamName}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { teamsDataApiCall };
