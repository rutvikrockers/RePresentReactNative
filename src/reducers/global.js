import {
  ERROR,
  HIDE_ERROR,
  IS_LOADING,
  IS_NOT_LOADING,
  SET_LOADING_COMPONENT
} from '../actions/actionTypes';

export default function (state = {
  status: false,
  message: null,
  isLoading: false,
  footerStyle: null,
  loadingComponent: null,
}, {type, payload}) {
  switch (type) {
    case ERROR: {
      return {
        ...state,
        status: true,
        message: payload
      };
    }
    case HIDE_ERROR: {
      return {
        ...state,
        status: false,
        message: null
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case IS_NOT_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case SET_LOADING_COMPONENT: {
      return {
        ...state,
        loadingComponent: payload
      }
    }
    default: {
      return state;
    }
  }
}
