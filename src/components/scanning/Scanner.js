'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';

import ScannerMask from '../scanning/ScannerMask';
import ScannerFooter from '../scanning/ScannerFooter';

export default class Scanner extends Component {

 
  constructor(props){
    super(props)
    this.state = {
      isOpenLight: false,
      isEnableCameraScan: true,
      scanInterval: 1500
    }
  }
  componentDidMount () {}
  render() {
    const props = this.props
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          onBarCodeRead={this.state.isEnableCameraScan === true ? (code)=>this.onBarCodeReadByCamera.bind(this)(code) : null}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.isOpenLight === true ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
          <ScannerMask
            Title={props.Title}
            isEnableAnimationScan={props.isEnableAnimationScan}
            isEnableTopBar={props.isEnableTopBar}
            RenderScanLine={props.RenderScanLine}
            RenderTopBar={props.RenderTopBar}
            topBarBackgroundColor={props.topBarBackgroundColor}
            isEnableMask={props.isEnableMask}
            isEnableScanBorder={props.isEnableScanBorder}
            isEnableDiscernPicture={props.isEnableDiscernPicture}
            maskColor={props.maskColor}
            scanAngleColor={props.scanAngleColor}
            scanAngleWidth={props.scanAngleWidth}
            scanAngleHeight={props.scanAngleHeight}
            scanBoxSize={props.scanBoxSize}
            scanBorderColor={props.scanBorderColor}
            hintScanText={props.hintScanText}
            hintOrText={props.hintOrText}
            hintPictureGalleryText={props.hintPictureGalleryText}

            onBack={()=>props.onBack && props.onBack()}
            onBarCodeReadByGalleryStart={()=>props.onBarCodeReadByGalleryStart && props.onBarCodeReadByGalleryStart()}
            onBarCodeReadByGalleryFailure={()=>props.onBarCodeReadByGalleryFailure && props.onBarCodeReadByGalleryFailure()}
            onBarCodeRead={(data)=>{this.onBarCodeRead.bind(this)(data)}}
          />
        </RNCamera>
        <ScannerFooter
          hintOpenLightText={props.hintOpenLightText}
          hintCloseLightText={props.hintCloseLightText}
          lightBackgroundColor={props.lightBackgroundColor}
          isOpenLight={this.state.isOpenLight}
          onOpenLight={()=>this.handlerLight.bind(this)(true)}
          onCloseLight={()=>this.handlerLight.bind(this)(false)}
        />
      </View>
    );
  }
  // 相机识别到条码
  onBarCodeReadByCamera(data){
    let _this = this
    _this.onBarCodeRead.bind(this)(data)
    _this.setState({
      isEnableCameraScan: false
    }, ()=>{
      _this.timer && clearTimeout(_this.timer);
      _this.timer = setTimeout(()=>{
        _this.setState({
          isEnableCameraScan: true
        })
      }, _this.scanInterval)
    })
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  // 识别到条码
  onBarCodeRead(data){
    this.handlerLight.bind(this)(false)
    this.props.onBarCodeRead && this.props.onBarCodeRead(data)
  }
  // 控制开灯关灯
  handlerLight(stutas){
    this.setState({
      isOpenLight: stutas
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})