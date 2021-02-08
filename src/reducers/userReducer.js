export const ADD_ACCOUNT_DATA = "ADD_ACCOUNT_DATA";
export const GET_USER_DATA = "GET_USER_DATA";
export const CLEAR_USER_STATE = "CLEAR_USER_STATE";

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
    case ADD_ACCOUNT_DATA: {
      if (payload.hasOwnProperty("phones")) {
        payload.phones = payload.phones.filter((phone) => phone.length > 0);
      }
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
    default:
      return state;
  }
};

export default userReducer;
