import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

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
  const [me, setMe] = useState();
  const [followingSpaces, setFollowingSpaces] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // pull to refresh
  const onRefresh = useCallback(() => {
    setIsLoading(true);
    wait(2000).then(() => setIsLoading(false));
    // getPostData();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const allSpacesResponse = await GetSpaces(setSpaces, setIsLoading);
      const userSpacesResponse = await getMe(setMe, setIsLoading);
      const userSpaces = userSpacesResponse?.data;
      const allSpaces = allSpacesResponse?.data.data;
      if (!userSpaces) {
        console.error("No user spaces data received");
        return;
      }

      // setMe(userSpaces.data.data);
      // console.log("====================================");
      // await getMe(setMe, setIsLoading);
      console.log("====================================");
      // setMe(() => userSpaces?.data.data);
      console.log("meeeeeeee1", me);
      console.log("====================================");
      console.log("meee2", userSpaces);
      console.log("spaces", allSpaces);
      const filteredSpaces = allSpaces.filter((space) =>
        userSpaces.joinedSpaces.some(
          (joinedSpace) => joinedSpace.name === space.name
        )
      );
      setFollowingSpaces(filteredSpaces);
      console.log("Filtered spaces:", filteredSpaces);

      // Update followingSpaces state
      // console.log("userSpaces");
      // console.log(userSpaces.data.data?.name);
      // console.log("====================================");
      // for(let i = 0 ; i< spaces.length -0 ;i++){
      //   if (["Naskh","Thuluth"].)
      // }
      // userSpaces
      //   ? spaces.forEach((space) => {
      //       if ([...userSpaces.data.data?.name].includes(space.name)) {
      //         return console.log(space.name);
      //       }
      //     })
      //   : null;
      // let filteredSpaces = [];
      // userSpaces
      //   ? spaces.filter((space) =>
      //       userSpaces.data.data.joinedSpaces.some(
      //         (joinedSpace) => joinedSpace.name === space.name
      //       )
      //     )
      //   : null;
      console.log("====================================");
      // console.log("filteredSpaces");
      // console.log(filteredSpaces);
      // console.log("meeeeeeee");
      // console.log(me);
      console.log("====================================");
      // setFollowingSpaces(filteredSpaces);
      // console.log("====================================");
      // // console.log("follwwing me", me.joinedSpaces);
      // console.log("follwwing followingSpaces", followingSpaces);
      // console.log("follwwing userSpaces", userSpaces.data.data.joinedSpaces);

      console.log("====================================");

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
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

          <Parallax
            spaces={spaces}
            followingSpaces={followingSpaces}
            navigation={navigation}
          />
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
