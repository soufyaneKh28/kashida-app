import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import Carousel from "react-native-reanimated-carousel";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Parallax from "../components/Parallax";
import { GetSpaces } from "../api/Spaces";
import { useNavigation } from "@react-navigation/native";
import { getMe } from "../api/me";
import ParallaxJoin from "../components/ParallaxJoin";

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [me, setMe] = useState([]);
  const [followingSpaces, setFollowingSpaces] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSpaces = await getMe(setMe, setIsLoading);
        setFollowingSpaces(userSpaces.data.data.joinedSpaces);
        console.log("====================================");
        console.log("follwwing me", me.joinedSpaces);
        console.log("follwwing followingSpaces", followingSpaces);
        console.log("follwwing userSpaces", userSpaces.data.data.joinedSpaces);

        console.log("====================================");
        GetSpaces(setSpaces, setIsLoading);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className=" bg-white flex-1">
      {isLoading ? (
        <View className=" flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          className="pb-[500px]"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <Image
            source={require("../../assets/images/kashidaOut.png")}
            className=" absolute top-[10px] z-0 left-[-100px]"
          />
          <Text className=" text-center mt-4 text-lg font-bold">Spaces</Text>

          {/* Following Scroll View */}

          <Text className=" text-xl px-3 text-gray-600 font-bold mt-10">
            Following
          </Text>
          {followingSpaces && followingSpaces.length > 0 ? (
            <ParallaxJoin spaces={followingSpaces} navigation={navigation} />
          ) : (
            <View className=" h-[250px] justify-center items-center">
              <Text className="text-center font-bold">
                there is no joint spaces
              </Text>
            </View>
          )}

          <Text className=" text-xl px-3 text-gray-600 font-bold mt-10">
            Recommended
          </Text>

          <Parallax spaces={spaces} navigation={navigation} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  CarouselItem: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
export default Spaces;
