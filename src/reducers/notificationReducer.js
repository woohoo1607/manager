export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

const initialState = {
  isOpen: false,
  message: "",
  variant: "primary",
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_NOTIFICATION: {
      return {
        ...state,
        isOpen: true,
        ...payload,
      };
    }
    case HIDE_NOTIFICATION: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default notificationReducer;
