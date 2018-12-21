import {doFetch} from './fetch';

const UPDATE_ATTENDEE_SINGLE = 'UPDATE_ATTENDEE_SINGLE';


function updateAttendeeSingle(t) {
 
  return {
    type: UPDATE_ATTENDEE_SINGLE,
    payload: t
  }
}

export function fetchAttendeeSingle(id,event_id,attendee_id,checkin_status){ 
 
  return function (dispatch) {
      return doFetch('POST', `/mobile_logins/update_attendee_single`, {
        id: id,
        event_id: event_id,
        attendee_id: attendee_id,
        checkin_status: checkin_status
       
        },function(err,res){
      if(err || res.success === false){ 
        var e = res.success.message;
        return dispatch(error(e))
      };
      return dispatch(updateAttendeeSingle(res));
      
    })
  }
}