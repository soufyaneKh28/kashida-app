import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
// import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useNavigation, useRoute } from "@react-navigation/native";
const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("jwtToken"); // Clear the token from SecureStore
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView>
      <Text>hello It is kashida khkhkhk</Text>

      <Button title="log out" onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default HomeScreen;
