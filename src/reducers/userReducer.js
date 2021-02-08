export const ADD_ACCOUNT_DATA = "ADD_ACCOUNT_DATA";
export const GET_USER_DATA = "GET_USER_DATA";

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
    default:
      return state;
  }
};

export default userReducer;
