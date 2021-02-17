import {
  TRIGGER_ADD_USER,
  TRIGGER_GENERATE_USERS,
  TRIGGER_GET_USER,
  TRIGGER_GET_USERS,
  TRIGGER_REMOVE_USER,
  TRIGGER_UPDATE_USER,
} from "../sagas/usersSagas";
import { removeUnnecessaryUserProperties } from "./actionsHelper";
import { IS_LOADING } from "../reducers/usersReducer";

export const getUsers = () => ({
  type: TRIGGER_GET_USERS,
});

export const addUser = ({ meta, ...user }) => ({
  type: TRIGGER_ADD_USER,
  user: removeUnnecessaryUserProperties(user),
  meta: meta,
});

export const updateUser = (user) => ({
  type: TRIGGER_UPDATE_USER,
  user: removeUnnecessaryUserProperties(user),
});

export const deleteUser = (id) => ({
  type: TRIGGER_REMOVE_USER,
  id,
});

export const getUser = (id) => ({
  type: TRIGGER_GET_USER,
  id,
});

export const setIsLoading = (payload = false) => ({
  type: IS_LOADING,
  payload,
});

export const generateUsers = (count) => ({
  type: TRIGGER_GENERATE_USERS,
  count,
});
