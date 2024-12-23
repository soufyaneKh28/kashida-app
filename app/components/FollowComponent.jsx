import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import FollowBtn from "./FollowBtn";

const FollowComponent = ({ followState, navigation }) => {
  return (
    <View className="w-full flex-row items-center mt-2 py-3 justify-between">
      <Pressable onPress={() => navigation.push("ProfileOther")}>
        <View className="flex-row items-center">
          <Image
            source={{ uri: "https://picsum.photos/id/22/200" }}
            width={50}
            height={50}
            className="rounded-full"
          />
          <View className="ms-3">
            <Text className=" font-bold">Full Name</Text>
            <Text>@userName</Text>
          </View>
        </View>
      </Pressable>
      {/* Buttn */}
      <FollowBtn followState={followState} />
    </View>
  );
};

export default FollowComponent;
