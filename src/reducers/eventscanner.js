import {UPDATE_SCANNER_VIEW} from '../actions/actionTypes';
  
  export default function (state = {
    status:null,
  }, {type, payload}) {
    switch (type) {
      case UPDATE_SCANNER_VIEW: {
        return {
          ...state,
          ...payload,
          status:payload.status
        }; 
      }
      default: {
        return state;
      }
    }
  }
  