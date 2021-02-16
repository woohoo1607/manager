export const IS_LOADING = "IS_LOADING";

export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";

export const UPDATE_USER = "UPDATE_USER";

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  error: null,
  message: "",
  pages: 1,
  currentPage: 1,
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS: {
      return {
        ...state,
        ...payload,
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
    default:
      return state;
  }
};

export default usersReducer;
