import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import FollowComponent from "../components/FollowComponent";

const FollowsScreen = ({ navigation, route }) => {
  const { title } = route.params;
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
      <ScrollView className="flex-1 p-3 mt-8">
        {/* Follower Component */}

        <FollowComponent followState={true} navigation={navigation} />
        <FollowComponent followState={false} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FollowsScreen;
