import {doFetch} from './fetch';

class Base {
  constructor(name, path){
    this.name = name;
    this.path = path; 
    this.ERROR = 'ERROR';
    this.FETCH = `FETCH_${name.toUpperCase()}`
    this.FETCH_SUCCESS = `FETCH_${name.toUpperCase()}_SUCCESS`
    this.FETCH_FAILURE = `FETCH_${name.toUpperCase()}_FAILURE`
    this.FETCH_RESET = `FETCH_${name.toUpperCase()}_RESET`
    this.SHOW = `SHOW_${name.toUpperCase()}`
    this.SHOW_SUCCESS = `SHOW_${name.toUpperCase()}_SUCCESS`
    this.SHOW_FAILURE = `SHOW_${name.toUpperCase()}_FAILURE`
    this.SHOW_RESET = `SHOW_${name.toUpperCase()}_RESET`
    this.CREATE = `CREATE_${name.toUpperCase()}`
    this.CREATE_SUCCESS = `CREATE_${name.toUpperCase()}_SUCCESS`
    this.CREATE_FAILURE = `CREATE_${name.toUpperCase()}_FAILURE`
    this.CREATE_RESET = `CREATE_${name.toUpperCase()}_RESET`
    this.DELETE_SUCCESS = `DELETE_${name.toUpperCase()}_SUCCESS`
  }
  error(e) {
    return {
      type: this.ERROR,
      payload: e
    }
  }
  fetch(e) {
    return {
      type: this.FETCH,
      payload: e
    }
  }
  fetchSuccess(data) {
    return {
      type: this.FETCH_SUCCESS,
      payload: data
    }
  }
  showSuccess(data) {
    return {
      type: this.SHOW_SUCCESS,
      payload: data
    }
  }
  createSuccess(data) {
    return {
      type: this.CREATE_SUCCESS,
      payload: data
    }
  }
  createReset() {
    return {
      type: this.CREATE_RESET
    }
  }
  fetchFailure(e) {
    return {
      type: this.FETCH_FAILURE,
      payload: e
    }
  }
  deleteSuccess(data) {
    return {
      type: this.DELETE_SUCCESS,
      payload: data
    }
  }
  index(token) {
    return (dispatch) => {
      return doFetch('GET', this.path, {
      }, token, (err, res) => {
        if(err || res.success === false){ 
          var e = err.stack || res.success.message;
          return dispatch(this.error(e))
        };
        return dispatch(this.fetchSuccess(res));
      })
    }
  }
  show(token, id) {
    return (dispatch) => {
      return doFetch('GET', `${this.path}/${id}`, {
      }, token, (err, res) => {
        if(err || res.success === false){ 
          var e = err.stack || res.success.message;
          return dispatch(this.error(e))
        };
        return dispatch(this.showSuccess(res));
      })
    }
  }
  create(token, location) {
    return (dispatch) => {
      return doFetch('POST', 
        `${this.path}`,
        location,
        token, 
        (err, res) => {
          if(err || res.success === false){ 
            var e = err.stack || res.success.message;
            return dispatch(this.error(e))
          };
          return dispatch(this.createSuccess(res));
        })
    }
  }
  destroy(token, id) {
    return (dispatch) => {
      return doFetch('DELETE', 
        `${this.path}/${id}`,
        location,
        token, 
        (err, res) => {
          if(err || res.success === false){ 
            var e = err.stack || res.success.message;
            return dispatch(this.error(e))
          };
          return dispatch(this.deleteSuccess(res));
        })
    }
  }
  update(token, id, item) {
    return (dispatch) => {
      return doFetch('PUT', 
        `${this.path}/${id}`,
        location,
        token, 
        (err, res) => {
          if(err || res.success === false){ 
            var e = err.stack || res.success.message;
            return dispatch(this.error(e))
          };
          return dispatch(this.deleteSuccess(res));
        })
    }
  }
}

export default Base;
