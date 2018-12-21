import {
  View
} from 'react-native';
import { Switch, NativeRouter, Route, Redirect } from 'react-router-native';
import React, { Component } from 'react';
import EventDetail from '../components/user/eventdetail';


import {connect} from 'react-redux';
import styles from '../styles/main.js';
import App from '../../App';



class Authenticated extends Component {
  render() {
    var props = this.props;
    var match = props.match;
    return (
      <NativeRouter>
      <Switch>
        <Route exact  path={match.url} component={App}/>
      </Switch>
      </NativeRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.event,
  }
}

export default connect(mapStateToProps)(Authenticated);