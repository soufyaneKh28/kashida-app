import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "expo-router";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>hello It is kashida khkhkhk</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
