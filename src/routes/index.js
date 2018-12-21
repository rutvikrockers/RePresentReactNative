import { Switch, NativeRouter, Route, Redirect } from 'react-router-native';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import Authenticated from './authenticated'

import Login from '../components/auth/login';
class Routes extends Component {
  render() {
    const props = this.props;
    return (
      <NativeRouter>
        <Switch>
        {props.loggedIn  ? <Route  path="/" component={Authenticated}/> : <Route exact path="/" component={Login}/>}
        </Switch>
      </NativeRouter>
      )
      }
  }


const mapStateToProps = (state) => {
  return {
    user: state.user,
    loggedIn:state.user.loggedIn,
  }
}

export default connect(mapStateToProps)(Routes);
