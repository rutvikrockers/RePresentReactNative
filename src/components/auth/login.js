/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image,StatusBar,AsyncStorage, KeyboardAvoidingView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from '../../styles/login';
import {authenticate} from '../../actions';
import {Redirect, Link} from 'react-router-native';
import {connect} from 'react-redux';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
 class Login extends Component<Props> {
   
    constructor(props) {
      super(props);
      this.state = {email: '', password: ''}
    }
    login() {
      this.props.dispatch(authenticate(this.state.email, this.state.password));
    }
   

    render() {
    
           if(this.props.user.loggedIn){
              return ( <Redirect to="/app" /> )
           }
        
        return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding" enabled>   
      <View>
      <StatusBar backgroundColor ="#5b9111"
        animated ={true}
      />
      <Text style={styles.title}>Hello.</Text>
        <Text style={styles.subTitle}>Welcome to TicketingSoft! Please enter {"\n"}your login details. </Text>
        <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCapitalize='none'
          />
        <Text style={styles.labelText}>Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            underlineColorAndroid='rgba(0,0,0,0)'
            secureTextEntry={true}/>
       
        <View style={{marginTop: 20}} />
        <TouchableHighlight style={styles.btnView} onPress={() => {this.login()}}>
                <Text style={styles.btnText}>Log In</Text>
          </TouchableHighlight>
      </View>
      </KeyboardAvoidingView>    
     
    );
    }
}
const mapStateToProps = (state) => {
  
  return {
    user: state.user,
    error: state.error,
  
  }
}

export default connect(mapStateToProps)(Login);