import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
// import { StyleSheet } from "nativewind";

const OutlineButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-full p-4 flex-row justify-center  border border-[#bbbcbd] "
      onPress={onPress}
      style={{
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
  },
});
