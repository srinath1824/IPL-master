import types from "../actions";

const initialState = {
  team1: "",
  team2: "",
  player1: "",
  player2: ""
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.TEAM_SELECT: {
      return {
        ...state,
        [action.data.name]: action.data.value
      };
    }
  }

  return state;
};
