import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

import Carousel from "react-native-reanimated-carousel";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Parallax from "../components/Parallax";

const Spaces = () => {
  return (
    <SafeAreaView className=" bg-white flex-1">
      <ScrollView
        className="pb-[500px]"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Image
          source={require("../../assets/images/kashidaOut.png")}
          className=" absolute top-[10px] z-0 left-[-100px]"
        />
        <Text className=" text-center mt-4 text-lg font-bold">Spaces</Text>

        {/* Following Scroll View */}

        <Text className=" text-xl px-3 text-gray-600 font-bold mt-10">
          Following
        </Text>

        <Parallax />
        <Text className=" text-xl px-3 text-gray-600 font-bold mt-10">
          Recommended
        </Text>

        <Parallax />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  CarouselItem: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
export default Spaces;
