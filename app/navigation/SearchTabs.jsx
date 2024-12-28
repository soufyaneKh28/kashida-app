import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchByUser from "../components/SearchByUser";
import SearchByPost from "../components/SearchByPost";

const Tab = createMaterialTopTabNavigator();
export default function SearchTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: {},

        tabBarStyle: {
          backgroundColor: "powderblue",
          flexDirection: "row",
          justifyContent: "center",
          marginHorizontal: 100,
        },
      }}
    >
      <Tab.Screen name="Search By Users" component={SearchByUser} />
      <Tab.Screen name="Search By Post" component={SearchByPost} />
      {/* <Tab.Screen name="Profile" component={} /> */}
    </Tab.Navigator>
  );
}
