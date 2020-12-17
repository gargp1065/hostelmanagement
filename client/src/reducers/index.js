import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import staffReducer from './staffReducer';


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  staffData: staffReducer

});
