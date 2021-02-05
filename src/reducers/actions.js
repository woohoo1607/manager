import { ADD_USER, DELETE_USER, GET_USERS, UPDATE_USER } from "./usersReducer";
import { ADD_ACCOUNT_DATA, GET_USER_DATA } from "./userReducer";

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
