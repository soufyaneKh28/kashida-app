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
import * as Sharing from "expo-sharing";
import * as IntentLauncher from "expo-intent-launcher";
import { colors } from "../styles/colors";

const { width } = Dimensions.get("window");

export default function DownloadModal({
  isVisible,
  onClose,
  title,
  subtitle,
  imageUrl,
  pdfUrl,
}) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const timestamp = Date.now();
      const sanitizedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const filename = `${sanitizedTitle}_${timestamp}.pdf`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      const downloadResumable = FileSystem.createDownloadResumable(
        pdfUrl,
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
        const contentUri = await FileSystem.getContentUriAsync(uri);
        if (contentUri) {
          await IntentLauncher.startActivityAsync(
            "android.intent.action.VIEW",
            {
              data: contentUri,
              flags: 1,
              type: "application/pdf",
            }
          );
        } else {
          throw new Error("Failed to get content URI");
        }
      }

      setDownloading(false);
      onClose();
      Alert.alert("Success", "File downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert(
        "Download Failed",
        "There was an error downloading the file. Please try again."
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
    backgroundColor: colors.background,
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
    height: 200,
    marginBottom: 20,
    backgroundColor: "#f3faff",
    borderRadius: 10,
    padding: 10,
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
