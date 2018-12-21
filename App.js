import React, {Component} from 'react';
import {Platform, StyleSheet, Text, BackHandler,Alert, View,StatusBar,FlatList, ActivityIndicator,AsyncStorage,TouchableHighlight,ToolbarAndroid} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {connect} from 'react-redux';
import { Container, Header, Left, Body, Right, Button, Title, Icon } from 'native-base';
import PTRView from 'react-native-pull-to-refresh';
import Dimensions from 'Dimensions';
import Spinner from 'react-native-loading-spinner-overlay';
import {Link, Redirect} from 'react-router-native';
import {fetchEvents} from './src/actions/feed';
const {width, height} = Dimensions.get('window');
import styles from './src/styles/event';
//  import Icon from 'react-native-vector-icons/dist/Ionicons';
import {fetchListEvents} from './src/actions/eventdetails';
import {destroySession} from './src/actions';
import Moment from 'moment';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

BackHandler.addEventListener('hardwareBackPress', function() {
  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

  if (!this.onMainScreen()) {
    this.goBack();
    return true;
  }
  return false;
});
 class App extends Component<Props> {
  static navigationOptions = {
    headerVisible: true,
    header: 'Dashboard'
  }
  //  state = {
  //   spinner: false
  //  };

  constructor(props) {
    super(props);
    this.state = {
     // isLoading: false
    }
    this.id = ''
    this.eventId = ''
  
    
  }
  
  goBack() {
    this.props.history.goBack()
  }
 async componentWillMount() {
   this.props.dispatch(fetchEvents(this.props.user.msg));
   }
      
    onTextPress = (eventId , UsrId) => {
        this.props.dispatch(fetchListEvents(UsrId,eventId));
  };
  
     Logout() {
      Alert.alert(
        'Ticketing Soft',
        'Do you really want to Logout?', [{
            text: 'Cancel',
            onPress: () => '',
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () =>  this.props.dispatch(destroySession())
        }, ], {
            cancelable: false
        }
     )
       
     }
    
    render() {
      
      Moment.locale('en');
      
        return(
          <View style={styles.container}>
                      
     <Header style={styles.backBtn} iosStatusbar='#5b9111' androidStatusBarColor='#5b9111'>
       <Body  style={{flex: 4, justifyContent: 'center', alignItems: 'center'  }}>
         <Title>Dashboard</Title>
       </Body>
       <Right  style={{ flex: 1 }}>
         <Button transparent style={styles.logoutBtn} onPress={()=> this.Logout() }>
           <Icon name='md-log-out' iconSize='30' />
         </Button>
       </Right>
     </Header>
    
                 <FlatList 
               data={this.props.feed}
          
               showsVerticalScrollIndicator={false}
               showsHorizontalScrollIndicator={false}
               pagingEnabled = {false}
              
               renderItem={({item}) =>
                    <View style={styles.listContainer}>
                     <View style={styles.dateArea}>
                     
                     <Link to={{ pathname: '/eventdetail', state: { eventId: item.eventId} }}><Text style={styles.dateText}>{item.event_title}</Text></Link>
                     </View>
                     <View style={styles.listData}>
                       <View style={styles.listLeft}>
                       <Text style={styles.symbolText}>{"On "+ Moment(item.event_start_date_time).format('MMM DD,YYYY hh:mm a') + " at " +item.vanue_name.replace(/<(.|\n)*?>/g, '')}</Text>
                      
                       </View>
                       <View style={styles.listRight}>
                       <View style={styles.listRightText}>
                         {/* <Text style={styles.statusText}>{item.vanue_name}</Text> */}
                       
                       </View>
                        
                       </View>                        
                     </View>
                    </View>
                   
          // </TouchableHighlight>

               }
               keyExtractor={item => item.event_title}

             />
       </View>
     
        );
      
                    
           
       
      }
      
}

export const mapStateToProps = (state) => {
  
  return {
   
    user: state.user,
    feed: state.feed.all_events,
  }
}

export default connect(mapStateToProps)(App);