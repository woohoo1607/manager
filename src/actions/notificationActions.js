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

export const showErrorNotification = ({ message = "" }) =>
  showNotification({ message, variant: "error" });

export const showSuccessNotification = ({ message = "" }) =>
  showNotification({ message, variant: "success" });

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});
