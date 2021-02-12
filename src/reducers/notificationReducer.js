export const SEND_NOTIFICATION = "SEND_NOTIFICATION";
export const CLOSE_NOTIFICATION = "CLOSE_NOTIFICATION";

const initialState = {
  isOpen: false,
  message: "",
  variant: "primary",
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEND_NOTIFICATION: {
      return {
        ...state,
        isOpen: true,
        ...payload,
      };
    }
    case CLOSE_NOTIFICATION: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default notificationReducer;
