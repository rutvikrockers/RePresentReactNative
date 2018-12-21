import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import styles from '../styles/main';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return( 
      <View style={StyleSheet.flatten([styles.landing,{flex: 1, alignItems: 'center',justifyContent: 'center'}])}>
        <Text style={styles.btn}>LOADING</Text>
      </View>
    );
  }
}
