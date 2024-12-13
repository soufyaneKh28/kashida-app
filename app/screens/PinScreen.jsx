import { View, Text, Image } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

const PinScreen = () => {
  return (
    <View>
      <Text>PinScreen</Text>
      <Image
        source={{ uri: "https://picsum.photos/id/39/200" }}
        style={{ width: "100%", height: 200 }}
      />
    </View>
  );
};

export default PinScreen;
