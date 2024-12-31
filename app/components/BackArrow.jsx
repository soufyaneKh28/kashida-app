import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const BackArrow = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className="bg-white w-[41px] h-[41px] items-center justify-center rounded-[16px] mt-[20px] ms-[10px] shadow-2xl absolute z-10"
    >
      <ArrowLeftIcon color={"black"} />
    </TouchableOpacity>
  );
};

export default BackArrow;
