import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  View
} from 'react-native';

import styles from '../../styles/main.js';


export default class Input extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return( 
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChange}
          value={this.props.value}
          underlineColorAndroid='rgba(0,0,0,0)'
          autoCapitalize='none'
          secureTextEntry={this.props.secure}
        />
      </View>
    );
  }
}
