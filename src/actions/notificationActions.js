import {
  HIDE_NOTIFICATION,
  SHOW_NOTIFICATION,
} from "../reducers/notificationReducer";

export const showNotification = ({ message = "", variant = "primary" }) => {
  return {
    type: SHOW_NOTIFICATION,
    payload: { message, variant },
  };
};

export const showErrorNotification = ({ message = "" }) => {
  return {
    type: SHOW_NOTIFICATION,
    payload: { message, variant: "error" },
  };
};

export const showSuccessNotification = ({ message = "" }) => {
  return {
    type: SHOW_NOTIFICATION,
    payload: { message, variant: "success" },
  };
};

export const hideNotification = () => {
  return {
    type: HIDE_NOTIFICATION,
  };
};
