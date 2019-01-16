'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

export default class ScannerFooter extends Component {
  
  constructor(props){
    super(props)
  }
  render() {
    const props = this.props
    const styles = this._getStyles.call(this)
    let hintOpenLightText = props.hintOpenLightText ? props.hintOpenLightText : 'ON'
    let hintCloseLightText = props.hintCloseLightText ? props.hintCloseLightText : 'OFF'
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={()=>this.handlerLight.bind(this)()}
        >
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 54, width: 54, height: 54}}>
              {props.isOpenLight === true ?
                <Image style={{height: 28, width: 28}} source={require('../assets/light-bulb-open.png')}/>
                :
                <Image style={{height: 28, width: 28}} source={require('../assets/light-bulb-close.png')}/>
              }
            </View>
            <Text  style={{fontSize: 16, marginTop: 10, textAlign: 'center', color: '#f5f5f5'}}>
              {props.isOpenLight === true ? hintCloseLightText : hintOpenLightText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  // 手电筒操作
  handlerLight () {
    let status = this.props.isOpenLight
    if (status === true) { // 开启状态，执行关闭
      this.props.onCloseLight && this.props.onCloseLight()
    } else {
      this.props.onOpenLight && this.props.onOpenLight()
    }
  }
  _getStyles(){
    return StyleSheet.create({
      footer: {
        paddingTop: 24,
        paddingBottom: 24,
        backgroundColor: this.props.lightBackgroundColor !=null ? this.props.lightBackgroundColor : 'rgba(0,0,0,1)',
        justifyContent: 'center',
        alignItems: 'center',
      }
    })
  }
}