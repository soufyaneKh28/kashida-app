import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
// import Animated from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
// import { window } from "@/constants/sizes";
// import { renderItem } from "@/utils/render-item";
import {
  ArrowLeftIcon,
  ArrowUpCircleIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { EnvelopeIcon } from "react-native-heroicons/solid";
import { getUserPosts } from "../api/user";
import Pin from "../components/Pin";
import { StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;

const defaultDataWith6Colors = [
  { color: "#FF0000" },
  { color: "#00FF00" },
  { color: "#0000FF" },
  { color: "#FFFF00" },
  { color: "#FF00FF" },
  { color: "#00FFFF" },
];

const PinScreen = ({ route }) => {
  const { title, uri, pin } = route.params;
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [comment, setComment] = useState();
  const [userData, setUserData] = useState();
  const [loading, setIsLoading] = useState();
  console.log("====================================");
  console.log("pin from pin details", pin);
  console.log("====================================");

  useEffect(() => {
    getUserPosts(setUserData, setIsLoading);
  }, []);
  console.log("====================================");
  console.log("photos", pin.photos);
  console.log("====================================");

  const progress = useSharedValue(0);

  const renderItem =
    ({ rounded }) =>
    ({ item }) =>
      (
        <Image
          source={{
            uri: require("../../assets/images/placeholder.jpg") && item,
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className=" rounded-b-[20px]  shadow-2xl object-fill"
        />
      );
  return (
    <SafeAreaView className=" bg-white flex-1">
      <ScrollView>
        <Carousel
          loop={false}
          width={windowWidth}
          height={500}
          snapEnabled={true}
          pagingEnabled={true}
          autoPlayInterval={1000}
          data={pin.photos}
          style={{
            width: "100%",
            backgroundColor: "black",
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={renderItem({
            rounded: true,
            style: { marginRight: 8 },
          })}
        />
        {/* back arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white w-[41px] h-[41px] items-center justify-center rounded-[16px] mt-[20px] ms-[10px] shadow-2xl absolute z-10"
        >
          <ArrowLeftIcon color={"black"} />
        </TouchableOpacity>
        {/* Pagination Dots */}
        <View className=" flex-row justify-center items-center mt-5">
          {pin.photos.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
        <View className="px-3">
          <View className=" flex-row justify-between items-center">
            {/* Actions */}
            <View className=" my-3 flex-row">
              {/* Like */}

              <Pressable className="flex-row  items-center">
                <HeartIcon color={"#00868C"} size={30} />
                <Text className="text-[#00868C] ms-1 text-xl font-semibold">
                  1M
                </Text>
              </Pressable>

              {/* Comment */}

              <Pressable className="flex-row ms-3 items-center">
                <ChatBubbleOvalLeftIcon color={"#00868C"} size={30} />
                <Text className="text-[#00868C] ms-1 text-xl font-semibold">
                  20K
                </Text>
              </Pressable>

              {/* Send */}
              <View className=" flex-row ms-3  items-center">
                <Pressable>
                  <PaperAirplaneIcon color={"#00868C"} size={30} />
                </Pressable>
              </View>
            </View>
            <Pressable>
              <EllipsisHorizontalIcon color={"#00868C"} size={30} />
            </Pressable>
          </View>
          {/* user */}
          <Pressable
            onPress={() =>
              navigation.push("ProfileOther", {
                id: pin?.user?._id,
              })
            }
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: "https://picsum.photos/id/22/200" }}
                width={35}
                height={35}
                className="rounded-full"
              />
              <Text className="ms-3 text-lg font-semibold">
                {pin?.user.username}
              </Text>
            </View>
          </Pressable>
          {/* post title and Description */}
          <View className="mt-3">
            <Text className="text-black text-2xl font-bold ">{pin?.title}</Text>
            <Text className=" text-base text-textSecondary font-medium ">
              {pin?.description}
            </Text>
          </View>

          {/* Adding Comment */}
          <View className="mt-5 relative">
            <ArrowUpCircleIcon
              color="#00868C"
              size={30}
              style={{ position: "absolute", zIndex: 3, top: 10, right: 12 }}
            />
            <TextInput
              placeholder="Add a Comment..."
              className="  w-full border border-[#00868C] rounded-[26px]  p-3 ps-4"
              value={comment}
              autoCapitalize="none"
              onChangeText={(text) => setComment(text)}
              keyboardType="email-address"
              placeholderTextColor="#00868C"
            />
          </View>

          <View></View>

          <View className="w-full mt-6 mb-3 bg-[#ECEEF2] h-[2px]" />

          <View className="flex-row justify-between">
            {/* first Col */}
            <View className=" w-[50%] px-1   ">
              {userData
                ?.filter((post, i) => i % 2 === 1 && post.id !== pin.id)
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
                ?.filter((post, i) => i % 2 === 0 && post.id !== pin.id)
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#333",
    width: 10,
    height: 10,
  },
});
export default PinScreen;
