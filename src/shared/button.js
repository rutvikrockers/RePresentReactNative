import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import styles from '../../styles/main.js';


export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return( 
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={this.props.style}
          onPress={this.props.onPress} >
          <Text style={styles.btn}>{this.props.value}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
