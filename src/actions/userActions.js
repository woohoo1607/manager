import {
  DELETE_USER,
  GENERATE_USERS,
  GET_USERS,
  UPDATE_USER,
} from "../reducers/usersReducer";
import {
  ADD_ACCOUNT_DATA,
  ADD_USER,
  CLEAR_USER_STATE,
  GET_USER_DATA,
} from "../reducers/userReducer";

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

export const addUser = ({ meta, ...user }) => {
  return {
    type: ADD_USER,
    user: removeUnnecessaryUserProperties(user),
    meta: meta,
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

export const addAccountData = ({ meta, ...userData }) => {
  if (Object.prototype.hasOwnProperty.call(userData, "phones")) {
    userData.phones = userData.phones.filter((phone) => phone.length > 0);
  }
  return { type: ADD_ACCOUNT_DATA, userData, meta };
};

export const getUserData = (id) => {
  return {
    type: GET_USER_DATA,
    id,
  };
};

export const clearUserState = () => ({
  type: CLEAR_USER_STATE,
});

export const generateRandomUsers = (count) => ({
  type: GENERATE_USERS,
  count,
});
