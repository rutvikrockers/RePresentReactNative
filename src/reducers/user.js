import {
  LOGIN,
  LOGOUT,
  GUEST_TOKEN
} from '../actions/actionTypes';

export default function (state = {
  loggedIn: false,
  email: null,
  _id: null,
  msg:null
}, {type, payload}) {
  switch (type) {
    case LOGIN: {

      return {
        ...state,
        ...payload,
        msg: payload.msg,
        loggedIn: true
       
      };
      
    }

    case LOGOUT: {
      return {
        ...state,
        email: null,
        token: null,
        _id: null,
        loggedIn: false
      }
    }

    case GUEST_TOKEN: {
      return {
        ...state,
        guestToken: payload
      }
    }
    
    default: {
      return state;
    }
  }
}
