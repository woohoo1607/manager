import { ADD_ACCOUNT_DATA } from "./actionTypes";

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
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ACCOUNT_DATA: {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
