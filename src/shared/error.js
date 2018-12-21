import React, {Component} from 'react';
import {Modal, Text, ScrollView, TouchableHighlight, View, Alert} from 'react-native';
import {connect} from 'react-redux';

import {hideError} from '../../actions';

class Error extends Component {
  render() {
    return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={this.props.error.status}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
        <ScrollView style={{margin: 40}}>
          <View>
            <Text>{this.props.error.message}</Text>

            <TouchableHighlight
            onPress={() => {
              this.props.dispatch(hideError())
            }}>
            <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    error: state.error,
    user: state.user
  }
}

export default connect(mapStateToProps)(Error);
