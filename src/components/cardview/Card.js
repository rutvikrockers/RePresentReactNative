import React from "react";
import { View, Text, ImageBackground} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Separator from "./Separator";
import TextIcon from "./TextIcon";
import BackgroundImageWithIcon from "./BackgroundImageWithIcon";

const Card = ({
  title = "",
  date = "",
  address = "",
  info = "",
  marked = false,
  imageUrl = null
}) => (
  <View style={styles.card}>
    <View style={styles.cardHead}>
    <BackgroundImageWithIcon marked={marked} imageUrl={imageUrl} />
  
    </View>
    <View style={styles.cardBody}>
      <View style={styles.bodyHeader}>
        <Text numberOfLines={1} style= {{ fontWeight: "700",
        paddingTop:5,
    paddingLeft: 18,
    paddingRight: 18,
    fontSize: 16,
    }}>
          {title}
        </Text>
        <Text numberOfLines={2} style= {{
    paddingLeft: 18,
    paddingRight: 18,
    fontSize: 12,
    }}>
          {date}
        </Text>
        <Text numberOfLines={1} style={styles.textAddress}>
          {address}
        </Text>
      </View>
      <Separator />
      <View style={styles.bodyIcons}>
        
       
      </View>
      <Separator />
      <View style={styles.cardFooter}>
        <Text numberOfLines={2} style={styles.textFooter}>
          {info}
        </Text>
      </View>
    </View>
  </View>
);

Card.prpTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  address: PropTypes.string,
  info: PropTypes.string,
  imageUrl: PropTypes.string
};

export default Card;