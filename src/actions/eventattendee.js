import {doFetch} from './fetch';

const UPDATE_EVENT_ATTENDEE = 'UPDATE_EVENT_ATTENDEE';
function updateAttendeeList(t) {
  return {
    type: UPDATE_EVENT_ATTENDEE,
    payload: t
  }
}
export function fetchAttendeeEventList(UserId,event_id){ 
  
  return function (dispatch) {
      
      return doFetch('POST', `/mobile_logins/attendee`, {
        id: UserId,
        event_id:event_id
        },function(err,res){
      if(err || res.success === false){ 
        var e = res.success.message;
        return dispatch(error(e))
      };
      return dispatch(updateAttendeeList(res));
    })
  }
}

