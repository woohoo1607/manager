import {
  TRIGGER_ADD_USER,
  TRIGGER_GET_USER,
  TRIGGER_GET_USERS,
  TRIGGER_REMOVE_USER,
  TRIGGER_UPDATE_USER,
} from "../sagas/usersSagas";
import { removeUnnecessaryUserProperties } from "./actionsHelper";
import { IS_LOADING } from "../reducers/usersReducer";

export const getUsers = () => {
  return {
    type: TRIGGER_GET_USERS,
  };
};

export const addUser = ({ meta, ...user }) => {
  return {
    type: TRIGGER_ADD_USER,
    user: removeUnnecessaryUserProperties(user),
    meta: meta,
  };
};

export const updateUser = (user) => {
  return {
    type: TRIGGER_UPDATE_USER,
    user: removeUnnecessaryUserProperties(user),
  };
};

export const deleteUser = (id) => {
  return {
    type: TRIGGER_REMOVE_USER,
    id,
  };
};

export const getUser = (id) => {
  return {
    type: TRIGGER_GET_USER,
    id,
  };
};

export const setIsLoading = (payload = false) => {
  return {
    type: IS_LOADING,
    payload,
  };
};
