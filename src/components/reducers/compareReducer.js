import types from "../actions";

const initialState = {
  team1: "",
  team2: "",
  player1: "",
  player2: "",
  colors: {
    CSK: "#fdb913",
    DC: "#004c93",
    KXIP: "#aa4545",
    KKR: "#70458f",
    MI: "#005da0",
    RR: "#2d4d9d",
    RCB: "#000",
    SRH: "#fb643e",
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.TEAM_SELECT: {
      return {
        ...state,
        [action.data.name]: action.data.value,
      };
    }
  }

  return state;
};
