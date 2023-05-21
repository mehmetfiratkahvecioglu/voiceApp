import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { useState } from "react";

const Actions = ({ navigation, route }) => {
  const { selectedFile } = route.params;
  const [person, setPerson] = useState();
  const [wordCount, setWordCount] = useState();
  const [sentiment, setSentiment] = useState();
  const [accFm, setAccFm] = useState();
  return (
    <ImageBackground
      source={require("../../assets/voiceBackground.jpeg")}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.innerContainer}>
        <Text style={{ color: "#FAFAFA", fontSize: 18, fontWeight: "bold" }}>
          Seçilen Dosya: {selectedFile}
        </Text>
        <Text style={{ color: "#FAFAFA", fontSize: 18, fontWeight: "bold" }}>
          Kişi: {person}
        </Text>
        <Text style={{ color: "#FAFAFA", fontSize: 18, fontWeight: "bold" }}>
          Kelime Sayısı: {wordCount}
        </Text>
        <Text style={{ color: "#FAFAFA", fontSize: 18, fontWeight: "bold" }}>
          Duygu Tahmini: {sentiment}
        </Text>
        <Text style={{ color: "#FAFAFA", fontSize: 18, fontWeight: "bold" }}>
          Acc Fm Değeri: {accFm}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Actions;

const styles = StyleSheet.create({
  innerContainer: {
    width: screenWidth * 0.8,
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
    borderRadius: 20,
    minHeight: screenHeight * 0.5,
    justifyContent: "space-around",
  },
  pickFileButton: {
    backgroundColor: "#1565C0",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButton: {
    backgroundColor: "#FAFAFA",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
