import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

const TextIcon = ({ icon, text }) => (
  <View style={styles.textIcon}>
    <Icon style={styles.icon} name={icon} size={30} color="#000" />
    <Text>{text}</Text>
  </View>
);

TextIcon.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string
};

export default TextIcon;