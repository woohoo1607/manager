export const UPDATE_USER_FORM = "UPDATE_USER_FORM";
export const REMOVE_USER_FORM = "REMOVE_USER_FORM";

export const UPDATE_AVAILABLE_STATUS = "UPDATE_AVAILABLE_STATUS";

export const CREATE_FIELD_ERROR = "CREATE_FIELD_ERROR";

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
  fieldError: {
    fieldName: "",
    error: "",
  },
};

const userFormReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_FORM: {
      return {
        ...state,
        user: { ...payload },
        fieldError: initialState.fieldError,
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
    case CREATE_FIELD_ERROR: {
      return {
        ...state,
        fieldError: payload,
      };
    }
    default:
      return state;
  }
};

export default userFormReducer;
