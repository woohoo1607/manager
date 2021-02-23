export const UPDATE_NETWORK_STATUS = "UPDATE_NETWORK_STATUS";
export const UPDATE_LAST_CONNECTION = "UPDATE_LAST_CONNECTION";
export const UPDATE_SYNCHRONIZATION_STATUS = "UPDATE_SYNCHRONIZATION_STATUS";
export const UPDATE_UNSYNCHRONIZED_DATA_STATUS =
  "UPDATE_UNSYNCHRONIZED_DATA_STATUS";

const initialState = {
  isOnline: false,
  isUnsynchronizedData: false,
  isSynchronization: false,
  lastSuccessConnection: null,
};

const networkStatusReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_NETWORK_STATUS: {
      return {
        ...state,
        isOnline: payload,
      };
    }
    case UPDATE_LAST_CONNECTION: {
      return {
        ...state,
        lastSuccessConnection: payload,
      };
    }
    case UPDATE_SYNCHRONIZATION_STATUS: {
      return {
        ...state,
        isSynchronization: payload,
      };
    }
    case UPDATE_UNSYNCHRONIZED_DATA_STATUS: {
      return {
        ...state,
        isUnsynchronizedData: payload,
      };
    }

    default:
      return state;
  }
};

export default networkStatusReducer;
