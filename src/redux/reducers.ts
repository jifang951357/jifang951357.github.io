import { combineReducers } from "redux";
import { COMMODITY, SHOPPINGTROLLEY } from "./actions";
import objectAssign = require("object-assign");

function change(state = { commodity: [], shoppingTrolley: [] }, action) {
  switch (action.type) {
    case COMMODITY:
      return objectAssign({}, state, {
        commodity: action.commodity
      });
    case SHOPPINGTROLLEY:
      return objectAssign({}, state, {
        shoppingTrolley: action.shoppingTrolley
      });
    default:
      return state;
  }
}

const counterApp = combineReducers({
  change
});

export default counterApp;
