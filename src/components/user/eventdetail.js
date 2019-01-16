import React, { Component } from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  BackHandler,
  View,
  AsyncStorage,
  StyleSheet,
  Animated
} from "react-native";
import { connect } from "react-redux";
import stylesMain from "../../styles/main";
import colors from "../../styles/colors";
import { Link } from "react-router-native";
import { fetchListEvents } from "../../actions/eventdetails";
import Spinner from "react-native-loading-spinner-overlay";
import ProgressCircle from "react-native-progress-circle";
import Moment from "moment";
import { Header, Left, Body, Button, Title, Icon } from "native-base";
type Props = {};

class Progressbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.animation = new Animated.Value(this.props.progress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.progress != this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration
      }).start();
    }
  }
  render() {
    const {
      height,
      borderColor,
      borderRadius,
      borderWidth,
      barColor,
      fillColor
    } = this.props;

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    });

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          height
        }}
      >
        <View
          style={{
            flex: 1,
            borderColor,
            borderWidth,
            borderRadius
          }}
        >
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: fillColor }]}
          />
          <Animated.View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: widthInterpolated,
              backgroundColor: barColor
            }}
          />
        </View>
      </View>
    );
  }
}
Progressbar.defaultProps = {
  height: 15,
  borderColor: "#000",
  borderWidth: 1,
  borderRadius: 4,
  barColor: colors.purpleTheme,
  fillColor: "#fff"
};

BackHandler.addEventListener("hardwareBackPress", function() {
  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

  this.goBack();
  return true;
});
var newprogressid;
var secondprogressid;
class EventDetail extends Component<Props> {
  state = {
    spinner: false
  };
  state = {
    uniqueValue: 1
  };

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      progress: 0.5,
      isHidden: false
    };
  }
  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    }));
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.goBack(); // works best when the goBack is async
    return true;
  };
  async componentWillMount() {
    const { eventId } = this.props.location.state;
    this.props.dispatch(fetchListEvents(this.props.user.msg, eventId));
    AsyncStorage.setItem("eventId", eventId);

    this.setState({
      spinner: true
    });
    setTimeout(() => {
      this.setState({
        spinner: false
      });
    }, 2500);
  }

  goBack() {
    this.props.history.goBack();
  }
  render() {
    let data = this.props.eventdetails;

    if (data.count_of_ticket == 0) {
      newprogressid = 0;
    } else {
      newprogressid = (data.sold / data.count_of_ticket) * 100;
    }

    if (data.count_attendee == 0) {
      secondprogressid = 0;
    } else {
      secondprogressid =
        (data.count_checkin_attendee / data.count_attendee) * 100;
    }
    Moment.locale("en");

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={StyleSheet.spinnerTextStyle}
        />
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
              {/* <Icon name="ios-arrow-back" color="#FFF" fontSize="150" /> */}
            </Button>
          </Left>
          <Body
            style={{ flex: 4, justifyContent: "center", alignItems: "center" }}
          >
            <Title
              style={{
                color: "#FFFF",
               
              }}
            >
              Event Detail
            </Title>
          </Body>
        </Header>
        <View style={stylesMain.verticalGroup}>
          <Text style={styles.name}>{data.event_title}</Text>

          {/* <Text style={styles.overView}>
            {"On " +
              Moment(data.event_start_date_time).format("MMM DD,YYYY hh:mm a")}
          </Text> */}
          <Text style={styles.overView}>
            {"From " +
              Moment(data.event_start_date_time).format("MMM DD,YYYY hh:mm a") +
              " To " +
              Moment(data.event_end_date_time).format(
                "MMM DD,YYYY hh:mm a"
              )}{" "}
          </Text>
          <View style={styles.horizontalGroup}>
            <View style={styles.progressContainer}>
              <ProgressCircle
                percent={newprogressid}
                radius={40}
                borderWidth={4}
                color="#5acf87"
                shadowColor="#f7f7f7"
                bgColor="#fff"
              >
                <Text style={{ fontSize: 18 }}>
                  {newprogressid.toFixed(0) + "%"}
                </Text>
              </ProgressCircle>
            </View>
            <View style={styles.verticalGroup}>
              <Text style={styles.name}>{"Tickets Sold"}</Text>
              <Text style={styles.overView}>
                {data.sold + "/" + data.event_capacity}
              </Text>
            </View>
          </View>

          <View style={styles.horizontalGroup}>
            <View style={styles.progressContainer}>
              <ProgressCircle
                percent={secondprogressid}
                radius={30}
                borderWidth={4}
                color="#5acf87"
                shadowColor="#f6f6f6"
                bgColor="#fff"
              >
                <Text style={{ fontSize: 18 }}>
                  {secondprogressid.toFixed(0) + "%"}
                </Text>
              </ProgressCircle>
            </View>
            <View style={styles.verticalGroup}>
              <TouchableOpacity onPress={this.goBack}>
                <Text style={styles.name}>{"Attendance"}</Text>
              </TouchableOpacity>
              <Text style={styles.overView}>
                {data.count_checkin_attendee + "/" + data.count_attendee}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.btnView}>
          <Link
            to={{ pathname: "/eventattendee", state: { eventId: data.id } }}
          >
            <Text style={styles.btnText}>Check In</Text>
          </Link>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  h2text: {
    marginLeft: 20,
    marginTop: 10,
    fontFamily: "Helvetica",
    fontSize: 36,
    fontWeight: "bold"
  },
  flatview: {
    justifyContent: "center",
    paddingTop: 10,
    marginLeft: 10,
    borderRadius: 2
  },
  name: {
    alignItems: "center",
    fontFamily: "Verdana",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20
  },
  overView: {
    fontFamily: "Verdana",
    fontSize: 14,
    marginTop: 10,
    marginLeft: 20
  },
  htmlText: {
    width: 250,
    height: 100
  },
  verticalfirstprogressbar: {
    alignItems: "center",
    flexDirection: "row",

    marginTop: 5
  },
  overviewtext: {
    color: "black",
    marginLeft: 10,
    marginTop: 10
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 90
  },
  progressContainer: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 55
  },
  btnContainer: {
    flex: 1,

    justifyContent: "flex-end",
    marginBottom: 0
  },
  button: {
    backgroundColor: "#1E6738"
  },
  bottomView: {
    width: "100%",
    height: 40,
    backgroundColor: colors.purpleTheme,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  toolbar: {
    backgroundColor: colors.purpleTheme,
    height: 50,
    alignSelf: "stretch"
  },

  textStylen: {
    color: "#fff",
    fontSize: 22
  },
  backBtn: {
    backgroundColor: colors.purpleTheme
  },
  spinnerTextStyle: {
    color: "#ffffff"
  },
  horizontalGroup: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center"
  },
  btnView: {
    height: 50,
    backgroundColor: "#5acf87",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold"
  }
});
export const mapStateToProps = state => {
  return {
    user: state.user,
    eventdetails: state.eventdetails.event
  };
};
export default connect(mapStateToProps)(EventDetail);
