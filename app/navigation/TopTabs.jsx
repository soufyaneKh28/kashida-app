import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import FollowingScreen from "../screens/FollowingScreen";
import HomeStack from "./HomeStack";
import { SafeAreaView, Text } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: "white",
          borderBottomWidth: 0,
          paddingTop: 10,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "transparent", // Hide the indicator
        },
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              color,
              fontSize: 16,
              fontWeight: focused ? "700" : "500",
              textTransform: "none",
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarItemStyle: {
          width: "auto",
          marginHorizontal: 16, // Add gap between tabs
        },
        tabBarActiveTintColor: "#7FB9E6",
        tabBarInactiveTintColor: "#AADAFF",
        tabBarPressColor: "transparent",
        tabBarContentContainerStyle: {
          justifyContent: "center", // Center tabs horizontally
        },
        tabBarGap: 5, // Gap between tabs
      })}
      style={{
        width: "100%",
      }}
    >
      <Tab.Screen name="Feed" component={HomeScreen} />
      <Tab.Screen name="Following" component={FollowingScreen} />
    </Tab.Navigator>
  );
}
