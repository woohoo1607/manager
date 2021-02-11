export const ADD_ACCOUNT_DATA = "ADD_ACCOUNT_DATA";
export const ADD_ACCOUNT_DATA_SUCCESS = "ADD_ACCOUNT_DATA_SUCCESS";

export const GET_USER_DATA = "GET_USER_DATA";

export const CLEAR_USER_STATE = "CLEAR_USER_STATE";

export const GET_TEMP_USER_DATA = "GET_TEMP_USER_DATA";
export const GET_TEMP_USER_DATA_SUCCESS = "GET_TEMP_USER_DATA_SUCCESS";

export const REMOVE_TEMP_USER_DATA = "REMOVE_TEMP_USER_DATA";
export const REMOVE_TEMP_USER_DATA_SUCCESS = "REMOVE_TEMP_USER_DATA_SUCCESS";

export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";

const initialState = {
  user: {
    id: null,
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
  },
  unsavedData: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ACCOUNT_DATA_SUCCESS: {
      return {
        ...state,
        user: { ...payload },
      };
    }
    case GET_TEMP_USER_DATA_SUCCESS: {
      return {
        ...state,
        unsavedData: payload,
      };
    }
    case CLEAR_USER_STATE: {
      return {
        ...initialState,
      };
    }
    case ADD_USER_SUCCESS: {
      return {
        ...initialState,
      };
    }
    case REMOVE_TEMP_USER_DATA_SUCCESS: {
      return {
        ...state,
        unsavedData: null,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
