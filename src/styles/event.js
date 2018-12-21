import {
    StyleSheet,Platform
  } from 'react-native';

  import App from '../../App';

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
        },
        android: {
          marginTop:5,
          marginLeft:20,
          marginRight:20,
          elevation: 2,
        },
      }),
      backgroundColor: '#FFF',
      flex: 1, 
      marginBottom: 20,
      borderColor: '#ececec',
      borderWidth: 1,
      borderRadius: 5,
  },
  dateArea: {
    backgroundColor:'#ececec',
    paddingHorizontal:10,
    paddingVertical: 5,  
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
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
  toolbar: {
    backgroundColor: '#629c12',
    height: 50,
    alignSelf: 'stretch',
  }, 
   backBtn: {
     backgroundColor:'#629c12'
   },
  
  });
  module.exports = styles;