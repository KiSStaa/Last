import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { RNCamera } from "react-native-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";

const App = () => {
  const [isFrontCamera, setFrontCamera] = useState(false);
  const cameraRef = useRef(null);

  const switchCamera = () => {
    setFrontCamera(!isFrontCamera);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  const pickImage = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        console.log(response.uri);
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1 }}
        type={
          isFrontCamera
            ? RNCamera.Constants.Type.front
            : RNCamera.Constants.Type.back
        }
        ref={cameraRef}
      >
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <TouchableOpacity onPress={switchCamera} style={{ margin: 16 }}>
            <Icon name="refresh" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={{ marginBottom: 30 }}>
            <Icon name="camera" size={60} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <Text style={{ color: "white", fontSize: 20 }}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
};

export default App;
