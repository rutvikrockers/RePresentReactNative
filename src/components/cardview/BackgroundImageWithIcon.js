import React from "react";
import { ImageBackground, Text } from "react-native";
import PropTypes from "prop-types";


import styles from "./styles";
const borderRadius = 10;
const BackgroundImageWithIcon = ({
   imageUrl = "https://getmdl.io/assets/demos/image_card.jpg" }) => (
    <ImageBackground
    source={{ uri: imageUrl }}
  
    style={{ width: "100%",
    height:250,
     borderBottomLeftRadius:borderRadius,
     borderBottomRightRadius:borderRadius,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius}}
    resizeMode="cover"
  >
   
  </ImageBackground>
   


);

BackgroundImageWithIcon.propTypes = {
  imageUrl: PropTypes.string,
  marked: PropTypes.bool
};

export default BackgroundImageWithIcon;