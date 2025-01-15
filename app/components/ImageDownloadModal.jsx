import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { ArrowDownTrayIcon, XMarkIcon } from "react-native-heroicons/outline";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../styles/colors";

const { width, height } = Dimensions.get("window");

const ImageViewer = ({ imageUrl, onClose }) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      scale.value = withTiming(1);
      focalX.value = withTiming(0);
      focalY.value = withTiming(0);
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  return (
    <View style={styles.imageViewerContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <XMarkIcon size={24} color="#ffffff" />
      </TouchableOpacity>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.Image
          source={{ uri: imageUrl }}
          style={[styles.fullScreenImage, imageStyle]}
          resizeMode="contain"
        />
      </PinchGestureHandler>
    </View>
  );
};

export default function ImageDownloadModal({
  isVisible,
  onClose,
  title,
  subtitle,
  imageUrl,
}) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const handleDownload = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant permission to save images"
        );
        return;
      }

      setDownloading(true);

      const timestamp = Date.now();
      const sanitizedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const filename = `${sanitizedTitle}_${timestamp}.jpg`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      const downloadResumable = FileSystem.createDownloadResumable(
        imageUrl,
        fileUri,
        {},
        (downloadProgress) => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
          setProgress(progress * 100);
        }
      );

      const { uri } = await downloadResumable.downloadAsync();

      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("Kashida", asset, false);
        Alert.alert("Success", "Image saved to gallery");
      }

      setDownloading(false);
      onClose();
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert(
        "Download Failed",
        "There was an error downloading the image. Please try again."
      );
      setDownloading(false);
    }
  };

  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        backdropOpacity={0.5}
        style={styles.modal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => setIsImageViewVisible(true)}
          >
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <TouchableOpacity
            style={[
              styles.downloadButton,
              downloading && styles.downloadingButton,
            ]}
            onPress={handleDownload}
            disabled={downloading}
          >
            {downloading ? (
              <>
                <ActivityIndicator color="#ffffff" style={styles.loader} />
                <Text style={styles.buttonText}>
                  Downloading... {progress.toFixed(0)}%
                </Text>
              </>
            ) : (
              <>
                <ArrowDownTrayIcon size={20} color="#ffffff" />
                <Text style={styles.buttonText}>Download</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={isImageViewVisible}
        onBackdropPress={() => setIsImageViewVisible(false)}
        onBackButtonPress={() => setIsImageViewVisible(false)}
        backdropOpacity={1}
        style={styles.fullScreenModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver
      >
        <ImageViewer
          imageUrl={imageUrl}
          onClose={() => setIsImageViewVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenModal: {
    margin: 0,
  },
  container: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 20,
    width: width - 40,
    alignItems: "center",
    shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 4 / 3,
    marginBottom: 20,
    // backgroundColor: "#f3faff",
    borderRadius: 10,
    padding: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0e1922",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#78746d",
    textAlign: "center",
    marginBottom: 24,
  },
  downloadButton: {
    backgroundColor: "#008087",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: "100%",
  },
  downloadingButton: {
    backgroundColor: "#b3bec3",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  loader: {
    marginRight: 8,
  },
  imageViewerContainer: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: width,
    height: height,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
});
