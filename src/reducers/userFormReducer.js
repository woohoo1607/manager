export const UPDATE_USER_FORM = "UPDATE_USER_FORM";
export const REMOVE_USER_FORM = "REMOVE_USER_FORM";

export const UPDATE_AVAILABLE_STATUS = "UPDATE_AVAILABLE_STATUS";

export const CREATE_FIELDS_ERRORS = "CREATE_FIELDS_ERRORS";

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
    slug: "",
  },
  isAvailable: false,
  fieldsErrors: [],
};

const userFormReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_FORM: {
      return {
        ...state,
        user: { ...payload },
        fieldsErrors: initialState.fieldsErrors,
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
    case CREATE_FIELDS_ERRORS: {
      return {
        ...state,
        fieldsErrors: [...payload],
      };
    }
    default:
      return state;
  }
};

export default userFormReducer;
