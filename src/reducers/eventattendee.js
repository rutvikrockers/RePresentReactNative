import camelize from 'camelcase-keys';

import { UPDATE_EVENT_ATTENDEE } from '../actions/actionTypes';
export default function (state = {
    msg: [],
  }, {type, payload}) {
    switch (type) {

      case UPDATE_EVENT_ATTENDEE: {
        
        return {
          ...state,
          msg: payload.msg,
        
        
        }
      }
  
      default: {
        return state;
      }
    }
  }