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
  RefreshControl,
  StatusBar,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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

// <Pin title="test data" uri="https://picsum.photos/id/21/200" />
//             <Pin title="test data" uri="https://picsum.photos/id/22/200" />
//             <Pin title="test data" uri="https://picsum.photos/id/23/200" />
//             <Pin title="test data" uri="https://picsum.photos/500/700" />
// //             <Pin title="test data" uri="https://picsum.photos/500/200" />
// <Category title="All" />
// <Category title="Ruq’aa" />
// <Category title="Naskh" />
// <Category title="Thuluth" />
// <Category title="Diwani" />
// <Category title="Wessam" />
const CategoriesData = [
  {
    title: "All",
  },
  {
    title: "Ruq’aa",
  },
  {
    title: "Naskh",
  },
  {
    title: "Thuluth",
  },
  {
    title: "Diwani",
  },
  {
    title: "Wessam",
  },
];

const HomeScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [category, setCategory] = useState("All");
  const [isloading, setIsLoading] = useState(false);

  // const handleLogout = async () => {
  //   await SecureStore.deleteItemAsync("jwtToken"); // Clear the token from SecureStore
  //   router.replace("navigation/AuthStack");
  // };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    wait(2000).then(() => setIsLoading(false));
    getPostData();
  }, []);
  const getPostData = async () => {
    try {
      setIsLoading(true);
      // Retrieve the JWT token from SecureStore
      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      // Make the GET request
      const response = await fetch("http://10.0.2.2:7000/api/k1/posts", {
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
      setUserData(userData?.data.posts);
      console.log("User Data:", userData);
      console.log("User Data:", userData.data.posts);
      console.log("Success", "User data retrieved successfully!");
      setIsLoading(false);
      // Handle the user data (e.g., update state or UI)
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error", "Failed to fetch user data. Please try again.");
    }
  };

  useEffect(() => {
    getPostData();
    console.log("conmsssssssssss", userData);
  }, []);

  return (
    <SafeAreaView className=" flex-1 px-4 bg-white">
      <StatusBar backgroundColor="white" />
      {isloading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView
          className=""
          refreshControl={
            <RefreshControl refreshing={isloading} onRefresh={onRefresh} />
          }
        >
          {/* home screen Header  */}
          <View className="flex-row justify-between my-3">
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
            {CategoriesData.map((catergory, i) => (
              <Category
                title={catergory.title}
                key={i}
                onPress={() => setCategory(catergory.title)}
              />
            ))}
          </ScrollView>

          {/* Feed pins MAsonary View */}

          <View className="flex-row justify-between">
            {/* first Col */}
            <View className=" w-[50%] px-1   ">
              {userData
                ?.filter((post) => {
                  if (category === "All") return post;
                  else {
                    return post.categories === category;
                  }
                })
                .filter((_, i) => i % 2 === 1)
                .reverse()
                .map((pin, i) => (
                  <Pin
                    title={pin.title}
                    uri={pin.photos[0]}
                    key={i}
                    id={i}
                    pin={pin}
                    isEven={false}
                    navigation={navigation}
                  />
                ))}
            </View>
            {/* second col */}
            <View className=" w-[50%]  px-1   ">
              {userData
                ?.filter((post) => {
                  if (category === "All") return post;
                  else {
                    return post.categories === category;
                  }
                })
                .filter((_, i) => i % 2 === 0)
                .reverse()
                .map((pin, i) => (
                  <Pin
                    title={pin.title}
                    uri={pin.photos[0]}
                    key={i}
                    id={i}
                    pin={pin}
                    isEven={true}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
