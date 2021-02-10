export const OPEN_NOTIFICATION = "OPEN_NOTIFICATION";
export const CLOSE_NOTIFICATION = "CLOSE_NOTIFICATION";

const initialState = {
  isOpen: false,
  message: "",
  variant: "primary",
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_NOTIFICATION: {
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
