import { combineReducers } from "redux";

import cart from "./cart/reducer";
import accompaniment from "./accompaniment/reducer";
import auth from "./auth/reducer";
import user from "./user/reducer";

export default combineReducers({
  cart,
  accompaniment,
  auth,
  user,
});
