import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated from "react-native-reanimated";

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

const PinScreen = ({ route }) => {
  const { title, uri, pin } = route.params;
  const navigation = useNavigation();

  const [comment, setComment] = useState();
  const [userData, setUserData] = useState();
  const [loading, setIsLoading] = useState();
  console.log("====================================");
  console.log("pin from pin details", pin);
  console.log("====================================");

  useEffect(() => {
    getUserPosts({ setUserData, setIsLoading });
  }, []);
  console.log("====================================");
  console.log("userData", userData);
  console.log("====================================");
  return (
    <SafeAreaView className=" bg-white flex-1">
      <ScrollView>
        <Image
          source={{ uri: uri }}
          style={{ width: "100%", height: 400 }}
          className=" rounded-b-[30px]  shadow-2xl"
        />
        {/* back arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white w-[41px] h-[41px] items-center justify-center rounded-[16px] mt-[20px] ms-[10px] shadow-2xl absolute z-10"
        >
          <ArrowLeftIcon color={"black"} />
        </TouchableOpacity>
        <View className="px-3">
          <View className=" flex-row justify-between items-center">
            {/* Actions */}
            <View className=" my-3 flex-row">
              {/* Like */}

              <Pressable className="flex-row  items-center">
                <HeartIcon color={"#00868C"} size={30} />
                <Text className="text-[#00868C] ms-1 text-xl font-semibold">
                  20
                </Text>
              </Pressable>

              {/* Comment */}

              <Pressable className="flex-row ms-3 items-center">
                <ChatBubbleOvalLeftIcon color={"#00868C"} size={30} />
                <Text className="text-[#00868C] ms-1 text-xl font-semibold">
                  20
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

export default PinScreen;
