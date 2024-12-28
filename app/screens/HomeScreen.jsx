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
  Modal,
  Pressable,
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
import {
  ArrowLeftIcon,
  BellIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import Pin from "../components/Pin";
import { getUserPosts } from "../api/user";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchByUser from "../components/SearchByUser";
import { getCategories } from "../api/me";
import SearchByPost from "../components/SearchByPost";
import SearchTabs from "../navigation/SearchTabs";
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

// function SearchModal({ modalVisible, setModalVisible }) {
//   return (

//   );
// }
// const Tab = createMaterialTopTabNavigator();
// function SearchTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarLabelStyle: { fontSize: 12 },
//         tabBarItemStyle: {},

//         tabBarStyle: {
//           backgroundColor: "powderblue",
//           flexDirection: "row",
//           justifyContent: "center",
//           marginHorizontal: 100,
//         },
//       }}
//     >
//       <Tab.Screen name="Search By Users" component={SearchByUser} />
//       <Tab.Screen name="Search By Post" component={SearchByPost} />
//       {/* <Tab.Screen name="Profile" component={} /> */}
//     </Tab.Navigator>
//   );
// }
const HomeScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
    // getPostData();
    getUserPosts(setUserData, setIsLoading);
  }, []);
  // const getPostData = async () => {
  //   try {
  //     setIsLoading(true);
  //     // Retrieve the JWT token from SecureStore
  //     const token = await SecureStore.getItemAsync("jwtToken");
  //     if (!token) {
  //       Alert.alert("Error", "No token found. Please log in again.");
  //       return;
  //     }

  //     // Make the GET request
  //     const response = await fetch(
  //       "https://kashida-app-dep.onrender.com/api/k1/posts",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`, // Add the token to the Authorization header
  //         },
  //       }
  //     );

  //     // Check if the response is OK
  //     if (!response.ok) {
  //       // setIsLoading(true);
  //       const errorResponse = await response.json();
  //       throw new Error(errorResponse.message || "Failed to fetch user data.");
  //     }

  //     // Parse the JSON response
  //     const userData = await response.json();
  //     setUserData(userData?.data.posts);

  //     setIsLoading(false);
  //     // Handle the user data (e.g., update state or UI)
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     alert("Error", "Failed to fetch user data. Please try again.");
  //   }
  // };

  useEffect(() => {
    getUserPosts(setUserData, setIsLoading);
    getCategories(setCategories);
    // console.log("conmsssssssssss", userData);
  }, []);

  return (
    <SafeAreaView className=" flex-1 px-4 bg-white">
      <StatusBar backgroundColor="white" />
      {isloading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView
          className="p-3"
          refreshControl={
            <RefreshControl refreshing={isloading} onRefresh={onRefresh} />
          }
        >
          {/* home screen Header  */}
          <View className="flex-row justify-between my-3">
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <MagnifyingGlassIcon color="black" />
            </Pressable>
            {/* Search MOdal */}
            <Modal
              animationType="slide"
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <SafeAreaView className=" flex-1 ">
                <View className="mb-20">
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    className="bg-white w-[41px] h-[41px] items-center justify-center rounded-[16px] mt-[20px] ms-[10px] shadow-2xl absolute z-10"
                  >
                    <ArrowLeftIcon color={"black"} />
                  </TouchableOpacity>
                </View>
                <SearchTabs />
              </SafeAreaView>
            </Modal>
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
            {categories?.map((catergory, i) => (
              <Category
                title={catergory.name}
                key={i}
                category={category}
                onPress={() => setCategory(catergory.name)}
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
                .filter((post, i) => i % 2 === 1 && post.photos[0])
                .reverse()
                .map((pin, i) => (
                  <Pin
                    title={pin.title}
                    uri={pin.photos[0]}
                    key={i}
                    id={pin._id}
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
                .filter((post, i) => i % 2 === 0 && post.photos[0])
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
