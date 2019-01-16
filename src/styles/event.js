import {
    StyleSheet,Platform
  } from 'react-native';

  import App from '../../App';
  import colors from '../styles/colors';
  const styles = StyleSheet.create({
    ...App,
    container: {
      flex: 1,
    
      backgroundColor: '#f7f7f7',
      justifyContent: 'center'
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
    activityindicator:{
      justifyContent: 'center'
    },
    listContainer: {
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          marginTop:10,
          marginLeft:20,
          marginRight:20,
          elevation: 2,
        },
        android: {
          shadowColor: 'black',
          shadowOffset: { height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          marginTop:10,
          marginLeft:20,
          marginRight:20,
          elevation: 2,
        },
      }),
      backgroundColor: '#fff',
      flex: 1, 
      marginBottom: 5,
      borderColor: '#DDD',
      borderWidth: 1,
      borderRadius: 10,
  },

  imageStyle: {
    width: 500,
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  dateArea: {
    backgroundColor:'#ececec',
    paddingHorizontal:10,
    paddingVertical: 5,  
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },  
  dateText: {
    color: '#666'
  },
  listData: {
    padding:10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, 
  listLeft: {
  
  }, 
  listRight: {
    flexDirection: 'row',
  },
  symbolText: {
    fontWeight: 'bold',
    fontSize: 17
  },
  eventLocation: {
    fontSize: 14,
    color: '#666'
  },
  categoryText: {
    color: '#666666'
  },
  typeText: {
    color: '#666666',
    textAlign: 'right'
  },
  statusText: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
  listRightText: {
  
  },
  watchIconArea: {
    marginTop: 5,
    marginLeft: 10
  },
  title:{
   
      color: 'white',
      fontSize: 12,
      textAlign: 'center',
    
  },
  toolbar: {
    backgroundColor: colors.purpleTheme,
    height: 50,
    alignSelf: 'stretch',
  }, 
   backBtn: {
     backgroundColor:colors.purpleTheme
   },
   animatedView: {
    backgroundColor: colors.purpleTheme,
    elevation: 2,
    position: "absolute",
    bottom: 0,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
},
exitTitleText: {
    textAlign: "center",
    color: "#ffffff",
    marginRight: 10,
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  backgroundColor: 'transparent'
},
exitText: {
    color: "#ffffff",
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 3
},
MainContainer :{
 
 
  flex: 1,
  justifyContent: 'center', // Used to set Text Component Vertically Center
  alignItems: 'center' 
   
  },
  });
  module.exports = styles;