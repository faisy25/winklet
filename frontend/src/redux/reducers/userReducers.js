import * as actionTypes from "../constants/userConstants";

export const userRegisterLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        userInfo: action.payload
      };
    case actionTypes.LOGOUT_USER:
      return {};
    default:
      return state;
  }
};
