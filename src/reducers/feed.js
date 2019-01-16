
export default function (state = {
  all_events: []
}, {type, payload}) {
  if (type == 'UPDATE_EVENT_LIST') {
      return {
        ...state,
        all_events: payload.all_events
      }
  }else{
    return state;
  }
}