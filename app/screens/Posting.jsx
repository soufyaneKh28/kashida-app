import {
  View,
  Text,
  Modal,
  Button,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import BackArrow from "../components/BackArrow";
import { SafeAreaView } from "react-native";
import { PlusIcon } from "react-native-heroicons/solid";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
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
    // Request permission to access media
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage([
        ...selectedImage,
        ...result.assets.map((asset) => asset.uri),
      ]);
      console.log("====================================");
      console.log("this is the selected image");
      console.log(selectedImage);
      console.log("====================================");
    }
  };

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

      console.log(formData);
      setIsLoading(true);
      const token = await SecureStore.getItemAsync("jwtToken");
      const response = await fetch("http://10.0.2.2:7000/api/k1/posts", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        setIsLoading(false);
      }

      const data = await response.json();
      setIsLoading(false);
      Alert.alert("Success", "Data uploaded successfully!");
      console.log(data);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Upload Failed", error.message);
      console.error(error);
      setIsLoading(false);
    }
  };

  console.log("====================================");
  console.log("title: ", title);
  console.log("caption: ", caption);
  console.log("Image: ", selectedImage);
  console.log("Category: ", selected);
  console.log("====================================");
  return (
    <SafeAreaView className="px-4 py-3  bg-white flex-1 ">
      {isLoading ? (
        <View className="flex-1 justify-center items-center ">
          <ActivityIndicator size={"large"} />
          <Text className=" font-bold text-xl mt-3">Uploading Your Post </Text>
        </View>
      ) : (
        <ScrollView className=" pb-[200px]">
          <BackArrow navigation={navigation} />
          <View className="mt-5">
            <Text className=" text-center mt text-xl font-bold">
              Create Post
            </Text>
          </View>

          <View className="mt-10 ">
            {/* Adding images inputs */}
            <Text className=" text-lg font-normal ">Add a Media</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className=" mt-3"
            >
              {selectedImage?.map((image, i) => (
                <Image
                  key={i}
                  source={{ uri: image }}
                  className="w-[230px] h-[230px] me-2 rounded-[10px]"
                />
              ))}
              <TouchableOpacity
                onPress={pickImage}
                className=" bg-[#F3FAFF] me-2 w-[230px] h-[230px] justify-center items-center rounded-[10px]"
              >
                <PlusIcon size={32} color={"#D9D9D9"} />
              </TouchableOpacity>
            </ScrollView>

            {/*Adding title */}
            <View className="mt-5 ">
              <Text className="text-lg font-normal ">Title</Text>
              <TextInput
                placeholder="Your Title"
                className=" bg-[#F3FAFF]  w-full text-lg  rounded-[56px] mt-3  p-[16px]"
                value={title}
                placeholderTextColor="gray"
                autoCapitalize="none"
                onChangeText={(text) => setTitle(text)}
                keyboardType="email-address"
              />
            </View>
            {/*Adding title */}
            <View className="mt-5 ">
              <Text className="text-lg font-normal ">Caption</Text>
              <TextInput
                placeholder="Your Title"
                className=" bg-[#F3FAFF]  w-full leading-6 text-lg  rounded-[26px] mt-3 h-[100px] text-start  p-[16px]"
                value={caption}
                multiline={true}
                numberOfLines={10}
                style={{
                  height: 150,
                  textAlignVertical: "top",
                }}
                placeholderTextColor="gray"
                autoCapitalize="none"
                onChangeText={(text) => setCaption(text)}
                keyboardType="email-address"
              />
            </View>
            <View className="mt-5">
              <Text className="text-lg mb-3 font-normal ">Select a Space</Text>
              <SelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={uploadData}
            className="bg-[#00868C] py-3 mt-10 mb-10 rounded-[50px] w-full flex-row justify-center"
          >
            <Text className="text-center text-white text-lg ">Post</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Posting;
