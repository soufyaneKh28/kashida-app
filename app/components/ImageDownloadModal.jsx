import React, { useState } from "react";
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
import { ArrowDownTrayIcon } from "react-native-heroicons/outline";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

const { width } = Dimensions.get("window");

export default function ImageDownloadModal({
  isVisible,
  onClose,
  title,
  subtitle,
  imageUrl,
}) {
  console.log("====================================");
  console.log(imageUrl);
  console.log("====================================");
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    try {
      // Request permissions first
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant permission to save images"
        );
        return;
      }

      setDownloading(true);

      // Generate a unique filename
      const timestamp = Date.now();
      const sanitizedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const filename = `${sanitizedTitle}_${timestamp}.jpg`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      // Download the file
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
        // On iOS, use the sharing dialog
        await Sharing.shareAsync(uri);
      } else {
        // On Android, save directly to media library
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
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    width: width - 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 20,
    backgroundColor: "#f3faff",
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
    color: "#5287b1",
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
});
