import {doFetch} from './fetch';

const UPDATE_EVENT_LIST = 'UPDATE_EVENT_LIST';


function updateEvent(t) {
  return {
    type: UPDATE_EVENT_LIST,
    payload: t
  }
}

export function fetchEvents(UserId){ 
  
  return function (dispatch) {
      
      return doFetch('POST', `/mobile_logins/myevent`, {
        id: UserId
        },function(err,res){
      if(err || res.success === false){ 
        var e = res.success.message;
        return dispatch(error(e))
      };
      return dispatch(updateEvent(res));
    })
  }
}
