import { StatusBar } from "expo-status-bar";
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
import * as DocumentPicker from "expo-document-picker";
import { useState, Fragment } from "react";
import * as FileSystem from "expo-file-system";

screenWidth = Dimensions.get("window").width;
screenHeight = Dimensions.get("window").height;

export default function Home({ navigation }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: false,
      });

      if (result.type === "success") {
        const { name, uri } = result;
        const fileInfo = await FileSystem.getInfoAsync(uri);
        const fileExtension = name.split(".").pop().toLowerCase();

        if (fileExtension === "wav" && fileInfo.exists) {
          setSelectedFile(name);
        } else {
          setSelectedFile(null);
          console.log("Geçerli bir WAV dosyası seçiniz.");
        }
      } else {
        setSelectedFile(null);
      }
    } catch (error) {
      console.log("Hata:", error);
    }
  };

  const handleContinue = () => {
    navigation.navigate("Actions", { selectedFile });
  };

  return (
    <ImageBackground
      source={require("../../assets/voiceBackground.jpeg")}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text
              style={{ color: "#FAFAFA", fontSize: 20, fontWeight: "bold" }}
            >
              Ses Tahmin Uygulaması
            </Text>
          </View>
          <Pressable onPress={pickFile} style={styles.pickFileButton}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              {selectedFile ? "Başka Bir Dosya Seç" : "Dosya Seç"}
            </Text>
          </Pressable>
          {selectedFile && (
            <View style={styles.fileContainer}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Seçilen Dosya: {selectedFile}
              </Text>
            </View>
          )}
          {selectedFile && (
            <Pressable onPress={handleContinue} style={styles.continueButton}>
              <Text
                style={{ color: "#1565C0", fontSize: 18, fontWeight: "bold" }}
              >
                Devam
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: screenWidth * 0.8,
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
    borderRadius: 20,
    minHeight: screenHeight * 0.5,
    justifyContent: "space-evenly",
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
  fileContainer: {
    backgroundColor: "#78909C",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 0, 0, 0.4);",
    padding: 10,
    borderRadius: 10,
  },
});
