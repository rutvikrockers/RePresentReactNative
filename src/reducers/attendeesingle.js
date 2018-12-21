import {
    UPDATE_ATTENDEE_SINGLE
  } from '../actions/actionTypes';
  
  export default function (state = {
    status:null
  }, {type, payload}) {
    switch (type) {
      case UPDATE_ATTENDEE_SINGLE: {
        
        return {
          ...state,
          ...payload,
          status: payload.status
         
        };
      }
  
    
  
      default: {
        return state;
      }
    }
  }
  