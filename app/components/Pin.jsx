import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
// import { HeartIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
import { HeartIcon as HeartFill } from "react-native-heroicons/solid";
import { likePost, unLikePost } from "../api/post";

const Pin = ({
  title,
  uri,
  onPress,
  id,
  isEven,
  pin,
  likedState = pin.hasLiked,
}) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(likedState);

  const toggleIcon = () => {
    if (isLiked) {
      unLikePost(pin._id);
      setIsLiked(!isLiked);
    } else {
      likePost(pin._id);
      setIsLiked(!isLiked);
    }
  };
  return (
    <TouchableOpacity
      className="rounded-[10px] w-full m-1"
      style={{ height: isEven ? 300 : 320 }}
      onPress={() =>
        navigation.push("Pin", {
          uri: uri,
          title: title,
          pin: pin,
        })
      }
    >
      <Image
        source={
          { uri: uri }
          // ? { uri } // If `uri` exists, use it
          // : require("../../assets/images/placeholder.jpg") // Fallback to placeholder
        }
        className="w-full h-full rounded-[10px]"
        // style={{ aspectRatio: 1 / 1 }}
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
              <Text
                className=" font-bold text-xl text-white max-w-[100px] leading-5"
                numberOfLines={2}
              >
                {title}
              </Text>
            </View>
            <TouchableOpacity
              className=" bg-white h-10 w-10 justify-center items-center rounded-full"
              onPress={toggleIcon}
            >
              {isLiked ? (
                <HeartFill color="#00C8D1" />
              ) : (
                <HeartOutline color="#00C8D1" />
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default Pin;
