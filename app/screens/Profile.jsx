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
  XMarkIcon,
} from "react-native-heroicons/solid";
import Pin from "../components/Pin";
import { getUserPosts } from "../api/user"; // Import the API call
import { Animated, useAnimatedValue } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getMe, getMyPosts } from "../api/me";
import { Drawer } from "react-native-drawer-layout";
import EditProfileModal from "../components/EditProfileModal";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
const Profile = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    // Initial user data

    name: "John Doe",
    username: "johndoe",
    phone: "1234567890",
    birthday: "01/01/1990",
    bio: "Hello, I am John Doe.",
    photo:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  });
  const [isLikes, setIsLikes] = useState(false);
  const [isPosts, setIsPosts] = useState(true);
  const [myPosts, setMyPosts] = useState(null);
  const [me, setMe] = useState();
  const [myId, setMyId] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const { setIsLoggedIn } = useContext(AuthContext);
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("jwtToken"); // Clear the token from SecureStore
    setIsLoggedIn(false);
  };

  const handleSaveProfile = (updatedData) => {
    // Handle the save action here
    console.log("Updated profile data:", updatedData);
    setUserData(updatedData);
    setIsEditModalVisible(false);
  };

  // async function handleId() {
  //   let token = await SecureStore.getItemAsync("jwtToken");

  //   const decoded = jwtDecode(token);
  //   // setMyId(decoded.id);
  //   setMyId(decoded?.id);
  //   console.log("====================================");

  //   console.log("token decoded", decoded.id);
  //   console.log("====================================");
  // }
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
    setMyId(decoded.id);
    console.log("my iddddddddd", myId);
    // setMyId(decoded.id);
    const myData = await getMe(setMe, setIsLoading);
    const userPosts = await getMyPosts(
      setMyPosts,
      setIsLoading,
      myData.data._id
    );
    console.log("====================================");
    console.log("userPoooosts", userPosts);
    console.log("====================================");
    setMe(myData.data);
    setMyPosts(userPosts);
    console.log("====================================");
    console.log("meee", myData.data);
    setIsLoading(false);
    console.log("====================================");
  }

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    GettingAllData();
    wait(2000).then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    // Access the ID
    setIsLoading(true);
    GettingAllData();
  }, []);

  // Custom Drawer Content
  function DrawerContent() {
    return (
      <SafeAreaView classNam="">
        <View className="p-3 px-6 flex-row justify-between items-center">
          <Text className=" font-bold text-xl">Settings</Text>
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
            }}
          >
            <XMarkIcon size={26} color={"black"} />
          </TouchableOpacity>
        </View>
        <View className=" mt-20 items-center">
          <TouchableOpacity
            className="px-6 py-2 my-1 text-start w-full flex-row items-center gap-3 "
            onPress={() => {
              navigation.push("SettingsStack", {
                screen: "Security",
                params: {
                  /* Optional params */
                },
              });
            }}
          >
            <Image
              source={require("../../assets/images/securityIcon.png")}
              style={{ width: 34, height: 34 }}
            />
            <Text className=" text-lg font-semibold">Security</Text>
          </TouchableOpacity>
          <View className=" w-[260px] bg-[#ECEEF2] h-[1px]  " />
          <TouchableOpacity
            className="px-6 py-2 my-1 w-full flex-row items-center gap-3 "
            onPress={() => {
              navigation.push("SettingsStack", {
                screen: "Policy",
                params: {
                  /* Optional params */
                },
              });
            }}
          >
            <Image
              source={require("../../assets/images/privacyIcon.png")}
              style={{ width: 34, height: 34 }}
            />
            <Text className=" text-lg text-start font-semibold">
              Privacy and Policy
            </Text>
          </TouchableOpacity>

          <View className=" w-[260px] bg-[#ECEEF2] h-[1px]  " />
          <TouchableOpacity
            className="px-6 py-2 my-1 w-full flex-row items-center gap-3 "
            onPress={() => {
              navigation.push("SettingsStack", {
                screen: "Terms",
                params: {
                  /* Optional params */
                },
              });
            }}
          >
            <Image
              source={require("../../assets/images/termsIcon.png")}
              style={{ width: 34, height: 34 }}
            />
            <Text className=" text-lg font-semibold">Terms of Use</Text>
          </TouchableOpacity>
          <View className=" w-[260px] bg-[#ECEEF2] h-[1px]  " />
          <TouchableOpacity
            className="px-6 py-2 my-1 w-full flex-row items-center gap-3   "
            onPress={() => {
              navigation.push("SettingsStack", {
                screen: "Help",
                params: {
                  /* Optional params */
                },
              });
            }}
          >
            <Image
              source={require("../../assets/images/helpIcon.png")}
              style={{ width: 34, height: 34 }}
            />
            <Text className=" text-lg font-semibold ">Help</Text>
          </TouchableOpacity>
          <View className=" w-[260px] bg-[#ECEEF2] h-[2px] mt-[150px] " />
          <View className="w-full px-6">
            <TouchableOpacity
              onPress={handleLogout}
              className=" bg-[#FF9898] px-2 mt-3 py-2 my-1 w-full flex-row items-center gap-3  rounded-xl "
            >
              <Image
                source={require("../../assets/images/logoutIcon.png")}
                style={{ width: 34, height: 34 }}
              />
              <Text className=" text-[#D20000] text-lg font-bold">Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <Drawer
      open={open}
      drawerPosition="right"
      drawerStyle={{
        backgroundColor: "white",
        zIndex: 100,
        width: 300,
        position: "absolute",
      }}
      overlayStyle={{
        zIndex: 100,
      }}
      navigation={navigation}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <DrawerContent />;
      }}
    >
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
            {me?.photo[0] && me?.photo[0].includes("/res.cloudinary.com") ? (
              <Image
                source={{
                  uri: me.photo[0],
                }}
                width={142}
                height={142}
                className="rounded-full"
              />
            ) : (
              <Image
                source={{
                  uri: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                }}
                width={142}
                height={142}
                className="rounded-full"
              />
            )}

            <Text className="text-2xl font-bold mt-3 text-dark">
              {me?.name}
            </Text>
            {/* username / role */}
            <View className="flex-row my-2 ">
              <Text className=" text-lg text-textSecondary">
                @{me?.username}
              </Text>
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
            <TouchableOpacity
              onPress={() => setIsEditModalVisible(true)}
              className="bg-secondary w-[170px] h-[41px] gap-3 items-center flex-row justify-center rounded-[5px]"
            >
              <PencilIcon color="white" size={22} />
              <Text className="text-white text-lg">Edit Profile</Text>
            </TouchableOpacity>

            {/* settings */}
            <TouchableOpacity
              onPress={() => setOpen(true)}
              className=" bg-secLight w-[41px] h-[41px] py-3 gap-3 items-center flex-row justify-center rounded-[5px]"
            >
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
                    title: "follower",
                  })
                }
              >
                {/* number */}
                <Text className=" text-2xl text-secLight font-bold">
                  {me?.followers}
                </Text>
                {/* text */}
                <Text className="text-base  text-textSecondary ">
                  Followers
                </Text>
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
                    title: "following",
                  })
                }
              >
                {/* number */}
                <Text className=" text-2xl text-secLight font-bold">
                  {" "}
                  {me?.following}
                </Text>
                {/* text */}
                <Text className="text-base  text-textSecondary ">
                  Following
                </Text>
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

          <Button title="drawer" onPress={() => setOpen(true)} />
          <Button title="log out" onPress={handleLogout} />
        </ScrollView>
        {isEditModalVisible && (
          <EditProfileModal
            isVisible={isEditModalVisible}
            onClose={() => setIsEditModalVisible(false)}
            initialData={me}
            onSave={handleSaveProfile}
          />
        )}
      </SafeAreaView>
    </Drawer>
  );
};

export default Profile;
