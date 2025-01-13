import { useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
// const logoImage = require("../assets/images/adaptive-icon.png");
import "../../global.css";
// import HomeScreen from "./screens/HomeScreen";
import OnBoarding from "../screens/OnBoarding";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import ForgotPassword1 from "../screens/ForgotPassword1";
import ForgotPassword2 from "../screens/ForgotPassword2";
import ForgotPassword3 from "../screens/ForgotPassword3";

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
      <Stack.Screen
        name="ForgotPassword1"
        component={ForgotPassword1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword2"
        component={ForgotPassword2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword3"
        component={ForgotPassword3}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Restaurent" component={RestaurentScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
