import React, { Component } from "react";
import {
  Platform,
  Text,
  Image,
  View,
  Animated,
  BackHandler,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import AwesomeAlert from "react-native-awesome-alerts";
import Dimensions from "Dimensions";
import { Link } from "react-router-native";
import PTRControl from "react-native-ptr-control";
import { fetchEvents } from "./src/actions/feed";
const { width, height } = Dimensions.get("window");
import SplashScreen from "react-native-splash-screen";
import styles from "./src/styles/event";
import { fetchListEvents } from "./src/actions/eventdetails";
import { destroySession } from "./src/actions";
import Card from "./src/components/cardview/Card";
import Moment from "moment";
import colors from "./src/styles/colors";
import { Header, Right, Body, Button, Title, Icon } from "native-base";

import ToolbarComponent from "react-native-toolbar-component";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false
    };
    this.id = "";
    this.eventId = "";
    this.springValue = new Animated.Value(100);
  }

  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }
  async componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this.props.dispatch(fetchEvents(this.props.user.msg));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  onTextPress = (eventId, UsrId) => {
    this.props.dispatch(fetchListEvents(UsrId, eventId));
  };

  Logout() {
    this.showAlert();
  }

  _spring() {
    this.setState({ backClickCount: 1 }, () => {
      Animated.sequence([
        Animated.spring(this.springValue, {
          toValue: -0.15 * height,
          friction: 5,
          duration: 450,
          useNativeDriver: true
        }),
        Animated.timing(this.springValue, {
          toValue: 100,
          duration: 450,
          useNativeDriver: true
        })
      ]).start(() => {
        this.setState({ backClickCount: 0 });
      });
    });
  }

  handleBackButton = () => {
    this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();

    return true;
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
  ListEmptyView = () => {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 30 }}> Sorry, No Records found.</Text>
      </View>
    );
  };

  render() {
    Moment.locale("en");
    const { showAlert } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Header
          style={styles.backBtn}
          iosStatusbar={colors.statusBar}
          androidStatusBarColor={colors.statusBar}
        >
          <Body
            style={{ flex: 4, justifyContent: "center", alignItems: "center" }}
          >
            <Title
              style={{
                color: "#FFF",
             
              }}
            >
              Dashboard
            </Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              style={styles.logoutBtn}
              onPress={() => this.Logout()}
            >
              <Icon
                name={Platform.OS === "ios" ? "ios-log-out" : "md-log-out"}
                style={{ color: "rgb(255,255,255)", fontSize: 30 }}
              />
            </Button>
          </Right>
        </Header>

        <PTRControl
          showsVerticalScrollIndicator={false}
          //here is the props of lib provide
          scrollComponent={"FlatList"}
          data={this.props.feed}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          renderItem={({ item }) => (
            <Link
              to={{
                pathname: "/eventdetail",
                state: { eventId: item.eventId }
              }}
            >
              <View style={styles.listContainer}>
                {/* <Card>
                  <CardImage>
                    <Image
                      resizeMode="cover"
                      style={styles.imageStyle}
                      source={{
                        uri: "https://getmdl.io/assets/demos/image_card.jpg"
                      }}
                    />
                  </CardImage>
                  <CardTitle>
                    <Text style={styles.title}>{item.event_title}</Text>
                  </CardTitle>
                  <CardContent>
                    <Text>
                      {" "}
                      {"On " +
                        Moment(item.event_start_date_time).format(
                          "MMM DD,YYYY hh:mm a"
                        )}
                    </Text>
                  </CardContent>
                </Card> */}
                <Card
                  imageUrl="https://getmdl.io/assets/demos/image_card.jpg"
                  title={item.event_title}
                  date={
                    "On " +
                    Moment(item.event_start_date_time).format(
                      "MMM DD,YYYY hh:mm a"
                    ) +
                    " at " +
                    item.vanue_name.replace(/<(.|\n)*?>/g, "")
                  }
                  // date={
                  //           Moment(item.event_start_date_time).format(
                  //             "MMM DD,YYYY hh:mm a"
                  //           )}

                  marked={true}
                />
              </View>
            </Link>
          )}
          keyExtractor={item => item.event_title}
          ListEmptyComponent={this.ListEmptyView}
        />
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Ticketing Soft"
          message="Do you really want to Logout?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, I want to Logout"
          confirmButtonColor={colors.purpleTheme}
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.props.dispatch(destroySession());
          }}
        />
        <Animated.View
          style={[
            styles.animatedView,
            { transform: [{ translateY: this.springValue }] }
          ]}
        >
          <Text style={styles.exitTitleText}>
            press back again to exit the app
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => BackHandler.exitApp()}
          >
            <Text style={styles.exitText}>Exit</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

export const mapStateToProps = state => {
  return {
    user: state.user,
    feed: state.feed.all_events
  };
};

export default connect(mapStateToProps)(App);
