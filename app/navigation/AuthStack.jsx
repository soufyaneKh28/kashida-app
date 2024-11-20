import { useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
// const logoImage = require("../assets/images/adaptive-icon.png");
import "../../global.css";
// import HomeScreen from "./screens/HomeScreen";
import OnBoarding from "../screens/OnBoarding";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Restaurent" component={RestaurentScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
