import React, {Component} from 'react';
import {Animated, Keyboard} from 'react-native';
import styles from '../../../styles/main';

const withKeyboardHideShow = WrappedComponent =>
  class KeyboardHideShow extends Component {
    constructor(props) {
      super(props);
      this.keyboardHeight = new Animated.Value(0);
      this.keyboardWillShow = this.keyboardWillShow.bind(this);
      this.keyboardWillHide = this.keyboardWillHide.bind(this);
    }

    componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener(
        'keyboardWillShow',
        this.keyboardWillShow,
      );
      this.keyboardWillHideSub = Keyboard.addListener(
        'keyboardWillHide',
        this.keyboardWillHide,
      );
    }

    componentWillUnmount() {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
    }

    keyboardWillShow(event) {
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }).start();
    }

    keyboardWillHide(event) {
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }).start();
    }

    render() {
      return (
        <Animated.View
          style={[styles.container, {paddingBottom: this.keyboardHeight}]}>
          <WrappedComponent />
        </Animated.View>
      );
    }
  };

export default withKeyboardHideShow;
