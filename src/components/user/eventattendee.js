import React, {Component} from 'react';
import {Text, ScrollView, TouchableHighlight,StatusBar,BackHandler,ToolbarAndroid, View,TouchableOpacity, Image, AsyncStorage, FlatList, StyleSheet,Animated} from 'react-native';
import {connect} from 'react-redux';
import { goBack ,push } from 'react-router-redux';
import stylesMain from '../../styles/main.js';
import {fetchAttendeeSingle} from '../../actions/attendeesingle';
import colors from '../../styles/colors';
import {Link, Redirect} from 'react-router-native';
import styles from '../../styles/eventattendee';
import { SwipeListView } from 'react-native-swipe-list-view';
import {fetchListEvents} from '../../actions/eventdetails';
import {fetchAttendeeEventList} from '../../actions/eventattendee';
import FAB from 'react-native-fab';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Left, Body, Right, Button, Title, Icon } from 'native-base';
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
class EventAttendee extends Component<Props> {
    state = {
        spinner: false
       };
    constructor(){
        super();
       
        this.id = ''
        this.state = {
            textValue:'CheckIn'
        }
    }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      }
     componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
         const {eventId} = this.props.location.state

         this.props.dispatch(fetchAttendeeEventList(this.props.user.msg, eventId)); 
         this.setState({
            spinner: true
          });
          setTimeout(() => {
            this.setState({
              spinner: false,
             
            });
          }, 2500);
     }
     handleBackPress = () => {
        this.goBack(); // works best when the goBack is async
        return true;
      }
     goBack() {
        this.props.history.goBack()
      }
 
   onCheckInButtonPress = (id, event_id, attendee_id, checkin_status) => {
    this.props.dispatch(fetchAttendeeSingle(id,event_id,attendee_id,1));
    
   }
   onUnCheckInButtonPress = (id, event_id, attendee_id, checkin_status) => {
    this.props.dispatch(fetchAttendeeSingle(id,event_id,attendee_id,0));

   }
   onActionSelected(position) {

    if (position === 0) { 
      this.gotoeventscanner();
    }
   
    }
    render() {
      
        return (
            
            <View style={styles.container} >
            <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}/>
              <Header style={styles.backBtn} iosStatusbar='#5b9111' androidStatusBarColor='#5b9111'>
        
        <Left>
          <Button transparent style={styles.backBtn} onPress={()=> this.goBack()}>
            <Icon name='ios-arrow-back' color='#FFF' fontSize='150'/>
          </Button>
        </Left>
        <Body  style={{flex: 4, justifyContent: 'center', alignItems: 'center'  }}>
          <Title>Event Detail</Title>
        </Body>
       
      </Header>
            <SwipeListView
          useFlatList  
            data={this.props.eventattendee}
            showsVerticalScrollIndicator={false}
            renderItem={ ({item}) => (
                <View style={styles.rowFront}>
                <View style={styles.horizontalGroup}>
<Icon size={50} name="md-contact"  style={styles.avatar} />   
<View style={styles.verticalattendeeGroup}>
<Link to={{ pathname: '/eventscanner', state: { eventId: item.event_id} }}><Text style={styles.cardattendeeCategory}>{item.first_name+ " " + item.last_name}</Text></Link>
  <Text style={styles.emailTitle}>{item.email}</Text>
</View> 
<View  key = {(item.user_id, item.event_id,item.id,item.checkin_status)}>
</View>
                </View>
                </View>
              )}
            renderHiddenItem={ ({item}) => (
                <View style={styles.rowLeftBack}>
                   
                    <TouchableOpacity  style={styles.backRightBtnLeft} onPress={ _ => this.onUnCheckInButtonPress(item.user_id, item.event_id,item.id,item.checkin_status) }>
                    <Text style= {styles.uncheckinstyle}>Uncheck</Text>
								</TouchableOpacity>
                              
                                <TouchableOpacity onPress={ _ => this.onCheckInButtonPress(item.user_id, item.event_id,item.id,item.checkin_status) }>
                                <Text style= {styles.checkinstyle}>CheckIn</Text>
                                </TouchableOpacity>  
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
            keyExtractor={item => item.first_name}

            />
            </View>
        );
    }

}
export const mapStateToProps = (state) => {
    return {
      user: state.user,
      eventattendee: state.eventattendee.msg,
      attendeesingle:state.attendeesingle,
    }
  }
  
export default connect(mapStateToProps)(EventAttendee);