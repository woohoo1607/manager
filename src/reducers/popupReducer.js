export const OPEN_POPUP = "OPEN_POPUP";
export const CLOSE_POPUP = "CLOSE_POPUP";

const initialState = {
  isOpen: false,
  msg: "",
  variant: "primary",
};

const popupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_POPUP: {
      return {
        ...state,
        isOpen: true,
        ...payload,
      };
    }
    case CLOSE_POPUP: {
      return {
        ...state,
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default popupReducer;
