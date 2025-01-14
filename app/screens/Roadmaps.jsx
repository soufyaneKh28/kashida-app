import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import Collapse from "../components/Collapse";
import RoadMapCollapse from "../components/RoadMapCollapse";
import DownloadModal from "../components/DownloadModal";
import Mashq from "../components/Mashq";

const Roadmaps = () => {
  return (
    <SafeAreaView className=" bg-white flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Image
          source={require("../../assets/images/kashidaOut.png")}
          className=" absolute top-[10px] z-0 left-[-100px]"
        />
        <Text className=" text-center mt-4 text-lg font-bold">Roadmaps</Text>
        <View className=" flex-row justify-center mt-10">
          <Image
            source={require("../../assets/images/roadmap.png")}
            className=" "
          />
        </View>

        <RoadMapCollapse />
        <Image
          source={require("../../assets/images/road.png")}
          className=" w-full h-[65px] mt-20"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Roadmaps;
