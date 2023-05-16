import {
  SEND_REGISTRATION_REQUEST,
  SEND_REGISTRATION_SUCCSESS,
  SEND_REGISTRATION_ERROR,
} from "../actions/authorization";

const initialState = {
  name: "",
  email: "",
  pass: "",
  regRequest: false,
  regError: false,
};

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_REGISTRATION_REQUEST: {
      return { ...state, regRequest: true, regSuccsess: false };
    }
    case SEND_REGISTRATION_SUCCSESS: {
      return {
        ...state,
        name: data.user.name,
        email: data.user.email,
        regRequest: false,
      };
    }
    case SEND_REGISTRATION_ERROR: {
      return { ...state, regRequest: false, regError: true };
    }
    default: {
      return state;
    }
  }
};
