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
  const [accFm, setAccFm] = useState();
  const [speaker, setSpeaker] = useState();
  const [sentence, setSentence] = useState();
  const [emotion, setEmotion] = useState();
  const [image64, setImage64] = useState();

  const { selectedFile, fileDataState } = route.params;

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

        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    //uploadAudio("http://10.0.2.2:5000/api/histogram",setImage64);
    //uploadAudio("http://10.0.2.2:5000/api/recognition",setSpeaker);
    uploadAudio("http://10.0.2.2:5000/api/transcription", setSentence);
    //uploadAudio("http://10.0.2.2:5000/api/predict-emotion",setEmotion);

    /*axios
          .get(`http://10.0.2.2:5000/api/accfm`)
          .then(function (response) {
            console.log("response",response.data);
          })
          .catch(function (error) {
            console.log(error);
          });*/
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
          Kişi: {speaker}
        </Text>
        <Text style={{ color: "#FAFAFA", fontSize: 18, fontWeight: "bold" }}>
          Cümle, kelime sayısı : {sentence} {sentence}
        </Text>
        <Text style={{ color: "#FAFAFA", fontSize: 18, fontWeight: "bold" }}>
          Duygu Tahmini: {emotion}
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
