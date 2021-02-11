export const IS_LOADING = "IS_LOADING";

export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  message: "",
  pages: 0,
  currentPage: 1,
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        ...payload,
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

export default usersReducer;
