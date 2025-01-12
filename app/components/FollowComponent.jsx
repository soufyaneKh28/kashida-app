import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import FollowBtn from "./FollowBtn";

const FollowComponent = ({ followState, navigation, user, title }) => {
  console.log("====================================");
  console.log(title);
  console.log("====================================");

  if (title === "following")
    return (
      <View className="w-full flex-row items-center mt-2 py-3 justify-between">
        <Pressable
          onPress={() =>
            navigation.push("ProfileOther", {
              user: user,
              id: user.following._id,
              followState: followState,
            })
          }
        >
          <View className="flex-row items-center">
            {user.following?.photo[0] &&
            user.following?.photo[0].includes("/res.cloudinary.com") ? (
              <Image
                source={{
                  uri: user.following?.photo[0],
                }}
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <Image
                source={{
                  uri: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                }}
                width={50}
                height={50}
                className="rounded-full"
              />
            )}

            <View className="ms-3">
              <Text className=" font-bold">{user?.following?.username}</Text>
              <Text>@userName</Text>
            </View>
          </View>
        </Pressable>
        {/* Buttn */}
        <FollowBtn followState={followState} userId={user.following._id} />
      </View>
    );
  else {
    return (
      <View className="w-full flex-row items-center mt-2 py-3 justify-between">
        <Pressable
          onPress={() =>
            navigation.push("ProfileOther", {
              user: user,
              id: user.follower._id,
              followState: followState,
            })
          }
        >
          <View className="flex-row items-center">
            {user.follower?.photo[0] &&
            user.follower?.photo[0].includes("/res.cloudinary.com") ? (
              <Image
                source={{
                  uri: user.follower?.photo[0],
                }}
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <Image
                source={{
                  uri: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                }}
                width={50}
                height={50}
                className="rounded-full"
              />
            )}

            <View className="ms-3">
              <Text className=" font-bold">{user?.follower?.username}</Text>
              <Text>@userName</Text>
            </View>
          </View>
        </Pressable>
        {/* Buttn */}
        <FollowBtn followState={followState} userId={user.follower._id} />
      </View>
    );
  }
};

export default FollowComponent;
  