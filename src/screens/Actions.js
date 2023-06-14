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
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";

const Actions = ({ navigation, route }) => {
  const [person, setPerson] = useState();
  const [wordCount, setWordCount] = useState();
  const [sentiment, setSentiment] = useState();
  const [accFm, setAccFm] = useState();

  const { selectedFile, fileDataState } = route.params;

  useEffect(() => {
    //fonksiyonları burada çağır
    const vawFile = handleBase64();
    console.log("vawFile", vawFile);
  }, []);

  console.log("fileData", fileDataState);
  console.log("x", fileDataState._parts[0][1].uri);
  const fileUri = fileDataState._parts[0][1].uri;
  const handleBase64 = async () => {
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: "base64",
    });

    return fileBase64;
  };

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
