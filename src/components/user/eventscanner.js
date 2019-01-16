import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from "react-redux";
import { TicketCheck } from "../../actions/eventscanner";
import { Header, Left, Body, Button, Title, Icon, Right } from "native-base";
import colors from "../../styles/colors";

import BarcodeScanner from "../scanning/Scanner";
var MessageBarAlert = require("react-native-message-bar").MessageBar;
var MessageBarManager = require("react-native-message-bar").MessageBarManager;
type Props = {};
// BackHandler.addEventListener("hardwareBackPress", function() {
//   // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
//   // Typically you would use the navigator here to go to the last state.

//   this.goBack();
//   return true;
// });
BackHandler.addEventListener("hardwareBackPress", function() {
  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

  if (!this.onMainScreen()) {
    this.goBack();
    return true;
  }
  return false;
});
class EventScanner extends Component<Props> {
  static navigationOptions = {
    title: "EventScanner"
  };
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      showcheckAlert: false,
      isOpenLight: false,
      isEnableCameraScan: true,
      scanInterval: 6500,
      callbackButton: "Show Alert with Avatar and Callback (Error Type)"
    };
  }
  showcheckAlert = () => {
    this.setState({
      showcheckAlert: true
    });
  };
  hidecheckAlert = () => {
    this.setState({
      showcheckAlert: false
    });
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    MessageBarManager.unregisterMessageBar();
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  handleBackPress = () => {
    this.goBack(); // works best when the goBack is async
    return true;
  };
  goBack() {
    this.props.history.goBack();
  }

  componentDidUpdate() {
    if (this.props.eventscanner.status == 2) {
      this.showCheckinAlreadyAlertWithAvatar();
    } else if (this.props.eventscanner.status == 0) {
      this.showAlertWithAvatar();
    }
    if (this.props.eventscanner.status == 1) {
      this.showCheckinSuccesAlertWithAvatar();
    }
  }

  showCheckinAlreadyAlertWithAvatar() {
    MessageBarManager.showAlert({
      position: "bottom",
      title: "Divya Patel",
      duration: 5000,
      message: "Already checked in",
      avatar:
        "https://image.freepik.com/free-icon/super-simple-avatar_318-1018.jpg",
      alertType: "info"
    });
  }

  showCheckinSuccesAlertWithAvatar() {
    MessageBarManager.showAlert({
      position: "bottom",
      title: "Divya Patel",
      duration: 5000,
      message: "CheckIn Successfully",
      avatar:
        "https://image.freepik.com/free-icon/super-simple-avatar_318-1018.jpg",
      alertType: "success"
    });
  }
  showAlertWithAvatar() {
    // Simple show the alert with the manager
    MessageBarManager.showAlert({
      position: "bottom",
      title: "",
      duration: 5000,
      message: "Barcode not found in this event",
      avatar:
        "https://image.freepik.com/free-icon/super-simple-avatar_318-1018.jpg",
      alertType: "info"
    });
  }

  showAlertFromThrowError() {
    try {
      // Do something risky
      throw new Error(
        "This is a custom error message.\rThis message is shown from a throw new Error.\rYou can use this technique to catch any error in try/catch block or in promises."
      );
    } catch (error) {
      this.handleError(error);
    }
  }
  handleError(error) {
    MessageBarManager.showAlert({
      title: "Error",
      message: error.message,
      alertType: "error",
      messageNumberOfLines: 0
    });
  }

  customCallback() {
    console.log("Alert Tapped. Triggered as a callback");
    this.setState({
      callbackButton: "Alert Tapped. Triggered as a callback"
    });
  }

  hideCurrentAlert() {
    // Hide the current alert bar
    // MessageBarManager.hideAlert()
  }

  alertShow() {
    console.log("Alert is shown. Triggered as a callback");
  }

  alertHide() {
    console.log("Alert is now hidden. Triggered as a callback");
  }
  onBarCodeRead(res) {
    const { eventId } = this.props.location.state;
    this.props.dispatch(TicketCheck(this.props.user.msg, eventId, res.data));
  }

  render() {
    <MessageBarAlert ref="alert" />;
    const styles = this.defaultStyles();
    const props = this.props;

    return (
      <View style={styles.container}>
        <Header
          style={styles.backBtn}
          iosStatusbar={colors.statusBar}
          androidStatusBarColor={colors.statusBar}
        >
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              style={styles.backArrowBtn}
              onPress={() => this.goBack()}
            >
              <Icon
                name={
                  Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"
                }
                style={{ color: "rgb(255,255,255)", fontSize: 30 }}
              />
              {/* <Icon name="ios-arrow-back" color="#FFF" fontSize="150" /> */}
            </Button>
          </Left>

          <Body
            style={{ flex: 4, justifyContent: "center", alignItems: "center" }}
          >
            <Title
              style={{
                color: "#FFFF",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              Event Scanner
            </Title>
          </Body>
        </Header>

        <BarcodeScanner
          onBarCodeRead={data => this.onBarCodeRead.call(this, data)}
        />

        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage} />
        </View>
        <MessageBarAlert ref="alert" />
      </View>
    );
  }

  defaultStyles() {
    return {
      container: {
        flex: 1,
        justifyContent: "center"
      },
      preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
      },
      overlay: {
        position: "absolute",
        padding: 16,
        right: 0,
        left: 0,
        alignItems: "center"
      },
      topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      bottomOverlay: {
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      },
      enterBarcodeManualButton: {
        padding: 15,
        backgroundColor: "white",
        borderRadius: 40
      },
      scanScreenMessage: {
        fontSize: 14,
        color: "white",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
      },
      backBtn: {
        backgroundColor: colors.purpleTheme
      },
      backArrowBtn: {
        backgroundColor: colors.purpleTheme,
        marginBottom: 5
      }
    };
  }
}

export const mapStateToProps = state => {
  return {
    user: state.user,
    eventscanner: state.eventscanner,
    eventattendee: state.eventattendee.msg
  };
};

export default connect(mapStateToProps)(EventScanner);
