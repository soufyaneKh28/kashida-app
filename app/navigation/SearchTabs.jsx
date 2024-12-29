import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchByUser from "../components/SearchByUser";
import SearchByPost from "../components/SearchByPost";

const Tab = createMaterialTopTabNavigator();
export default function SearchTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarItemStyle: {
          fontSize: 29,
        },
        tabBarActiveTintColor: "#7FB9E6",
        tabBarStyle: {
          backgroundColor: "white",
          borderBottomEndRadius: 20,
          borderBottomLeftRadius: 20,
          overflow: "hidden",
          flexDirection: "row",
          justifyContent: "center",
        },
      }}
    >
      <Tab.Screen name="Search By Users" component={SearchByUser} />
      <Tab.Screen name="Search By Post" component={SearchByPost} />
      {/* <Tab.Screen name="Profile" component={} /> */}
    </Tab.Navigator>
  );
}
