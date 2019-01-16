import {
    StyleSheet,
  } from 'react-native';
  import colors from './colors';
  import card from './card';
  import forms from './forms';
  import header from './header';
  import map from './map';
  
  const styles = StyleSheet.create({
    ...header,
    ...forms,
    ...map,
    ...card,
    root: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: colors.light.background,
      padding: 0,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: 0,
      width: '100%'
    },
   
    containerDark: {
      backgroundColor: colors.dark.background,
    },
    landing: {
      backgroundColor: colors.dark.medium,
      flex: 1,
    },
    topMargin: {
      marginTop: 20,
    },
    page: {
      top: 70,
      flex: 5,
      marginBottom: 60
    },
    copy: {
      padding: 10,
      margin: 10,
    },
    brand: {
      width: 200,
      height: 200,
      backgroundColor: '#CCC',
      borderRadius: 100,
      marginBottom: 50,
    },
    promotion: {
      width: 150,
      height: 150,
      backgroundColor: 'transparent',
      borderRadius: 75,
      marginBottom: 10,
      margin: 20
    },
    item: {
      width: 150,
      height: 150,
      backgroundColor: 'transparent',
      marginBottom: 10,
      margin: 20
    },
    richListItem: {
      flexDirection: 'column',
      flex: 2,
      backgroundColor: colors.dark.background,
      borderBottomColor: 'rgb(227,207,175)',
      borderBottomWidth: 1,
      borderStyle: 'solid',
    },
    avatar: {
      paddingLeft: 20,
      marginTop: 10,
    },
    bgImage: {
      flex: 1,
      flexDirection: 'column',
      width: undefined,
      height: 200,
      backgroundColor:'transparent',
      padding: 10,
      margin: 0,
      paddingTop: 100,
    },
    locationListItem: {
      borderBottomColor: 'rgb(227,207,175)',
      borderBottomWidth: 1,
      borderStyle: 'solid',
      padding: 10
    },
    locationListItemDistance: {
      justifyContent: 'flex-end',
      textAlign: 'right'
    },
    btnWrapper: {
      marginTop: 10,
      marginBottom: 10,
      height: 40,
      backgroundColor: colors.light.foreground,
      borderRadius: 20,
      width: 150,
    },
    btnContainer: {
      flex: 1,
      marginLeft : 10,
      marginRight : 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.highlight,
      marginBottom: 0,
      borderRadius: 0,
      padding: 7.5
    },
    buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
    },
    btnFollow: {
       flex: 1,
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: colors.highlight,
       borderRadius: 15,
       paddingTop: 7.5,
       paddingRight: 25,
       paddingBottom: 7.5,
       paddingLeft: 25,
    },
    btnContainerDark: {
      backgroundColor: colors.dark.medium,
    },
    btn: {
      color: colors.dark.foreground,
      textAlign: 'center',
    },
    btnCheckin: {
      flex: 1,
      height: 60,
      width: 300
    },
    navBtn: {
      padding: 10,
      textAlign: 'center',
      flex: 1
    },
    lightText: {
      color: colors.dark.foreground,
    },
    h1: {
      fontWeight: 'bold',
      padding: 20,
      fontSize: 16
    },
    verticalattendeeGroup: {
      flexDirection: 'column',
      marginTop: 5,
    },
    h2: {
      fontWeight: 'normal',
      padding: 20,
      fontSize: 14
    },
    h2text:{
       fontSize:25,
       marginTop:20,
    },
    offeringTitle: {
      padding: 20,
      textAlign: 'center',
      fontSize: 18,
      color: colors.dark.foreground,
    },
    itemContainer: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.dark.foreground,
      borderStyle: 'solid',
      margin: 10,
    },
    itemTitle: {
      fontWeight: 'bold',
      padding: 10,
      paddingBottom: 5,
      fontSize: 16,
      color: colors.dark.foreground,
      fontSize: 16,
      color: colors.dark.foreground,
    },
    itemDescription: {
      padding: 10,
      paddingTop: 0,
      fontSize: 12,
      color: colors.dark.foreground,
    },
    errorWrapper: {
      margin: 10,
      padding: 0,
      height: 50,
      width: 200,
    },
    toolbar: {
      backgroundColor: colors.purpleTheme,
      height: 50,
      alignSelf: 'stretch',
    }, 
    error: {
      textAlign: 'center',
      color: colors.highlight,
      fontStyle: 'italic'
    },
    lightBg: {
      backgroundColor: colors.light.background,
    },
    rowFront: {
     
      backgroundColor: '#FFF',
      borderBottomColor: 'black',
      borderLeftColor : colors.highlight,
      borderLeftWidth : 7,
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 70,
      width: '100%',
      flex: 1,
    },
    rowUncheckFront: {
     
      backgroundColor: '#FFF',
      borderBottomColor: 'black',
      borderLeftColor : 'rgba(0,0,0,0)',
      borderLeftWidth : 7,
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 70,
      width: '100%',
      flex: 1,
    },
    cardattendeeCategory: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'left'
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#629c12',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: 15,
    },
    rowLeftBack: {
      alignItems: 'center',
      backgroundColor: '#629c12',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
      paddingRight:10,
    },
    backRightBtnLeft: {
      backgroundColor: '#FF0000',
      right: 0,
      alignItems: 'center',
      flexDirection: 'row',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
    },
    emailTitle: {
      color: '#535353',
      width: 200,
      fontSize: 12
    },
    ticketstyle:{
      color: '#535353',
      width: 200,
      paddingBottom:10,
      fontSize: 12
    },
    checkinstyle: {
      color: '#fff',
      fontWeight: 'bold',
     
    },
    uncheckinstyle: {
      color: '#fff',
      fontWeight: 'bold',
    },
    backBtn: {
      backgroundColor:colors.purpleTheme
    },
    // spinnerTextStyle: {
    //   color: '#FFF'
    // },
    bottomView:{
 
      width: '100%', 
      height: 40, 
      backgroundColor: colors.purpleTheme, 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },
    textStylen:{
   
      color: '#fff',
      fontSize:22
    },
    MainContainer :{
 
      justifyContent: 'center',
      flex:1,
      margin: 10
       
      },
      scannerbutton:{
        width: '100%', 
        height: 40, 
        backgroundColor: colors.statusBar, 
        justifyContent: 'center', 
        alignItems: 'center',
      
      },
  });
  
  module.exports = styles;