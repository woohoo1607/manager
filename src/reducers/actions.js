import { ADD_USER, DELETE_USER, GET_USERS, UPDATE_USER } from "./usersReducer";
import {
  ADD_ACCOUNT_DATA,
  CLEAR_USER_STATE,
  GET_USER_DATA,
} from "./userReducer";
import { CLOSE_POPUP, OPEN_POPUP } from "./popupReducer";

const removeUnnecessaryUserProperties = (user) => {
  const newUser = { ...user };
  delete newUser.repeatPassword;
  delete newUser.allowedUnsubmittedStep;
  newUser.lastUpdate = new Date();
  return newUser;
};

export const getUsers = () => {
  return {
    type: GET_USERS,
  };
};

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user: removeUnnecessaryUserProperties(user),
  };
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user: removeUnnecessaryUserProperties(user),
  };
};

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    id,
  };
};

export const addAccountData = (payload) => {
  return { type: ADD_ACCOUNT_DATA, payload };
};

export const getUserData = (id) => {
  return {
    type: GET_USER_DATA,
    id,
  };
};

export const openPopUp = ({ msg = "", variant = "success" }) => {
  return {
    type: OPEN_POPUP,
    payload: { msg, variant },
  };
};

export const closePopUp = () => {
  return {
    type: CLOSE_POPUP,
  };
};

export const clearUserState = () => ({
  type: CLEAR_USER_STATE,
});
