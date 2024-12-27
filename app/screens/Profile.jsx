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
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import {
  Cog6ToothIcon,
  PencilIcon,
  ShareIcon,
} from "react-native-heroicons/solid";
import Pin from "../components/Pin";
import { getUserPosts } from "../api/user"; // Import the API call
import { Animated, useAnimatedValue } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getMe, getMyPosts } from "../api/me";
const Profile = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [isLikes, setIsLikes] = useState(false);
  const [isPosts, setIsPosts] = useState(true);
  const [myPosts, setMyPosts] = useState(null);
  const [me, setMe] = useState({});
  const [myId, setMyId] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("jwtToken"); // Clear the token from SecureStore
    router.replace("navigation/AuthStack");
  };

  async function handleId() {
    let token = await SecureStore.getItemAsync("jwtToken");

    const decoded = jwtDecode(token);
    // setMyId(decoded.id);
    setMyId(decoded?.id);
    console.log("====================================");

    console.log("token decoded", decoded.id);
    console.log("====================================");
  }
  function handleIsLike() {
    setIsPosts(false);

    setIsLikes(true);
  }
  function handleIsPost() {
    setIsLikes(false);
    setIsPosts(true);
    // animateView();
  }

  async function GettingAllData() {
    let token = await SecureStore.getItemAsync("jwtToken");

    const decoded = jwtDecode(token);
    // setMyId(decoded.id);
    setMyId(decoded.id);
    getMyPosts(setMyPosts, setIsLoading, decoded.id);
    getMe(setMe, setIsLoading);
    console.log("====================================");
    console.log("decoded", decoded);
    console.log("my iddddddddd", myId);

    console.log("====================================");
  }

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    wait(2000).then(() => setIsLoading(false));
    GettingAllData();
  }, []);

  useEffect(() => {
    // Access the ID
    GettingAllData();
  }, []);

  // useEffect(() => {
  //   // animateView(); // Automatically start animation on component mount
  // }, []);
  return (
    <SafeAreaView className=" bg-white ">
      <ScrollView
        className=" px-3"
        refreshControl={
          <RefreshControl refreshing={isloading} onRefresh={onRefresh} />
        }
      >
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
          <Text className="text-2xl font-bold mt-3 text-dark">{me?.name}</Text>
          {/* username / role */}
          <View className="flex-row my-2 ">
            <Text className=" text-lg text-textSecondary">@{me?.username}</Text>
            <View className="w-[2px] mx-4 bg-secLight"></View>
            <Text className="text-lg text-textSecondary">{me?.role}</Text>
          </View>
          {/* bio */}
          <Text className="text-xl max-w-[350px] text-center my-2 text-textSecondary">
            {me?.bio}
          </Text>
        </View>

        {/* Actions */}
        <View className="flex-row justify-center mt-4 gap-2">
          {/* edit profile */}
          <TouchableOpacity className="bg-secondary w-[170px] h-[41px] gap-3 items-center flex-row justify-center rounded-[5px]">
            <PencilIcon color="white" size={22} />
            <Text className="text-white text-lg">Edit Profile</Text>
          </TouchableOpacity>

          {/* settings */}
          <TouchableOpacity className=" bg-secLight w-[41px] h-[41px] py-3 gap-3 items-center flex-row justify-center rounded-[5px]">
            <Cog6ToothIcon color="white" />
          </TouchableOpacity>
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
              {me?.posts}
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
                navigation.push("FollowsScreen", {
                  title: "followers",
                })
              }
            >
              {/* number */}
              <Text className=" text-2xl text-secLight font-bold">
                {me?.followers}
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
                navigation.push("FollowsScreen", {
                  title: "Following",
                })
              }
            >
              {/* number */}
              <Text className=" text-2xl text-secLight font-bold">
                {" "}
                {me?.following}
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
              <View className="flex-row justify-between">
                {/* first Col */}
                <View className=" w-[50%] px-1   ">
                  {myPosts
                    ?.filter(
                      (post, i) => i % 2 === 1 && post.photos?.length != 0
                    )
                    .map((pin, i) => (
                      <Pin
                        title={pin.title}
                        uri={pin.photos[0]}
                        key={i}
                        pin={pin}
                        isEven={false}
                      />
                    ))}
                </View>
                {/* second col */}
                <View className=" w-[50%]  px-1   ">
                  {myPosts
                    ?.filter(
                      (post, i) => i % 2 === 0 && post.photos?.length != 0
                    )

                    .map((pin, i) => (
                      <Pin
                        title={pin.title}
                        uri={pin.photos[0]}
                        key={i}
                        pin={pin}
                        isEven={true}
                      />
                    ))}
                </View>
              </View>
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

export default Profile;
