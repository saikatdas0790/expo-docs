import React, { useState } from "react";
import { Image, StyleSheet, Text, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from "anonymous-files";
import Button from "./Button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) return;

    if (Platform.OS === "web") {
      const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }
  };

  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync()))
      return alert(
        `The image is available for sharing at : ${selectedImage.remoteUri}`
      );

    Sharing.shareAsync(selectedImage.remoteUri || selectedImage.localUri);
  };

  return selectedImage ? (
    <View style={styles.container}>
      <Image
        source={{ uri: selectedImage.localUri }}
        style={styles.thumbnail}
      ></Image>
      <Button
        onPress={openShareDialogAsync}
        textToShow="Share this photo"
      ></Button>
      <Button
        onPress={() => setSelectedImage(null)}
        textToShow="Clear selected image"
      ></Button>
    </View>
  ) : (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={styles.logo}
      ></Image>
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>
      <Button onPress={openImagePickerAsync} textToShow="Pick a photo"></Button>
    </View>
  );
}
