import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
} from "react-native";
import Modal from "react-native-modal";
import { PlayIcon } from "react-native-heroicons/solid";
import { colors } from "../styles/colors";

const { width } = Dimensions.get("window");

export default function VideoRedirectModal({
  isVisible,
  onClose,
  title,
  subtitle,
  thumbnailUrl,
  playlistUrl,
}) {
  const handleRedirect = async () => {
    const canOpen = await Linking.canOpenURL(playlistUrl);
    if (canOpen) {
      await Linking.openURL(playlistUrl);
    } else {
      console.error("Cannot open URL:", playlistUrl);
      // You might want to show an error message to the user here
    }
    onClose();
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
          <View style={styles.thumbnailContainer}>
            <Image
              source={{ uri: thumbnailUrl }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.playIconOverlay}>
              <PlayIcon size={40} color="#ffffff" />
            </View>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <TouchableOpacity style={styles.watchButton} onPress={handleRedirect}>
            <PlayIcon size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Watch on YouTube</Text>
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
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  thumbnailContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 20,
    backgroundColor: "#f3faff",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  playIconOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
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
  watchButton: {
    backgroundColor: "#008389",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
