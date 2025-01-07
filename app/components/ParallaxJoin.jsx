import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width: windowWidth } = Dimensions.get("window");
const ITEM_WIDTH = windowWidth * 0.65; // Width of each item
const ITEM_HEIGHT = 300; // Height of each item
const SPACER = 75; // Space around items

const data = [
  { id: "1" },
  { id: "2", color: "#00FF00" },
  { id: "3", color: "#0000FF" },
  { id: "4", color: "#FFA500" },
  { id: "5", color: "#800080" },
  { id: "1" },
  { id: "2", color: "#00FF00" },
  { id: "3", color: "#0000FF" },
  { id: "4", color: "#FFA500" },
  { id: "5", color: "#800080" },
  { id: "1" },
  { id: "2", color: "#00FF00" },
  { id: "3", color: "#0000FF" },
  { id: "4", color: "#FFA500" },
  { id: "5", color: "#800080" },
  { id: "1" },
  { id: "2", color: "#00FF00" },
  { id: "3", color: "#0000FF" },
  { id: "4", color: "#FFA500" },
  { id: "5", color: "#800080" },
];

const ParallaxJoin = ({ spaces, navigation }) => {
  const scrollX = useSharedValue(0);

  // console.log("====================================");
  // console.log(spaces);
  // console.log("====================================");
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const getAnimatedStyle = (scrollX, index) => {
    const animatedStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * ITEM_WIDTH,
        index * ITEM_WIDTH,
        (index + 1) * ITEM_WIDTH,
      ];

      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.8, 1, 0.8], // Scale the center item larger
        Extrapolate.CLAMP
      );

      const translateX = interpolate(
        scrollX.value,
        inputRange,
        [-20, 0, 20], // Slight offset for surrounding items
        Extrapolate.CLAMP
      );

      return {
        transform: [{ scale }, { translateX }],
      };
    });

    return animatedStyle;
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: SPACER }}
      >
        {spaces?.map((space, index) => {
          return (
            <Animated.View
              key={index}
              // style={getAnimatedStyle(scrollX, index)}
            >
              <TouchableOpacity
                style={[styles.card]}
                onPress={() => navigation.push("SingleSpace", { space: space })}
              >
                <ImageBackground
                  source={require("../../assets/images/diwaniBg.png")}
                  style={{ width: "100%", height: "100%" }}
                >
                  <View className=" w-full h-full justify-end items-center pb-5">
                    <Image
                      source={require("../../assets/images/diwani.png")}
                      width={145}
                      height={62}
                    />
                    <Text className=" text-white text-lg font-bold mt-1">
                      {space.name}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",

    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ParallaxJoin;
