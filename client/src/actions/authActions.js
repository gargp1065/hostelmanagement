import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  // console.log(userData)
  axios
    .post("/api/users/register", userData)
    .then(res => {
      // console.log(res)
      history.push("/login")
    } )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      // console.log(res)
      // save to localstorage
      const { token } = res.data;
      // console.log(token);
      // set token to localstorage
      localStorage.setItem("jwtToken", token);
      // set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      // console.log(decoded);
      dispatch(setCurrentUser(decoded));

    })
    .catch(err =>
      {
        console.log(err.response);
        dispatch({
          type: GET_ERRORS,
          payload: err.response
        })
      }
      
    );
};

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log out user
export const logoutUser = history => dispatch => {
  // remove token from localstorage
  localStorage.removeItem("jwtToken");
  // reomve auth header for future requests
  setAuthToken(false);
  // set current user to {} and isAuthenticated to false
  dispatch(setCurrentUser({}));
  if (history) history.push("/login");
  else window.location.href = "/login";
};

// Get current User data
export const getCurrentUser = () => dispatch => {
  axios
    .post("api/users/current")
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
