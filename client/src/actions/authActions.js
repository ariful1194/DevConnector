import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register a User

export const registeruser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get user Token

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to Local storage
      const { token } = res.data;
      // Set token to local storage
      localStorage.setItem("jwt_token", token);
      // Set Token to Auth header
      setAuthToken(token);
      // Decode Token to get data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set Logged In User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log out a user

export const logoutUser = () => dispatch => {
  // Remove Token from Local Stroge
  localStorage.removeItem("jwt_token");
  // Remove auth Header from every request
  setAuthToken(false);
  // Set current user to {} and set is authenticated to false
  dispatch(setCurrentUser({}));
};
