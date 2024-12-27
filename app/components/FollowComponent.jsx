import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import FollowBtn from "./FollowBtn";

const FollowComponent = ({ followState, navigation, user }) => {
  return (
    <View className="w-full flex-row items-center mt-2 py-3 justify-between">
      <Pressable
        onPress={() =>
          navigation.push("ProfileOther", {
            user: user,
            id: user.following._id || user.follower._id,
          })
        }
      >
        <View className="flex-row items-center">
          <Image
            source={require("../../assets/images/profile-placeholder.jpg")}
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />
          <View className="ms-3">
            <Text className=" font-bold">
              {user?.follower?.username || user?.following?.username}
            </Text>
            <Text>@userName</Text>
          </View>
        </View>
      </Pressable>
      {/* Buttn */}
      <FollowBtn
        followState={followState}
        userId={user.following._id || user.follower._id}
      />
    </View>
  );
};

export default FollowComponent;
