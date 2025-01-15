import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native";
import { PlusIcon } from "react-native-heroicons/solid";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";
import BackArrow from "../components/BackArrow";
import { colors } from "../styles/colors";

const Posting = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const data = [
    { key: "1", value: "Naskh" },
    { key: "2", value: "Thuluth" },
    { key: "3", value: "Diwani" },
    { key: "4", value: "Ruqa`ah" },
    { key: "5", value: "Kufic" },
    { key: "6", value: "Maghribi" },
    { key: "7", value: "Farsi" },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets) {
      setSelectedImage((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]);

      console.log("New images:", selectedImage);
      console.log(
        "New images:",
        result.assets.map((asset) => asset.uri)
      );
    }
  };

  console.log("====================================");
  console.log("this is the selected image");
  console.log(selectedImage);
  console.log("====================================");

  const uploadData = async () => {
    if (!selectedImage || !title || !caption || !selected) {
      Alert.alert(
        "Missing Fields",
        "Please fill all the fields and select an image."
      );
      return;
    }

    try {
      const formData = new FormData();
      selectedImage.forEach((image, index) => {
        const filename = image.split("/").pop();
        const match = /\.(\w+)$/.exec(filename || "");
        const type = match ? `image/${match[1]}` : "image";

        formData.append("photos", {
          uri: image,
          name: filename,
          type,
        });
      });
      formData.append("title", title);
      formData.append("description", caption);
      formData.append("categories", selected);

      console.log("API URL:", `${API_URL}/api/k1/posts`);
      console.log("FormData:", formData);

      setIsLoading(true);
      const token = await SecureStore.getItemAsync("jwtToken");

      const response = await fetch(`${API_URL}/api/k1/posts`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsLoading(false);
      Alert.alert("Success", "Data uploaded successfully!");
      console.log("Response data:", data);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Upload Failed", error.message);
      console.error("Full error:", error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Uploading Your Post</Text>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <BackArrow navigation={navigation} />
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Create Post</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Add a Media</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.imageScrollView}
              >
                {selectedImage?.map((image, i) => (
                  <Image
                    key={i}
                    source={{ uri: image }}
                    style={styles.selectedImage}
                  />
                ))}
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.addImageButton}
                >
                  <PlusIcon size={32} color="black" />
                </TouchableOpacity>
              </ScrollView>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput
                  placeholder="Your Title"
                  style={styles.input}
                  value={title}
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  onChangeText={(text) => setTitle(text)}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Caption</Text>
                <TextInput
                  placeholder="Your Caption"
                  style={styles.textArea}
                  value={caption}
                  multiline={true}
                  numberOfLines={10}
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  onChangeText={(text) => setCaption(text)}
                  keyboardType="default"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Select a Space</Text>
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={data}
                  save="value"
                  boxStyles={styles.selectListBox}
                  dropdownStyles={styles.selectListDropdown}
                />
              </View>
            </View>

            <TouchableOpacity onPress={uploadData} style={styles.postButton}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 12,
    color: colors.text,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 200,
    paddingHorizontal: 16,
  },
  headerContainer: {
    marginTop: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  formContainer: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "normal",
    color: colors.text,
  },
  imageScrollView: {
    marginTop: 12,
  },
  selectedImage: {
    width: 230,
    height: 230,
    marginRight: 8,
    borderRadius: 10,
  },
  addImageButton: {
    backgroundColor: colors.inputBackground,
    width: 230,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "normal",
    color: colors.text,
  },
  input: {
    backgroundColor: colors.inputBackground,
    width: "100%",
    fontSize: 18,
    borderRadius: 56,
    marginTop: 12,
    padding: 16,
    color: colors.text,
  },
  textArea: {
    backgroundColor: colors.inputBackground,
    width: "100%",
    fontSize: 18,
    borderRadius: 26,
    marginTop: 12,
    padding: 16,
    height: 150,
    textAlignVertical: "top",
    color: colors.text,
  },
  selectListBox: {
    backgroundColor: colors.inputBackground,
    borderRadius: 56,
    marginTop: 12,
  },
  selectListDropdown: {
    backgroundColor: colors.inputBackground,
    // borderColor: colors.border,
  },
  postButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    marginTop: 40,
    marginBottom: 40,
    borderRadius: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  postButtonText: {
    textAlign: "center",
    color: colors.background,
    fontSize: 18,
  },
});

export default Posting;
