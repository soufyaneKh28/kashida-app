import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";

import PinScreen from "../screens/PinScreen";
import { useNavigation } from "@react-navigation/native";
// import { BlurView } from "expo-blur";

import ProfileOther from "../screens/ProfileOther";

const Stack = createNativeStackNavigator();

// Stack Navigator for Home Tab
export default function HomeStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Pin"
        component={PinScreen}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
      <Stack.Screen
        name="ProfileOther"
        component={ProfileOther}
        options={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      />
    </Stack.Navigator>
  );
}
