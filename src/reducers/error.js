export default function (state = {
  status: false,
  message: null
}, {type, payload}) {
  switch (type) {
    case 'ERROR': {
      return {
        ...state,
        status: true,
        message: payload
      };
    }
    case 'HIDE_ERROR': {
      return {
        ...state,
        status: false,
        message: null
      };
    }
    default: {
      return state;
    }
  }
}
