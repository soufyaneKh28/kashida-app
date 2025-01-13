import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import FollowComponent from "../components/FollowComponent";
import { getMyFollowers, getMyFollowing } from "../api/me";
import { getUserFollowers, getUserFollowings } from "../api/user";

const OtherProfileFollowsScreen = ({ navigation, route }) => {
  const { title, id, mainUserId } = route.params;
  const [isloading, setIsLoading] = useState(false);
  const [userFollow, setUserFollow] = useState([]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  console.log("====================================");
  console.log(title);
  console.log("====================================");
  // let userFollowData = [];

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    wait(2000).then(() => setIsLoading(false));
    getAllData();
  }, [title]);

  async function getAllData() {
    if (title === "followers") {
      let userFollowData = await getUserFollowers(
        setUserFollow,
        setIsLoading,
        id
      );
      setUserFollow(userFollowData);
      console.log("====================================");
      console.log("userFollowData:", userFollowData);
      console.log("userFollow2:", userFollow);
      console.log("====================================");
    }
    if (title === "following") {
      let userFollowData = await getUserFollowings(
        setUserFollow,
        setIsLoading,
        id
      );
      setUserFollow(userFollowData);
      console.log("====================================");
      console.log("userFollowData:", userFollowData);
      console.log("userFollow2:", userFollow);
      console.log("====================================");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllData();
  }, [title]);
  // console.log("====================================");
  // console.log(userFollow);
  // console.log("====================================");
  return (
    <SafeAreaView className="bg-white flex-1">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-white w-[41px] h-[41px] items-center justify-center rounded-[16px] mt-[20px] ms-[10px] shadow-xl shadow-black absolute z-10"
      >
        <ArrowLeftIcon color={"black"} />
      </TouchableOpacity>

      <View className=" text-center w-full mt-[25px]">
        <Text className="text-center text-lg font-medium">{title}</Text>
      </View>
      <ScrollView
        className="flex-1 p-3 mt-8"
        refreshControl={
          <RefreshControl refreshing={isloading} onRefresh={onRefresh} />
        }
      >
        {/* Follower Component */}
        {isloading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {userFollow != undefined
              ? userFollow?.map((user) => (
                  <FollowComponent
                    key={user._id}
                    mainUserId={mainUserId}
                    user={user}
                    title={title}
                    followState={user?.isFollowing}
                    navigation={navigation}
                  />
                ))
              : null}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtherProfileFollowsScreen;
