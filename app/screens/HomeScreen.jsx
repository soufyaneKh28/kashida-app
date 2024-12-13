import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Button,
  Alert,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
// import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

import Animated, { withSpring } from "react-native-reanimated";
import { SharedTransition } from "react-native-reanimated";
import Category from "../components/Category";
import {
  BellAlertIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import { BellIcon, HeartIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import Pin from "../components/Pin";
// import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const customTransition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY),
  };
});

const HomeScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [isloading, setIsLoading] = useState(true);
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("jwtToken"); // Clear the token from SecureStore
    router.replace("navigation/AuthStack");
  };

  const getUserData = async () => {
    try {
      // Retrieve the JWT token from SecureStore
      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      // Make the GET request
      const response = await fetch("http://10.0.2.2:7000/api/k1/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });

      // Check if the response is OK
      if (!response.ok) {
        // setIsLoading(true);
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to fetch user data.");
      }

      // Parse the JSON response
      const userData = await response.json();
      setUserData(userData);
      console.log("User Data:", userData);
      console.log("Success", "User data retrieved successfully!");
      setIsLoading(false);
      // Handle the user data (e.g., update state or UI)
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error", "Failed to fetch user data. Please try again.");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // console.log("conmsssssssssss", userData);
  return (
    <SafeAreaView className=" flex-1 px-4 bg-white">
      {isloading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView className="">
          {/* home screen Header  */}
          <View className="flex-row justify-between mt-3">
            <MagnifyingGlassIcon color="black" />
            <View className="flex-row gap-8">
              <View>
                <Text className="text-[#7FB9E6] text-[16px] font-semibold">
                  Feed
                </Text>
              </View>
              <View>
                <Text className="text-[#AADAFF] text-[16px] font-semibold">
                  Following
                </Text>
              </View>
            </View>
            <BellIcon color="black" />
          </View>
          {/* Categories slider */}
          <ScrollView
            className=" my-3"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {/* single Category */}
            <Category title="All" />
            <Category title="Ruq’aa" />
            <Category title="Naskh" />
            <Category title="Thuluth" />
            <Category title="Diwani" />
            <Category title="Wessam" />
          </ScrollView>

          {/* Feed pins MAsonary View */}
          {/* first Row */}

          <View>
            <TouchableOpacity className="rounded-[10px] h-fit overflow-hidden">
              <Image
                source={{ uri: "https://picsum.photos/id/10/200" }}
                className="w-full h-[300px] rounded-[10px]"
              />
              {/* Title + Like Button */}
              <View className="flex-row justify-between  w-full   ">
                <LinearGradient
                  // Gradient colors from transparent black to solid black
                  colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]}
                  style={{
                    width: "100%",
                    height: 50,
                    bottom: 0,

                    position: "absolute",

                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                >
                  <View className="justify-between flex-row w-full items-center">
                    <View>
                      <Text className=" font-bold text-xl text-white">
                        Kashida
                      </Text>
                    </View>
                    <TouchableOpacity className="bg-white h-10 w-10 justify-center items-center rounded-full">
                      <HeartIcon color="black" />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
            <Pin title="test data" uri="https://picsum.photos/id/20/200" />
            <Pin title="test data" uri="https://picsum.photos/id/21/200" />
            <Pin title="test data" uri="https://picsum.photos/id/22/200" />
          </View>

          {/* <Button title="pin" onPress={() => navigation.push("Pin")} />

          <Image
            source={{ uri: "https://picsum.photos/id/39/200" }}
            style={{ width: 300, height: 300 }}
          /> */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
