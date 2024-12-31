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

import { useRouter } from "expo-router";

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

import Pin from "../components/Pin";
import { getUserPosts } from "../api/user";

import { getCategories } from "../api/me";

import SearchTabs from "../navigation/SearchTabs";
import Notifications from "../components/Notifications";

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationsModalVisible, setNotificationsModalVisible] =
    useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // pull to refresh
  const onRefresh = useCallback(() => {
    setIsLoading(true);
    wait(2000).then(() => setIsLoading(false));
    // getPostData();
    getUserPosts(setUserData, setIsLoading);
  }, []);

  // getting data while initial render
  useEffect(() => {
    getUserPosts(setUserData, setIsLoading);
    getCategories(setCategories);
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
                <Text className="text-[#AADAFF]  text-[16px] font-semibold">
                  Following
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() =>
                setNotificationsModalVisible(!notificationsModalVisible)
              }
            >
              <BellIcon color="black" />
            </Pressable>
            {/* Notifications MOdal */}
            <Modal
              animationType="slide"
              visible={notificationsModalVisible}
              onRequestClose={() => {
                setNotificationsModalVisible(!notificationsModalVisible);
              }}
            >
              <SafeAreaView className=" flex-1 ">
                <View className="mb-20">
                  <TouchableOpacity
                    onPress={() =>
                      setNotificationsModalVisible(!notificationsModalVisible)
                    }
                    className="bg-white w-[41px] h-[41px] items-center justify-center rounded-[16px] mt-[20px] ms-[10px] shadow-2xl absolute z-10"
                  >
                    <ArrowLeftIcon color={"black"} />
                  </TouchableOpacity>
                </View>
                <Notifications />
              </SafeAreaView>
            </Modal>
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
