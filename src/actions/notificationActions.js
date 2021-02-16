import {
  CLOSE_NOTIFICATION,
  SEND_NOTIFICATION,
} from "../reducers/notificationReducer";

export const sendNotification = ({ message = "", variant = "success" }) => {
  return {
    type: SEND_NOTIFICATION,
    payload: { message, variant },
  };
};

export const sendErrorNotification = ({ message = "" }) => {
  return {
    type: SEND_NOTIFICATION,
    payload: { message, variant: "error" },
  };
};

export const closeNotification = () => {
  return {
    type: CLOSE_NOTIFICATION,
  };
};
