import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import BackArrow from "../components/BackArrow";

const Security = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <BackArrow navigation={navigation} />
      <Text>Security</Text>
    </SafeAreaView>
  );
};

export default Security;
