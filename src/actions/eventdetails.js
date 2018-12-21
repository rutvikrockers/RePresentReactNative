import {doFetch} from './fetch';

const DETAIL_LIST_EVENT = 'DETAIL_LIST_EVENT';


function updateEventDetails(t) {
  
  return {
    type: DETAIL_LIST_EVENT,
    payload: t
  }
}
export function fetchListEvents(UserId,event_id){ 
 
  return function (dispatch) {
     
      return doFetch('POST', `/mobile_logins/myevent_details`, {
        id: UserId,
        event_id:event_id
        },function(err,res){
      if(err || res.success === false){ 
        var e = res.success.message;
        alert(e);
        return dispatch(error(e))
      };
     
      return dispatch(updateEventDetails(res));
      
    })
  }
}