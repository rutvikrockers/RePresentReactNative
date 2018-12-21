import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-native';
import {
  View
} from 'react-native';
import {connect} from 'react-redux';
import styles from '../styles/main.js';
import EventDetail from '../components/user/eventdetail';
import EventAttendee from '../components/user/eventattendee';
import EventScanner from '../components/user/eventscanner';
import App from '../../App.js';
import Feed from './feed';
class Authenticated extends Component {
  render() {
    var props = this.props;
    var match = props.match;
    
    return (
      <View style={styles.root}>
      
        <Switch>   
          <Route exact  path={match.url} component={App}/>
          <Route exact  path={match.url+"feed"} component={Feed}/>
          <Route exact  path={match.url+"eventdetail"} component ={EventDetail}/>
          <Route exact  path={match.url+"eventattendee"} component ={EventAttendee}/>
          <Route exact  path={match.url+"eventscanner"} component ={EventScanner}/>
        </Switch>
       
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loggedIn: state.user.loggedIn,
  }
}

export default connect(mapStateToProps)(Authenticated);
