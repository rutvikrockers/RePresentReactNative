import React, { Component } from "react";
import {
  Platform,
  Text,
  BackHandler,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import { connect } from "react-redux";
import { fetchAttendeeSingle } from "../../actions/attendeesingle";
import { Link } from "react-router-native";
import styles from "../../styles/eventattendee";
import { SwipeListView } from "react-native-swipe-list-view";
import { fetchAttendeeEventList } from "../../actions/eventattendee";
import Spinner from "react-native-loading-spinner-overlay";
import AwesomeAlert from "react-native-awesome-alerts";
import { Header, Left, Body, Button, Title, Icon } from "native-base";
import colors from "../../styles/colors";
import Toast, { DURATION } from "react-native-easy-toast";

type Props = {};
var attenddeIDs;
var eventIDs;
BackHandler.addEventListener("hardwareBackPress", function() {
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
  constructor(props) {
    super(props);

    this.id = "";
    this.state = {
      textValue: "CheckIn",
      showAlert: false,
      showcheckAlert: false,
      uniqueValue: 1
    };
  }
  forceRemount = () => {
    this.props.dispatch(fetchAttendeeEventList(this.props.user.msg, eventIDs));
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    }));
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    const { eventId } = this.props.location.state;
    eventIDs = eventId;
    this.props.dispatch(fetchAttendeeEventList(this.props.user.msg, eventIDs));
    this.setState({
      spinner: true
    });
    setTimeout(() => {
      this.setState({
        spinner: false
      });
    }, 2500);
  }
  handleBackPress = () => {
    this.goBack(); // works best when the goBack is async
    return true;
  };
  goBack() {
    this.props.history.goBack();
  }

  onCheckInButtonPress = (id, event_id, attendee_id, checkin_status) => {
    attenddeIDs = attendee_id;
    console.log("onCheck AttendeeID ::", attenddeIDs);
    this.showcheckAlert();
  };
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
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  onUnCheckInButtonPress = (id, event_id, attendee_id, checkin_status) => {
    attenddeIDs = attendee_id;
    this.showAlert();
  };
  onActionSelected(position) {
    if (position === 0) {
      this.gotoeventscanner();
    }
  }
  ListEmptyView = () => {
    if (this.props.eventattendee.length == 0) {
    }
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 30 }}> Sorry, No Records found.</Text>
      </View>
    );
  };

  render() {
    const { eventId } = this.props.location.state;

    let attendee_id;
    let id;
    const { showAlert } = this.state;
    const { showcheckAlert } = this.state;

    return (
      <View style={styles.container} key={this.state.uniqueValue}>
        <Spinner visible={this.state.spinner} />

        <Header
          style={styles.backBtn}
          iosStatusbar={colors.statusBar}
          androidStatusBarColor={colors.statusBar}
        >
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              style={styles.backBtn}
              onPress={() => this.goBack()}
            >
              <Icon
                name={
                  Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"
                }
                style={{ color: "rgb(255,255,255)", fontSize: 30 }}
              />
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
              Event Attendee
            </Title>
          </Body>
        </Header>
        {this.props.eventattendee ? (
          <SwipeListView
            useFlatList
            style={{ marginBottom: 40 }}
            data={this.props.eventattendee}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={
                  item.checkin_status == 1
                    ? styles.rowFront
                    : styles.rowUncheckFront
                }
              >
                <View style={styles.horizontalGroup}>
                  <Icon size={50} name="md-contact" style={styles.avatar} />
                  <View style={styles.verticalattendeeGroup}>
                    <Text style={styles.cardattendeeCategory}>
                      {item.first_name.replace(/\\/g, "") +
                        " " +
                        item.last_name.replace(/\\/g, "")}
                    </Text>
                    <Text style={styles.emailTitle}>{item.email}</Text>
                    <Text style={styles.ticketstyle}>{"#" + item.id}</Text>
                  </View>
                  <View
                    key={
                      ((id = item.user_id),
                      item.event_id,
                      (attendee_id = item.id),
                      item.checkin_status)
                    }
                  />
                </View>
              </View>
            )}
            renderHiddenItem={({ item }) => (
              <View style={styles.rowLeftBack}>
                <TouchableOpacity
                  style={styles.backRightBtnLeft}
                  onPress={_ =>
                    this.onUnCheckInButtonPress(
                      item.user_id,
                      item.event_id,
                      item.id,
                      item.checkin_status
                    )
                  }
                >
                  <Text style={styles.uncheckinstyle}>Uncheck</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={_ =>
                    this.onCheckInButtonPress(
                      item.user_id,
                      item.event_id,
                      item.id,
                      item.checkin_status
                    )
                  }
                >
                  <Text style={styles.checkinstyle}>CheckIn</Text>
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
            keyExtractor={item => item.id}
          />
        ) : null}
        <AwesomeAlert
          show={showcheckAlert}
          showProgress={false}
          title="Check In Status"
          message="Are you Really want to CheckIn?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, I want to CheckIn"
          confirmButtonColor={colors.purpleTheme}
          onCancelPressed={() => {
            this.hidecheckAlert();
          }}
          onConfirmPressed={() => {
            this.props.dispatch(
              fetchAttendeeSingle(id, eventId, attenddeIDs, 1)
            );
            this.refs.toast.show("CheckIn succesfully!", DURATION.LENGTH_SHORT);
            this.hidecheckAlert();

            this.forceRemount();
          }}
        />
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Check In Status"
          message="Are you Really want to Uncheck?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, I want to Uncheck"
          confirmButtonColor="#FF0000"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.props.dispatch(
              fetchAttendeeSingle(id, eventId, attenddeIDs, 0)
            );
            this.refs.toast.show("UnCheck succesfully!", DURATION.LENGTH_SHORT);
            this.hideAlert();

            this.forceRemount();
          }}
        />

        <View style={styles.bottomView}>
          <Link to={{ pathname: "/eventscanner", state: { eventId: eventId } }}>
            <Text style={styles.textStylen}>Scanner</Text>
          </Link>
        </View>
        <Toast ref="toast" />
      </View>
    );
  }
}
export const mapStateToProps = state => {
  return {
    user: state.user,
    eventattendee: state.eventattendee.msg,
    attendeesingle: state.attendeesingle
  };
};

export default connect(mapStateToProps)(EventAttendee);
