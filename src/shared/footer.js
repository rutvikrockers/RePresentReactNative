import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {Link} from 'react-router-native';

import styles from '../styles/main';

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
   
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(Footer);