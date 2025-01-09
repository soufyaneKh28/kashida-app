// import "./gesture-handler";
import "../global.css";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const logoImage = require("../assets/images/adaptive-icon.png");
import "./gesture-handler";
// import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import OnBoarding from "./screens/OnBoarding";
// import SignUp from "./screens/SignUp";
import AuthStack from "./navigation/AuthStack";
import BottomTabs from "./navigation/BottomTabs";
import { ActivityIndicator } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { useState } from "react";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// const logoImage = require("../assets/images/adaptive-icon.png");
import "../global.css";
// import HomeScreen from "./screens/HomeScreen";
// import OnBoarding from "../screens/OnBoarding";
// import Login from "../screens/Login";
// import SignUp from "../screens/SignUp";
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeIcon, UserIcon, CogIcon } from "react-native-heroicons/solid";

import HomeScreen from "./screens/HomeScreen";
import SignUp from "./screens/SignUp";
import Posting from "./screens/Posting";
import SettingsStack from "./navigation/SettingsStack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  // const isLoggedIn = !!SecureStore.getItemAsync("jwtToken");
  // This is the default configuration
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
  });
  useEffect(() => {
    // Check if a token is stored in SecureStore
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("jwtToken");
      if (token) {
        setIsLoggedIn(true); // Token exists, user is logged in
      } else {
        setIsLoggedIn(false); // No token, user is not logged in
      }
    };

    checkToken(); // Check token when app starts
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <ActivityIndicator size="large" />; // Replace with your loading screen component
  }
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="bottomTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreatePost"
            component={Posting}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingsStack"
            component={SettingsStack}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
