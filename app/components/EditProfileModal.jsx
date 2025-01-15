import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  Pressable,
  SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { baseurl, updateUserProfile } from "../api/user";
import * as SecureStore from "expo-secure-store";
import { DateTime } from "luxon";
import { PencilIcon } from "react-native-heroicons/outline";
import { API_URL } from "@env";
import { colors } from "../styles/colors";
export default function EditProfileModal({
  isVisible,
  onClose,
  initialData,
  onSave,
  navigation,
}) {
  const [formData, setFormData] = useState({
    ...initialData,
    birthday: initialData?.birthday
      ? new Date(initialData.birthday)
      : new Date(1990, 0, 1),
  });
  const [selectedImage, setSelectedImage] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    if (!formData.name.trim()) {
      Alert.alert("Validation Error", "Name cannot be empty");
      return false;
    }
    if (!formData.username.trim()) {
      Alert.alert("Validation Error", "Username cannot be empty");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    try {
      const formData2 = new FormData();

      // Handle image upload properly
      if (selectedImage) {
        const filename = selectedImage.split("/").pop();
        const match = /\.(\w+)$/.exec(filename || "");
        const type = match ? `image/${match[1]}` : "image/jpeg"; // Default to jpeg if no extension

        formData2.append("photo", {
          uri:
            Platform.OS === "android"
              ? selectedImage
              : selectedImage.replace("file://", ""),
          name: filename || "photo.jpg",
          type,
        });
      }

      // Append other fields only if they have values
      if (formData.name) formData2.append("name", formData.name);
      if (formData.username) formData2.append("username", formData.username);
      if (formData.phoneNumber)
        formData2.append("phoneNumber", formData.phoneNumber);

      // Handle date properly
      if (formData.birthday) {
        const formattedDate = formData.birthday.toISOString().split("T")[0];
        formData2.append("birthday", formattedDate);
      }

      if (formData.bio) formData2.append("bio", formData.bio);

      const token = await SecureStore.getItemAsync("jwtToken");

      // Log the request for debugging
      // console.log("Request URL:", `${baseurl}/api/k1/users/updateMe`);
      // console.log("Token:", token);
      // console.log("FormData:", JSON.stringify([...formData2.entries()]));

      const response = await fetch(`${API_URL}/api/k1/users/updateMe`, {
        method: "PATCH",
        body: formData2,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Log response status and headers
      // console.log("Response status:", response.status);
      // console.log("Response headers:", response.headers);

      // Try to get detailed error message from server
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setIsLoading(false);
      onClose();
      Alert.alert("Success", "Profile updated successfully!");
      console.log("Success data:", data);
    } catch (error) {
      console.error("Detailed error:", error);
      Alert.alert(
        "Update Failed",
        "There was an error updating your profile. Please try again."
      );
      setIsLoading(false);
    }
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.birthday;
    setShowDatePicker(Platform.OS === "ios");
    setFormData((prev) => ({ ...prev, birthday: currentDate }));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos to change your profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    setSelectedImage(result.assets[0].uri);
    console.log("====================================");
    console.log("selectedImage?.assets.uri");
    console.log(result.assets[0].uri);
    if (!result.canceled) {
      setFormData((prev) => ({ ...prev, photo: [result.assets[0].uri] }));
    }
  };

  // console.log("====================================");
  // console.log(formData);
  // console.log("====================================");

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            onPress={onClose}
            style={{ position: "absolute", top: 10, left: 10 }}
          >
            <Text style={{ fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.header}>
            <View style={styles.headerLine} />
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>

          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri:
                    formData?.photo?.[0] ||
                    "/placeholder.svg?height=128&width=128",
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.editImageButton}
                onPress={handleImagePick}
              >
                <PencilIcon color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, name: text }))
                }
                placeholder="Enter your name"
                placeholderTextColor="#999999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={formData?.username}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, username: text }))
                }
                placeholder="Enter username"
                placeholderTextColor="#999999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone number</Text>
              <TextInput
                style={styles.input}
                value={formData?.phoneNumber}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, phoneNumber: text }))
                }
                placeholder="Enter phone number"
                placeholderTextColor="#999999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Birthday</Text>
              <TouchableOpacity
                style={styles.birthdayButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.birthdayButtonText}>
                  {formatDate(formData.birthday)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={formData.bio}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, bio: text }))
                }
                placeholder="Write something about yourself"
                placeholderTextColor="#999999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              onPress={handleSave}
              style={[
                styles.saveButton,
                isLoading && styles.saveButtonDisabled,
              ]}
              disabled={isLoading}
            >
              <Text style={styles.saveButtonText}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={formData.birthday}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: "center",
    paddingVertical: 16,
  },
  headerLine: {
    width: 48,
    height: 4,
    backgroundColor: "#d9d9d9",
    borderRadius: 2,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0e1922",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 32,
  },
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#00868c",
    padding: 8,
    borderRadius: 20,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
    color: "#0e1922",
  },
  input: {
    backgroundColor: colors.inputBackground,
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    color: "#0e1922",
  },
  bioInput: {
    height: 120,
  },
  birthdayButton: {
    backgroundColor: colors.inputBackground,
    padding: 16,
    borderRadius: 8,
  },
  birthdayButtonText: {
    fontSize: 16,
    color: "#0e1922",
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 24,
  },
  saveButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  saveButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});

