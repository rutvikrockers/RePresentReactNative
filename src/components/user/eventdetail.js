import React, {Component} from 'react';
import {Platform,Text, ScrollView,TouchableOpacity,BackAndroid,BackHandler, View,StatusBar, Alert,ToolbarAndroid, Image, AsyncStorage, FlatList, StyleSheet,Animated} from 'react-native';
import {connect} from 'react-redux';
import { goBack ,push } from 'react-router-redux';
import stylesMain from '../../styles/main';
import {fetchAttendeeEventList} from '../../actions/eventattendee';
import colors from '../../styles/colors';
import {Link, Redirect} from 'react-router-native';
import {fetchListEvents} from '../../actions/eventdetails';
import Spinner from 'react-native-loading-spinner-overlay';
import { StackNavigator } from 'react-navigation';
import Moment from 'moment';
import { Container, Header, Left, Body, Right, Button, Title, Icon } from 'native-base';
type Props = {};


class Progressbar extends Component{
  
  constructor(props) {
    super(props);
   
    this.state = {
    };
  }

componentWillMount(){
  
  this.animation = new Animated.Value
  (this.props.progress);
  
}
componentDidUpdate(prevProps, prevState){
  if(prevProps.progress != this.props.progress){
      Animated.timing(this.animation,{
        toValue: this.props.progress,
        duration:this.props.duration
      }).start();
  }
}
  render(){
    const{
      height,
      borderColor,
      borderRadius,
      borderWidth,
      barColor,
      fillColor
    } =this.props;

const  widthInterpolated = this.animation.interpolate({
  inputRange: [0,100],
  outputRange:["0%","100%"],
  extrapolate:"clamp"
})

    return(
      <View style={{
      flex:1,  flexDirection: "row",height
      }}>
<View style = {{
  flex:1 , borderColor,borderWidth,borderRadius
}}>
<View style={[StyleSheet.absoluteFill,{backgroundColor: fillColor}]}
/>
  <Animated.View
    style ={{
      position: "absolute",
      left:0,
      top:0,
      bottom:0,
      width:widthInterpolated,
      backgroundColor:barColor
    }}
  />
</View>
      </View>
    )
    
  }
}
Progressbar.defaultProps = {
    height:15,
   borderColor: "rgb(142,142,142)",
   borderWidth: 2,
   borderRadius: 4,
   barColor: 'rgba(98, 156, 18,1.0)',
   fillColor: '#fff',
  
}


BackHandler.addEventListener('hardwareBackPress', function() {
  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

  
    this.goBack();
    return true;
  
  return false;
});

class EventDetail extends Component<Props> {

  state = {
    spinner: false
   };
  state = {
    progress: 0.5,
   };
  
  
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this)
    this.state = {
      isHidden: false,
    };
    
  
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress = () => {
    this.goBack(); // works best when the goBack is async
    return true;
  }
  async componentWillMount() {
   
    const {eventId} = this.props.location.state
    this.props.dispatch(fetchListEvents(this.props.user.msg,eventId));
    AsyncStorage.setItem("eventId",eventId);
    this.setState({
      spinner: true
    });
    setTimeout(() => {
      this.setState({
        spinner: false,
       
      });
    }, 2500);
  }
   goBack() {
    this.props.history.goBack()
  }
    render() {
      let data =this.props.eventdetails ;
      Moment.locale('en');
       
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
          <View style={stylesMain.verticalGroup}>
<Text style={styles.name}>{data.event_title}</Text>

<Text style={styles.overView}>{"On "+ Moment(data.event_start_date_time).format('MMM DD,YYYY hh:mm a')}</Text>
<Text style={styles.overView}>{"From " +Moment(data.event_start_date_time).format('MMM DD,YYYY hh:mm a')+ " To "+Moment(data.event_end_date_time).format('MMM DD,YYYY hh:mm a')}  </Text>
<View style={stylesMain.horizontalGroup}>

<View style={stylesMain.verticalGroup}>
<Text style={styles.name}>{"Tickets Sold"}</Text>
<Text style={styles.overView}>{data.sold + "/" +data.event_capacity}</Text>
</View>
</View>
<View style= {styles.progressContainer}>
 <Progressbar
 progress = {((this.props.eventdetails.sold/this.props.eventdetails.count_of_ticket)*100)}/>
</View>

<View style={stylesMain.horizontalGroup}>
<View style={stylesMain.verticalGroup}>
<TouchableOpacity onPress={this.goBack}><Text style={styles.name} >{"Attendance"}</Text></TouchableOpacity> 
<Text style={styles.overView}>{data.count_checkin_attendee + "/" +data.count_attendee}</Text>
</View>

</View>
<View style= {styles.progressContainer}>
 <Progressbar
 progress = {((this.props.eventdetails.count_checkin_attendee/this.props.eventdetails.count_attendee)*100)}/>
</View>
</View>
    <View style={ styles.bottomView} >

    <Link to={{ pathname: '/eventattendee', state: { eventId: data.id} }}><Text  style={styles.textStyle}>CheckIn</Text></Link>
               </View>
      </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#fff',
          },
          h2text: {
            marginLeft:20,
          marginTop: 10,
          fontFamily: 'Helvetica',
          fontSize: 36,
          fontWeight: 'bold',
          },
          flatview: {
          justifyContent: 'center',
          paddingTop: 10,
          marginLeft:10,
          borderRadius: 2
          },
          name: {

          fontFamily: 'Verdana',
          fontWeight: 'bold',
          fontSize: 18,
          marginLeft:20
          },
          overView: {
          fontFamily: 'Verdana',
          fontSize: 14,
          marginTop:10,
          marginLeft:20
         
          },
          htmlText: {
          width : 250,
          height: 100 
          },
          overviewtext: {
          color: 'black',
          marginLeft:10,
          marginTop: 10
          },
          avatar: {
            width:90,
            height: 90,
            borderRadius:90
          },
          progressContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft:20,
            
            marginRight:20,
           marginTop:10
          },
          btnContainer: {
            flex: 1,
            
            justifyContent: 'flex-end',
            marginBottom: 0,
           
          },
          button: {
            backgroundColor:'#1E6738',   
         },
         bottomView:{
 
          width: '100%', 
          height: 40, 
          backgroundColor: colors.highlight, 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'absolute',
          bottom: 0
        },
        toolbar: {
          backgroundColor: '#629c12',
          height: 50,
          alignSelf: 'stretch',
        }, 

        textStyle:{
     
          color: '#fff',
          fontSize:22
        },
        backBtn: {
          backgroundColor:'#629c12'
        },
        spinnerTextStyle: {
          color: '#FFF'
        },
    });
    export const mapStateToProps = (state) => {
        return {
          user: state.user,
          eventdetails: state.eventdetails.event,
        }
      }
    export default connect(mapStateToProps)(EventDetail);

