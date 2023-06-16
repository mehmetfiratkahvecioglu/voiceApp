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
import axios from "axios";
import * as FileSystem from "expo-file-system";

const Actions = ({ navigation, route }) => {
  const [image64, setImage64] = useState();
  const { fileDataState } = route.params;

  screenWidth = Dimensions.get("window").width;
  screenHeight = Dimensions.get("window").height;
  useEffect(() => {
    //fonksiyonları burada çağır
    const audioURI = fileDataState._parts[0][1].uri;
    const uploadAudio = async (url, setState) => {
      try {
        const formData = new FormData();
        formData.append("audio_file", {
          uri: audioURI,
          type: "audio/wav",
          name: fileDataState._parts[0][1].name,
        });

        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setState(response);

        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    //uploadAudio("http://10.0.2.2:5000/api/histogram",setImage64);

    axios
      .get(`http://10.0.2.2:5000/api/accfm`)
      .then(function (response) {
        setAccFm(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
          SA hasanım nbr
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
    height: screenHeight * 0.9,
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
