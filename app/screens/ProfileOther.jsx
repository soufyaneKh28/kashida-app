import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  Cog6ToothIcon,
  PencilIcon,
  ShareIcon,
} from "react-native-heroicons/solid";
import Pin from "../components/Pin";
import { getUserPosts, getUserProfile } from "../api/user"; // Import the API call
import { Animated, useAnimatedValue } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import FollowBtn from "../components/FollowBtn";
import { getMyFollowing } from "../api/me";
const ProfileOther = ({ route, navigation }) => {
  const { id, followState } = route.params;
  const router = useRouter();
  console.log("====================================");
  console.log("user id", id);
  console.log("====================================");
  const [isLikes, setIsLikes] = useState(false);
  const [isPosts, setIsPosts] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [userFollowing, setUserFollowing] = useState([]);
  const [me, setMe] = useState({});
  const [isloading, setIsLoading] = useState(true);
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("jwtToken"); // Clear the token from SecureStore
    router.replace("navigation/AuthStack");
  };

  function handleIsLike() {
    setIsPosts(false);
    setIsLikes(true);
  }
  function handleIsPost() {
    setIsLikes(false);
    setIsPosts(true);
    // animateView();
  }

  function handleFolllowState() {
    return userFollowing.some((user) => user.following._id === id);
  }
  const fadeAnim = useAnimatedValue(0); // Initial value for opacity: 0
  const transAnim = useAnimatedValue(100); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(transAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, transAnim, isPosts, isLikes]);

  // const getMe = async () => {
  //   try {
  //     // Retrieve the JWT token from SecureStore
  //     const token = await SecureStore.getItemAsync("jwtToken");
  //     if (!token) {
  //       Alert.alert("Error", "No token found. Please log in again.");
  //       return;
  //     }

  //     // Make the GET request
  //     const response = await fetch(
  //       `https://kashida-app-dep.onrender.com/api/k1/users/${id ? id : ""}`,
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
  //     const me = await response.json();
  //     setMe(me?.data.data);
  //     console.log("====================================");
  //     console.log("User MEeee:", me?.data.data);
  //     console.log("====================================");
  //     console.log("Success", "User data retrieved successfully!");
  //     setIsLoading(false);
  //     // Handle the user data (e.g., update state or UI)
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     alert("Error", "Failed to fetch user data. Please try again.");
  //   }
  // };

  useEffect(() => {
    // getUserPosts({ setuserProfile, setIsLoading });
    getUserProfile({ setUserProfile, setIsLoading, id });
    getMyFollowing(setUserFollowing, setIsLoading);
    console.log("====================================");
    console.log(
      "hhh",
      userFollowing?.some((user) => user.following._id === id)
    );
    console.log("====================================");
  }, []);

  console.log("====================================");
  // console.log("this is uder outside:", user);
  console.log("====================================");
  // useEffect(() => {
  //   // animateView(); // Automatically start animation on component mount
  // }, []);
  return (
    <SafeAreaView className=" bg-white ">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-white w-[41px] h-[41px] items-center justify-center rounded-[16px] mt-[20px] ms-[10px] shadow-xl shadow-black absolute z-10"
      >
        <ArrowLeftIcon color={"black"} />
      </TouchableOpacity>
      <ScrollView className=" px-3">
        <Image
          source={require("../../assets/images/kashidaOut.png")}
          className=" absolute top-[50px] z-0 left-[-100px]"
        />
        <View className="items-center mt-6">
          <Image
            source={{ uri: "https://picsum.photos/id/22/200" }}
            width={142}
            height={142}
            className="rounded-full"
          />
          <Text className="text-2xl font-bold mt-3 text-dark">
            {userProfile?.name}
          </Text>
          {/* username / role */}
          <View className="flex-row my-2 ">
            <Text className=" text-lg text-textSecondary">
              @{userProfile?.username}
            </Text>
            <View className="w-[2px] mx-4 bg-secLight"></View>
            <Text className="text-lg text-textSecondary">
              {userProfile?.role}
            </Text>
          </View>
          {/* bio */}
          <Text className="text-xl max-w-[350px] text-center my-2 text-textSecondary">
            {userProfile?.bio}
          </Text>
        </View>

        {/* Actions */}
        <View className="flex-row justify-center mt-4 gap-2">
          {/* edit profile */}
          {}
          <FollowBtn
            userId={id}
            followState={followState}
            navigation={navigation}
          />

          {/* settings */}
          {/* <TouchableOpacity className=" bg-secLight w-[41px] h-[41px] py-3 gap-3 items-center flex-row justify-center rounded-[5px]">
            <Cog6ToothIcon color="white" />
          </TouchableOpacity> */}
          {/* Share */}
          <TouchableOpacity className=" bg-secLight w-[41px] h-[41px] py-3 gap-3 items-center flex-row justify-center rounded-[5px]">
            <ShareIcon color="white" />
          </TouchableOpacity>
        </View>

        <View className=" my-5 flex-row justify-center items-center gap-10 px-6">
          {/* posts */}
          <View className=" items-center">
            {/* number */}
            <Text className=" text-2xl text-secLight font-bold">
              {userProfile?.posts}
            </Text>
            {/* text */}
            <Text className="text-base  text-textSecondary ">Posts</Text>
          </View>

          {/* separator */}
          <View className="w-[1px] h-[29px] bg-slate-300" />

          {/* Followers */}
          <View className="">
            <Pressable
              className=" items-center"
              onPress={() =>
                navigation.push("OtherProfileFollowsScreen", {
                  title: "followers",
                  id: id,
                })
              }
            >
              {/* number */}
              <Text className=" text-2xl text-secLight font-bold">
                {userProfile?.followers}
              </Text>
              {/* text */}
              <Text className="text-base  text-textSecondary ">Followers</Text>
            </Pressable>
          </View>

          {/* separator */}
          <View className="w-[1px] h-[29px] bg-slate-300" />

          {/* Following */}
          <View className=" items-center">
            <Pressable
              className=" items-center"
              onPress={() =>
                navigation.push("OtherProfileFollowsScreen", {
                  title: "Following",
                  id: id,
                })
              }
            >
              {/* number */}
              <Text className=" text-2xl text-secLight font-bold">
                {" "}
                {userProfile?.following}
              </Text>
              {/* text */}
              <Text className="text-base  text-textSecondary ">Following</Text>
            </Pressable>
          </View>
        </View>

        {/* Filtering actions / posts / likes */}
        <View className="flex-row justify-evenly my-4">
          <Pressable
            className={` py-2 px-4 ${isPosts ? "border-b-2" : ""}  `}
            onPress={handleIsPost}
          >
            <Text
              className={` text-xl ${
                isPosts ? " font-semibold" : " text-textSecondary"
              }  `}
            >
              Posts
            </Text>
          </Pressable>
          <Pressable
            className={` py-2 px-4 ${isLikes ? "border-b-2" : ""}  `}
            onPress={handleIsLike}
          >
            <Text
              className={` text-xl ${
                isLikes ? " font-semibold" : " text-textSecondary"
              }  `}
            >
              Likes
            </Text>
          </Pressable>
        </View>

        <View className="  items-center">
          {/* Posts View */}
          {isPosts ? (
            isloading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  translateY: transAnim, // Bind opacity to animated value
                }}
                className="flex-row justify-between"
              >
                {/* first Col */}
                <View className=" w-[50%] px-1   ">
                  {/* {userProfile
                    ?.filter((_, i) => i % 2 === 1)
                    .map((pin, i) => (
                      <Pin
                        title={pin.title}
                        uri={pin.photos[0]}
                        key={i}
                        pin={pin}
                        isEven={false}
                      />
                    ))} */}
                </View>
                {/* second col */}
                <View className=" w-[50%]  px-1   ">
                  {/* {userProfile
                    ?.filter((_, i) => i % 2 === 0)
                    .map((pin, i) => (
                      <Pin
                        title={pin.title}
                        uri={pin.photos[0]}
                        key={i}
                        pin={pin}
                        isEven={true}
                      />
                    ))} */}
                </View>
              </Animated.View>
            )
          ) : null}

          {/* Likes View */}
          {isLikes ? (
            <View>
              <Text>Likes</Text>
            </View>
          ) : null}
        </View>
        <Button title="log out" onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileOther;
