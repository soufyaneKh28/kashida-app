// import "./gesture-handler";
import "../global.css";
import { useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const logoImage = require("../assets/images/adaptive-icon.png");

import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import OnBoarding from "./screens/OnBoarding";
import SignUp from "./screens/SignUp";

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    // <NavigationContainer>
    // <Provider store={store}>
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
    // </Provider>
    // </NavigationContainer>
  );
}
