import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const PinScreen = ({ route }) => {
  const { title, uri } = route.params;
  const navigation = useNavigation();
  return (
    <SafeAreaView className=" bg-white flex-1">
      <Image
        source={{ uri: uri }}
        style={{ width: "100%", height: 400 }}
        className=" rounded-b-[30px]  shadow-2xl"
      />
      <Text className="text-black text-xl font-bold mx-3">{title}</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-white w-[41px] h-[41px] items-center justify-center rounded-[16px] mt-[20px] ms-[10px] shadow-2xl absolute "
      >
        <ArrowLeftIcon color={"black"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PinScreen;
