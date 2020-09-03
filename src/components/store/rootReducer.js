import { combineReducers } from "redux";
import DashboardReducer from "../reducers/dashboardReducer.js";
import TeamsReducer from "../reducers/teamsReducer.js";
import compareReducer from "../reducers/compareReducer.js";

//One root reducer for the whole app. This is done so that the app will have one single reducer to manage lots of other resources.
// And also communication between the reducers will be easier to maintain.

const rootReducer = combineReducers({
  dashboard: DashboardReducer,
  teams: TeamsReducer,
  compare: compareReducer
});

export default rootReducer;
