import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet } from "react-native";

const borderRadius = 10;

const styles = EStyleSheet.create({
  card: {
    flex: -1,
      borderRadius:10,
    margin: 14
  },
  cardHead: {
    height: "40%"
  },
  
  cardBody: {
    backgroundColor: "white",
    height: "60%",
    borderWidth: 0.5,
    borderColor: "#D3D3D3",
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius
  },
  bodyHeader: {
    height: 150,
    padding: 20,
     
    justifyContent: "space-between"
  },
  textTitle: {
    fontWeight: "400",
    
    paddingLeft: 18,
    fontSize: 25,
    paddingBottom: 10
  },
  textPrice: {
    fontWeight: "600",
    fontSize: 24,
    paddingLeft: 18,
    paddingBottom: 10
  },
  textAddress: {
    paddingBottom: 10
  },
  separator: {
    backgroundColor: "#D3D3D3",
    height: 1.5
  },
  bodyIcons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textIcon: {
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    paddingRight: 20
  },
  imageIcon: {
    alignSelf: "flex-end",
    padding: 20
  },
  cardFooter: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: "#e5e5e5",
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    justifyContent: "center"
  },
  textFooter: {
    fontWeight: "400",
    paddingHorizontal: 20,
   
    fontSize: 24
  }
});

export default styles;