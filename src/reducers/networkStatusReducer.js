export const UPDATE_NETWORK_STATUS = "UPDATE_NETWORK_STATUS";
export const UPDATE_SYNCHRONIZATION_STATUS = "UPDATE_SYNCHRONIZATION_STATUS";

const initialState = {
  isOnline: false,
  isSynchronization: false,
};

const networkStatusReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_NETWORK_STATUS: {
      return {
        ...state,
        isOnline: payload,
      };
    }
    case UPDATE_SYNCHRONIZATION_STATUS: {
      return {
        ...state,
        isSynchronization: payload,
      };
    }
    default:
      return state;
  }
};

export default networkStatusReducer;
