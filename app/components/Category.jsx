import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Category = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      className=" py-2 px-4 me-2 rounded-[50px] bg-[#CAE8FF] justify-center items-center"
      onPress={onPress}
    >
      <Text className="text-[#006468] font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default Category;
