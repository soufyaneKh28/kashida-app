import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import BackArrow from "../components/BackArrow";

const Policy = ({ navigation }) => {
  return (
    <SafeAreaView className=" bg-white flex-1">
      <BackArrow navigation={navigation} />
      <Text>Policy</Text>
    </SafeAreaView>
  );
};

export default Policy;
