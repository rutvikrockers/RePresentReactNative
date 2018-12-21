import React, {Component} from 'react';
import {AppRegistry,Text, ScrollView,StatusBar, TouchableHighlight,Vibration, View , Image, AsyncStorage, FlatList, StyleSheet,Linking,Animated,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-native';
import { goBack ,push } from 'react-router-redux';
import {TicketCheck} from '../../actions/eventscanner';
import Camera from 'react-native-camera';
import { Container, Header, Left, Body, Right, Button, Title, Icon } from 'native-base';
type Props = {};

class EventScanner extends Component<Props> {
	static navigationOptions = {
		title: 'EventScanner',
	 };
  constructor(props) {
		super(props);
		this.camera = null;
		this.barcodeCodes = [];

		this.state = {
			camera: {
				aspect: Camera.constants.Aspect.fill,
				captureTarget: Camera.constants.CaptureTarget.cameraRoll,
				type: Camera.constants.Type.back,
				orientation: Camera.constants.Orientation.auto,
				flashMode: Camera.constants.FlashMode.auto,
				barcodeFinderVisible: true
			}
		};
  }
  goBack() {
    this.props.history.goBack()
  }


  
      attendeecheck(){
		
	  }
	   componentDidUpdate(){
		
			if(this.props.eventscanner.status== 2){
				alert("This attendee already checked In.");
			}else if(this.props.eventscanner.status==0){
		 alert("Invalid Code.");
			}
			 if(this.props.eventscanner.status==1){
			 alert("This attendee checked In.")
		 }
		 }
	  componentDidMount(){
		
	   if(this.props.eventscanner.status== 2){
		   alert("This attendee already checked In.");
	   }else if(this.props.eventscanner.status==0){
		alert("Invalid Code.");
	   }
	    if(this.props.eventscanner.status==1){
			alert("This attendee checked In.")
		}
	   
	  }
   onBarCodeRead(scanResult) {
	 
	  const {eventId} = this.props.location.state
	
		if (scanResult.data != null) {
			if (!this.barcodeCodes.includes(scanResult.data)) {
		this.barcodeCodes.push(scanResult.data);
		this.props.dispatch(TicketCheck(this.props.user.msg, eventId,scanResult.data)); 
		        this.attendeecheck();
			}
		}
	
		return;
		
	}

	render() {
    const styles = this.defaultStyles();
		return (
			<View style={styles.container}>
			 <Header style={styles.backBtn} iosStatusbar='#5b9111' androidStatusBarColor='#5b9111'>
        
        <Left>
          <Button transparent style={styles.backBtn} onPress={()=> this.goBack()}>
            <Icon name='ios-arrow-back' color='#FFF' fontSize='150'/>
          </Button>
        </Left>
        <Body  style={{flex: 4, justifyContent: 'center', alignItems: 'center'  }}>
          <Title>Event Scanner</Title>
        </Body>
       
      </Header>
  
    
				<Camera
					ref={cam => {
						this.camera = cam;
					}}
					style={styles.preview}
					aspect={this.state.camera.aspect}
					captureTarget={this.state.camera.captureTarget}
					type={this.state.camera.type}
					flashMode={this.state.camera.flashMode}
					onFocusChanged={() => {}}
					onZoomChanged={() => {}}
					defaultTouchToFocus
					mirrorImage={false}
					barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
					barcodeFinderWidth={280}
					barcodeFinderHeight={220}
					barcodeFinderBorderColor="red"
					barcodeFinderBorderWidth={2}
					onBarCodeRead={this.onBarCodeRead.bind(this)}
				/>
				<View style={[styles.overlay, styles.topOverlay]}>
					<Text style={styles.scanScreenMessage}>
						
					</Text>
				</View>
				<View style={[styles.overlay, styles.bottomOverlay]}>
				</View>
			</View>
		);
	}
	defaultStyles() {
		return {
			container: {
				flex: 1
			},
			preview: {
				flex: 1,
				justifyContent: 'flex-end',
				alignItems: 'center'
			},
			overlay: {
				position: 'absolute',
				padding: 16,
				right: 0,
				left: 0,
				alignItems: 'center'
			},
			topOverlay: {
				top: 0,
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center'
			},
			bottomOverlay: {
				bottom: 0,
				backgroundColor: 'rgba(0,0,0,0.4)',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center'
			},
			enterBarcodeManualButton: {
				padding: 15,
				backgroundColor: 'white',
				borderRadius: 40
			},
			scanScreenMessage: {
				fontSize: 14,
				color: 'white',
				textAlign: 'center',
				alignItems: 'center',
				justifyContent: 'center'
			},
			backBtn: {
				backgroundColor:'#629c12'
			  },
		};

  }
  

}



    
    export const mapStateToProps = (state) => {
    
        return {
			user: state.user,
		  eventscanner:state.eventscanner,
		  eventattendee: state.eventattendee.msg,
        }
      }
      
    export default connect(mapStateToProps)(EventScanner);