import {
  TRIGGER_CHECK_USER_FORM,
  TRIGGER_GET_USER_FORM,
  TRIGGER_REMOVE_USER_FORM,
  TRIGGER_UPDATE_USER_FORM,
} from "../sagas/userFormSaga";
import { REMOVE_USER_FORM } from "../reducers/userFormReducer";

export const getUserForm = ({ meta }) => {
  return {
    type: TRIGGER_GET_USER_FORM,
    meta,
  };
};

export const checkUserForm = () => {
  return {
    type: TRIGGER_CHECK_USER_FORM,
  };
};

export const updateUserForm = ({ meta, ...userData }) => {
  if (Object.prototype.hasOwnProperty.call(userData, "phones")) {
    userData.phones = userData.phones.filter((phone) => phone.length > 0);
  }
  return { type: TRIGGER_UPDATE_USER_FORM, userData, meta };
};

export const removeUserForm = () => ({
  type: TRIGGER_REMOVE_USER_FORM,
});

export const clearUserFormState = () => ({
  type: REMOVE_USER_FORM,
});
