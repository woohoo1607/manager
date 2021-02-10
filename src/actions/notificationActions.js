import {
  CLOSE_NOTIFICATION,
  OPEN_NOTIFICATION,
} from "../reducers/notificationReducer";

export const openNotification = ({ message = "", variant = "success" }) => {
  return {
    type: OPEN_NOTIFICATION,
    payload: { message, variant },
  };
};

export const closeNotification = () => {
  return {
    type: CLOSE_NOTIFICATION,
  };
};
