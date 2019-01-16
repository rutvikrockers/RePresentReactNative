'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image
} from 'react-native';
import ImagePicker from "react-native-image-picker";
import {readerQR} from 'react-native-lewin-qrcode';
import PropTypes from 'prop-types';

const WINDOW_WIDTH = Dimensions.get('window').width
const ACTIVE_OPACITY = 0.7

const SCAN_ANGLE_WIDTH = 28
const SCAN_ANGLE_HEIGHT = 5

const DEFAULT_MASK_COLOR = 'rgba(0,0,0,0.4)'

export default class ScannerMask extends Component {



  constructor(props){
    super(props)
    this.state = {
      scanAnimationTop: new Animated.Value(0),
    }
  }
  componentDidMount(){
    const props = this.props
    if (props.isEnableAnimationScan == null || props.isEnableAnimationScan === true) {
      this.scanAnimationStart.call(this)
    }
  }
  scanAnimationStart(){
    const _this = this
    const props = this.props
    const toValue = props.scanBoxSize !=null ? props.scanBoxSize : Number.parseInt(WINDOW_WIDTH * 0.6);

    this.state.scanAnimationTop.setValue(0);
    Animated.timing(
      this.state.scanAnimationTop,
      {
        toValue: toValue + 2,
        duration: 2000,
      }
    ).start(()=>{
      _this.timer && clearTimeout(_this.timer);
      _this.timer = setTimeout(()=>{
        _this.scanAnimationStart.call(_this)
      }, 1200)
    })
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  _getStyles () {
    const props = this.props;
    const _defaultScanBorderColor = "#fff"
    const _defaultScanAngleColor = props.scanAngleColor != null ? props.scanAngleColor : 'rgba(118,89,210,1.0)'

    const _defaultScanBoxSize = props.scanBoxSize !=null ? props.scanBoxSize : Number.parseInt(WINDOW_WIDTH * 0.6);
    const _defaultScanAngleWidth = props.scanAngleWidth != null ? props.scanAngleWidth : SCAN_ANGLE_WIDTH
    const _defaultScanAngleHeight = props.scanAngleHeight != null ? props.scanAngleHeight : SCAN_ANGLE_HEIGHT

    // 遮罩背景色
    let _defaultMaskColor = DEFAULT_MASK_COLOR
    if (props.maskColor != null) {
      _defaultMaskColor = props.maskColor
    }
    if (props.isEnableMask === false) {
      _defaultMaskColor = null
    }
    // 头部背景色
    let _defaultHeaderColor = "rgba(0,0,0,0.1)"
    if ((props.isEnableMask == null || props.isEnableMask === true) && _defaultMaskColor != null) {
      _defaultHeaderColor = null
    }
    if (props.topBarBackgroundColor != null) {
      _defaultHeaderColor = props.topBarBackgroundColor
    }
    // 扫描边框
    let scanBorderStyle = {
      borderColor: props.scanBorderColor != null ? props.scanBorderColor : _defaultScanBorderColor,
      borderWidth: 1
    }
    // 扫描边框的角
    let scanAngleStyle = {
      height: _defaultScanAngleWidth,
      width: _defaultScanAngleWidth,
      borderColor: _defaultScanAngleColor,
    }
    // 是否开启边框
    if (props.isEnableScanBorder === false) {
      scanBorderStyle = null
    }
    return StyleSheet.create({
      section: {
        flex: 1,
      },
      headerWrap: {
        width: '100%',
        flex: 1,
        backgroundColor: _defaultMaskColor,
      },
      header:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft:8,
        width: '100%',
        backgroundColor: _defaultHeaderColor
      },
      scanWrap: {
        width: '100%',
        height: _defaultScanBoxSize,
        flexDirection: 'row',
      },
      scanLeft: {
        flex: 1,
        backgroundColor: _defaultMaskColor,
      },
      scanRight: {
        flex: 1,
        backgroundColor: _defaultMaskColor,
      },
      scanSquare: {
        width: _defaultScanBoxSize,
        height: _defaultScanBoxSize,
        position: 'relative',
        ...scanBorderStyle
      },
      scanAngle1: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderTopWidth: _defaultScanAngleHeight,
        borderLeftWidth: _defaultScanAngleHeight,
        ...scanAngleStyle
      },
      scanAngle2: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderTopWidth: _defaultScanAngleHeight,
        borderRightWidth: _defaultScanAngleHeight,
        ...scanAngleStyle
      },
      scanAngle3: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderBottomWidth: _defaultScanAngleHeight,
        borderLeftWidth: _defaultScanAngleHeight,
        ...scanAngleStyle
      },
      scanAngle4: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderBottomWidth: _defaultScanAngleHeight,
        borderRightWidth: _defaultScanAngleHeight,
        ...scanAngleStyle
      },
      infoWrap: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: _defaultMaskColor,
      },
      info: {
        width: _defaultScanBoxSize,
        paddingLeft: 2,
        paddingRight: 2
      }
    })
  }
  render() {
    const props = this.props
    const styles = this._getStyles.call(this)

    let isEnableTopBar = props.isEnableTopBar != null ? props.isEnableTopBar : true // 是否启用背景蒙版
    let isEnableAnimationScan = props.isEnableAnimationScan != null ? props.isEnableAnimationScan : true // 是否启用扫描动画

    let RenderTopBar = props.RenderTopBar // 顶部自定义组件
    let Title = props.Title != null ? props.Title : '' // 顶部标题

    let isEnableDiscernPicture = props.isEnableDiscernPicture != null ? props.isEnableDiscernPicture : true // 是否启用从相册选择条码图片
    let hintScanText = props.hintScanText != null ? props.hintScanText : ''
    let hintOrText = props.hintOrText != null ? props.hintOrText : ''
    let hintPictureGalleryText = props.hintPictureGalleryText != null ? props.hintPictureGalleryText : ''
    let RenderScanLine = props.RenderScanLine

    return (
      <View styel={styles.section}>
        <View style={styles.headerWrap}>
          {isEnableTopBar &&
            RenderTopBar != null ?
            <View style={{flexDirection: 'row'}}>{RenderTopBar}</View>
             :
            <View style={styles.header}>
              <View style={{flex: 1,justifyContent: 'flex-start'}}>
                {/* <TouchableOpacity
                  activeOpacity={ACTIVE_OPACITY}
                  onPress={()=>{this.props.onBack && this.props.onBack()}}
                >
                  <Image style={{width: 21, height: 21}} source={require('./image/back.png')}/>
                </TouchableOpacity> */}
              </View>
              <Text style={{fontSize: 20,color: '#ffffff', textAlign: 'center'}}>{Title}</Text>
              <View style={{flex: 1}}/>
            </View>
          }
        </View>
        <View style={styles.scanWrap}>
          <View style={styles.scanLeft}/>
          <View style={styles.scanSquare}>
            <View style={styles.scanAngle1}/>
            <View style={styles.scanAngle2}/>
            <View style={styles.scanAngle3}/>
            <View style={styles.scanAngle4}/>
            {isEnableAnimationScan === true ?
              <View style={{
                padding: 1,
                width: '100%',
                flex: 1,
                }}
              >
                <View style={{flex: 1, overflow: 'hidden',position: 'relative', backgroundColor: 'rgba(0,0,0,0)'}}>
                  <Animated.View
                    style={{
                      width: '100%',
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                      top: this.state.scanAnimationTop
                    }}
                  >
                    {RenderScanLine != null?
                      <View style={{flexDirection: 'row'}}>{RenderScanLine}</View>
                      :<Image
                        resizeMode={'stretch'}
                        style={{width: '100%', height: 3}}
                        source={require('../assets/scan-line.png')}/>
                    }
                  </Animated.View>
                </View>
              </View> : ''
            }
          </View>
          <View style={styles.scanRight}/>
        </View>
        <View style={styles.infoWrap}>
          <View style={styles.info}>
            <View style={{marginTop: 16, paddingLeft: 1, paddingRight: 1}}>
              <View style={{borderRadius: 2}}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 15,
                  color: '#ffffff'}}>{hintScanText}</Text>
              </View>
            </View>
          
          </View>
        </View>
      </View>
    );
  }
  // 打开相册选择图片识别条码
  openGallery () {
    const _this = this
    const photoOptions = {
      storageOptions: {
        skipBackup: true,
        path:'images'
      }
    }
    ImagePicker.launchImageLibrary(photoOptions,(response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        _this.props.onReadBarCodeByGalleryFailure && _this.props.onReadBarCodeByGalleryFailure()
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        _this.onBarCodeReadByGalleryStart && _this.onBarCodeReadByGalleryStart()
        readerQR(response.path).then((data)=>{ // 读取到条码
          _this.props.onBarCodeRead && _this.props.onBarCodeRead({data})
        }).catch(()=>{ // 读取失败
          _this.props.onReadBarCodeByGalleryFailure && _this.props.onReadBarCodeByGalleryFailure()
        })
      }
    })
  }
}