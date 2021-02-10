export const ADD_ACCOUNT_DATA = "ADD_ACCOUNT_DATA";
export const ADD_ACCOUNT_DATA_SUCCESS = "ADD_ACCOUNT_DATA_SUCCESS";
export const GET_USER_DATA = "GET_USER_DATA";
export const CLEAR_USER_STATE = "CLEAR_USER_STATE";

export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";

const initialState = {
  avatar: null,
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  email: "",
  address: "",
  gender: "",
  company: "",
  github: "",
  facebook: "",
  language: "",
  fax: "",
  phones: [],
  skills: [],
  information: "",
  hobbies: [],
  allowedUnsubmittedStep: 0,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ACCOUNT_DATA_SUCCESS: {
      return {
        ...state,
        ...payload,
      };
    }
    case CLEAR_USER_STATE: {
      return {
        ...state,
        ...initialState,
      };
    }
    case ADD_USER_SUCCESS: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
