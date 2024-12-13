import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { HeartIcon } from "react-native-heroicons/outline";

const Pin = ({ title, uri, onPress }) => {
  return (
    <TouchableOpacity
      className="rounded-[10px] h-fit overflow-hidden my-3"
      onPress={onPress}
    >
      <Image
        source={{ uri: uri }}
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
              <Text className=" font-bold text-xl text-white">{title}</Text>
            </View>
            <TouchableOpacity className="bg-white h-10 w-10 justify-center items-center rounded-full">
              <HeartIcon color="black" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default Pin;
