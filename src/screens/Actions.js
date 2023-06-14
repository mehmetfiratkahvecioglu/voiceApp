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
const Actions = ({ navigation, route }) => {
  const [person, setPerson] = useState();
  const [wordCount, setWordCount] = useState();
  const [sentiment, setSentiment] = useState();
  const [accFm, setAccFm] = useState();

  const { selectedFile, fileDataState } = route.params;

  useEffect(() => {

    //fonksiyonları burada çağır
    const audioURI = fileDataState._parts[0][1].uri;
    const uploadAudio = async (url) => {
      try {
        const formData = new FormData();
        formData.append('audio_file', {
          uri: audioURI,
          type: 'audio/wav',
          name: fileDataState._parts[0][1].name
        });
    
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    //uploadAudio("http://10.0.2.2:5000/api/histogram");
    //uploadAudio("http://10.0.2.2:5000/api/recognition");
    uploadAudio("http://10.0.2.2:5000/api/transcription");
    //uploadAudio("http://10.0.2.2:5000/api/predict-emotion");
    
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
