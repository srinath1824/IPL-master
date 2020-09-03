import types from "../actions";

const initialState = {
  teamSelected: "",
  playerSelected: "",
  jersey: "",
  team: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TEAM_SELECT: {
      return {
        ...state,
        teamSelected: action.data
      };
    }
    case types.SELECT_TEAM: {
      return {
        ...state,
        team: action.data
      };
    }
    case types.LOADING_PAGE: {
      return {
        ...state,
        loading: action.data
      };
    }
    case types.SET_JERSEY: {
      return {
        ...state,
        jersey: action.data
      };
    }
    case types.PLAYER_SELECT: {
      return {
        ...state,
        playerSelected: action.data
      };
    }
  }
  return state;
};
