/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image,StatusBar,AsyncStorage, KeyboardAvoidingView} from 'react-native';
//import styles from '../../styles/login';
import {authenticate} from '../../actions';
import SplashScreen from 'react-native-splash-screen';
import {Redirect, Link} from 'react-router-native';
import { TextField } from 'react-native-material-textfield';

import {connect} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
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
      this.onFocus = this.onFocus.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeText = this.onChangeText.bind(this);
     
      this.onSubmitEmail = this.onSubmitEmail.bind(this);
      this.onSubmitPassword = this.onSubmitPassword.bind(this);
      this.onAccessoryPress = this.onAccessoryPress.bind(this);

    
      this.emailRef = this.updateRef.bind(this, 'email');
      this.passwordRef = this.updateRef.bind(this, 'password');

     

      this.state = {email: '', password: '', secureTextEntry: true}
      
    }
    componentDidMount() {
      // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
     SplashScreen.hide();
  }

  onFocus() {
    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({ errors });
  }

  onChangeText(text) {
    ['email', 'password']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }



  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  onSubmit() {
    let errors = {};
    let iserror = false;

    
    ['email', 'password']
      .forEach((name) => {
        let value = this[name].value();

        if (!value) {
           iserror = true;
            errors[name] = 'Should not be empty';
        
        }else if('password' === name && value.length < 6){
          iserror = true;
            errors[name] = 'Too short';
          
        } 
      });
              
          if(!iserror){
            this.props.dispatch(authenticate(this.state.email, this.state.password));
          }
    
     
    this.setState({ errors });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }



 
    render() {
           if(this.props.user.loggedIn){
              return ( <Redirect to="/app" /> )
           }
           let { errors = {}, secureTextEntry, ...data } = this.state;
           let { firstname = 'name', lastname = 'house' } = data;
     
           let defaultEmail = `${firstname}@${lastname}.com`
             .replace(/\s+/g, '_')
             .toLowerCase();
        return (

          <ScrollView>
      <KeyboardAvoidingView  style={styles.container} behavior="padding" enabled>   
      <View>

       
          <View style={styles.logocontainer}>
        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
        </View>
  
            <TextField
              ref={this.emailRef}
              value={data.email}
              defaultValue={defaultEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              tintColor = {colors.purpleTheme}
              onSubmitEditing={this.onSubmitEmail}
              returnKeyType='next'
              label='Email Address'
              error={errors.email}
            />

            <TextField
              ref={this.passwordRef}
              value={data.password}
              secureTextEntry={secureTextEntry}
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              clearTextOnFocus={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitPassword}
              returnKeyType='done'
              label='Password'
             tintColor = {colors.purpleTheme}
              error={errors.password}
              renderAccessory={this.renderPasswordAccessory}
            />
               
        <View style={{marginTop: 20}} />
        <TouchableHighlight style={styles.btnView} onPress={() => {this.onSubmit()}}>
                <Text style={styles.btnText}>Log In</Text>
          </TouchableHighlight>
         
      </View>
      </KeyboardAvoidingView>    
      </ScrollView>
    );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding:20
  },
  logocontainer: {    
    alignItems: 'center',
    marginBottom:50
  },
  logo: {
      width: 250,
      height: 176,
      
  },
  title: {
    fontSize: 40,
    marginBottom:10,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#666666',    
    lineHeight: 25,
    marginBottom:40,
    fontSize:15
  },
  labelText: {
    color: '#666666'
  },
  input: {
    height: 35, 
     borderBottomWidth:1,
    borderBottomColor: '#DDD',
    paddingVertical:10,
    width: '100%',
    marginBottom:30
  },
  // btnView: {   
  //   height: 60,
  //   backgroundColor: '#6747cd',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius:3,
  //   marginTop:50
  // },
  btnView:{
    height: 50,
    backgroundColor: '#6747cd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:50,
        marginTop:50
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold'
  },
  btnGView: {   
    height: 60,
    backgroundColor: '#e2e2e2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50,
    marginTop:15
  },
  btnGText: {
    color: '#333',
    fontSize: 17,
    fontWeight: 'bold'
  },
  fPass: {
    alignItems: 'flex-end',
    marginTop:-15,
  },
  fPassText: {
    color: '#666666'
  },
  termsText: {
    color: '#777777',
    fontSize:12,
    textAlign: 'center',
    marginTop: 20
  }
});
const mapStateToProps = (state) => {
  
  return {
    user: state.user,
    error: state.error,
  
  }
}

export default connect(mapStateToProps)(Login);