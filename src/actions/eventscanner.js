import {doFetch} from './fetch';

const UPDATE_SCANNER_VIEW = 'UPDATE_SCANNER_VIEW';


function scannerEventView(eventscanner) {
  return {
    type: UPDATE_SCANNER_VIEW,
    payload: eventscanner
  }
}
export function TicketCheck(UserId,event_id,ticket_number){ 
  
  return function (dispatch) {
      
      return doFetch('POST', `/mobile_logins/ticket_check`, {
        id: UserId,
        event_id:event_id,
        ticket_number:ticket_number
        },function(err,res){
      if(err || res.success === false){ 
        var e = res.success.message;
        return dispatch(error(e))
      };
      return dispatch(scannerEventView(res));
    })
  }
}