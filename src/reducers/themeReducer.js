export const UPDATE_THEME = "UPDATE_THEME";

const initialState = {
  isDarkMode: false,
};

const themeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_THEME: {
      return {
        ...state,
        isDarkMode: payload,
      };
    }
    default:
      return state;
  }
};

export default themeReducer;
