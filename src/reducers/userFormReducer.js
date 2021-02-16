export const GET_USER_FORM = "GET_USER_FORM";

export const UPDATE_USER_FORM = "UPDATE_USER_FORM";

export const REMOVE_USER_FORM = "REMOVE_USER_FORM";

export const UPDATE_AVAILABLE_STATUS = "UPDATE_AVAILABLE_STATUS";

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
  isAvailable: false,
};

const userFormReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_FORM:
    case UPDATE_USER_FORM: {
      return {
        ...state,
        user: { ...payload },
      };
    }
    case UPDATE_AVAILABLE_STATUS: {
      return {
        ...state,
        isAvailable: payload,
      };
    }
    case REMOVE_USER_FORM: {
      return initialState;
    }
    default:
      return state;
  }
};

export default userFormReducer;
