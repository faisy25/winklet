import * as actionTypes from "../constants/userConstants";
import axios from "axios";

export const setReduxUserState = (userCreated) => (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_USER, payload: userCreated });
};

export const logout = () => (dispatch) => {
  document.location.href = "/login";
  axios.get("/api/logout");
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  localStorage.removeItem("cart");
  dispatch({ type: actionTypes.LOGOUT_USER });
};
