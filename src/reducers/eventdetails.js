import camelize from 'camelcase-keys';
import { DETAIL_LIST_EVENT } from '../actions/actionTypes';
export default function (state = {
    event: {},
   
  }, {type, payload}) {
    switch (type) {

      case DETAIL_LIST_EVENT: {
        
        return {
          ...state,
          event: payload.event,
         
        }
      }
  
      default: {
        return state;
      }
    }
  }






