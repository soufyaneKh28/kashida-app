import { View, Text, Image } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

const PinScreen = ({ route }) => {
  const { title, uri } = route.params;
  return (
    <View>
      <Image source={{ uri: uri }} style={{ width: "100%", height: 400 }} />
      <Text className="text-black text-xl font-bold mx-3">{title}</Text>
    </View>
  );
};

export default PinScreen;
