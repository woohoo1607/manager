export const IS_LOADING = "IS_LOADING";

export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";

export const UPDATE_USER = "UPDATE_USER";

export const CREATE_ERROR = "CREATE_ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  error: null,
  messageError: "",
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS: {
      return {
        ...state,
        users: payload,
      };
    }
    case GET_USER:
    case UPDATE_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case CREATE_ERROR: {
      return {
        ...state,
        error: payload.error,
        messageError: payload.messageError,
      };
    }
    case REMOVE_ERROR: {
      return {
        ...state,
        error: null,
        messageError: "",
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
