export const IS_LOADING = "IS_LOADING";

export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";

export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_ERROR = "ADD_USER_ERROR";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";

export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_ERROR = "DELETE_USER_ERROR";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  message: "",
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: payload,
      };
    }
    case ADD_USER_ERROR:
    case DELETE_USER_ERROR:
    case UPDATE_USER_ERROR:
    case GET_USERS_ERROR: {
      return {
        ...state,
        error: payload,
        message: payload.message,
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    default:
      return state;
  }
};

export const getUsers = () => {
  return {
    type: GET_USERS,
  };
};

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

export default usersReducer;
