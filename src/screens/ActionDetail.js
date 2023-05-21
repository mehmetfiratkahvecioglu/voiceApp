import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
screenWidth = Dimensions.get("window").width;
screenHeight = Dimensions.get("window").height;
const ActionDetail = ({ navigation, route }) => {
  const action = route.params.action;
  return (
    <ImageBackground
      source={require("../../assets/voiceBackground.jpeg")}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={{ color: "white" }}>{action}</Text>
      </View>
    </ImageBackground>
  );
};

export default ActionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: screenWidth * 0.8,
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
    borderRadius: 20,
    minHeight: screenHeight * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
