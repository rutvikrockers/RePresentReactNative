import React, { Component } from 'react';
import { Switch, Route } from 'react-router-native';
import {
  View
} from 'react-native';

import App from '../../App';

import {connect} from 'react-redux';
class Authenticated extends Component {
  render() {
    var props = this.props;
    var match = props.match;
    return (
      <Switch>
        <Route exact  path={match.url} component={App}/>
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(Authenticated);

