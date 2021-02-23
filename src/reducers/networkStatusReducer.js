export const UPDATE_NETWORK_STATUS = "UPDATE_NETWORK_STATUS";

const initialState = {
  isOnline: false,
};

const networkStatusReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_NETWORK_STATUS: {
      return {
        ...state,
        isOnline: payload,
      };
    }

    default:
      return state;
  }
};

export default networkStatusReducer;
