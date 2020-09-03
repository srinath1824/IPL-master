import types from "../actions";

const initialState = {
  MI: [],
  RCB: [],
  CSK: [],
  RR: [],
  SRH: [],
  KXIP: [],
  DC: [],
  KKR: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TEAMS_SELECT: {
      return {
        ...state,
        [action.data.name]: action.data.players
      };
    }
  }
  return state;
};
