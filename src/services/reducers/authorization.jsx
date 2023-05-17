import {
  SEND_REGISTRATION_REQUEST,
  SEND_REGISTRATION_SUCCSESS,
  SEND_REGISTRATION_ERROR,
  FORGOT_PASS_SEND_EMAIL_REQUEST,
  FORGOT_PASS_SEND_EMAIL_SUCCSESS, 
  FORGOT_PASS_SEND_EMAIL_ERROR
} from "../actions/authorization";

const initialState = {
  name: "",
  email: "",
  pass: "",
  regRequest: false,
  regError: false,
  forgotPassEmailSendRequest:false,
  forgotPassEmailSendSuccsess:false,
  forgotPassEmailSendError:false,
};

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_REGISTRATION_REQUEST: {
      return { ...state, regRequest: true, regSuccsess: false };
    }
    case SEND_REGISTRATION_SUCCSESS: {
      return {
        ...state,
        name: action.data.user.name,
        email: action.data.user.email,
        regRequest: false,
      };
    }
    case SEND_REGISTRATION_ERROR: {
      return { ...state, regRequest: false, regError: true };
    }
case FORGOT_PASS_SEND_EMAIL_REQUEST: {
  return {...state, forgotPassEmailSendRequest: true, forgotPassEmailSendSuccsess:false, forgotPassEmailSendError:false}
}
case FORGOT_PASS_SEND_EMAIL_SUCCSESS:{
  return {...state, forgotPassEmailSendRequest: false, forgotPassEmailSendSuccsess:true, forgotPassEmailSendError:false}
}
case FORGOT_PASS_SEND_EMAIL_ERROR:{
  return {...state, forgotPassEmailSendRequest: false, forgotPassEmailSendSuccsess:false, forgotPassEmailSendError:true}
}


    default: {
      return state;
    }
  }
};
