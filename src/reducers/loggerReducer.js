export const UPDATE_LOGGER_EVENTS = "UPDATE_LOGGER_EVENTS";

const initialState = {
  events: [],
  awaitingDispatch: [],
};

const loggerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_LOGGER_EVENTS: {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};

export default loggerReducer;
