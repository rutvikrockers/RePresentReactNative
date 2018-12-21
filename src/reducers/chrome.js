import { FOOTER_STYLE } from '../actions/actionTypes';

export default function (state = {
  footer: { 
    style: null,
  }
}, {type, payload}) {

  switch (type) {

    case FOOTER_STYLE: {
      return {
        ...state,
        footer: { style: payload }
      };
    }

    default: {
      return state;
    }
  }
}
