import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
// import { StyleSheet } from "nativewind";

const CustomButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity className="my-1" activeOpacity={0.8} onPress={onPress}>
      <LinearGradient
        colors={["#0E1B24", "#095E67"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        <Text
          className="text-white"
          style={{
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          {children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
  },
});
