import {
    StyleSheet,
  } from 'react-native';

  import Login from '../components/auth/login';


  const styles = StyleSheet.create({
    ...Login,
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        padding:20
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
      btnView: {   
        height: 50,
        backgroundColor: '#629c12',
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
    
  module.exports = styles;