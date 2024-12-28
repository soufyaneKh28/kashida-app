import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import FollowBtn from "./FollowBtn";

const UserSearch = ({ followState, navigation, user }) => {
  return (
    <View className="w-full flex-row items-center mt-2 py-3 justify-between">
      <TouchableOpacity className="w-full" onPress={() => console.log("")}>
        <View className="flex-row items-center">
          <Image
            source={require("../../assets/images/profile-placeholder.jpg")}
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />
          <View className="ms-3">
            <Text className=" font-bold">useer text 222</Text>
            <Text>@userName</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserSearch;
