// import { View, Text, Image, Button } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "expo-router";
// import { TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");

const COLORS = { primary: "#fff", white: "#fff" };

const slides = [
  {
    id: "1",
    image: require("../../assets/images/onBoarding1.png"),
    title: "Learn anytime and anywhere",
    subtitle:
      "Quarantine is the perfect time to spend your day learning something new, from anywhere!",
  },
  {
    id: "2",
    image: require("../../assets/images/image2.png"),
    title: "Achieve Your Goals",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "3",
    image: require("../../assets/images/image3.png"),
    title: "Increase Your Value",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const Slide = ({ item }) => {
  return (
    <View className=" mt-20" style={{ alignItems: "center" }}>
      <Image
        source={item?.image}
        style={{ height: "70%", width, resizeMode: "contain" }}
      />
      <View className=" mt-10">
        <Text className=" max-w-[340px] text-[24px] font-semibold text-center">
          {item?.title}
        </Text>
        <Text className=" max-w-[300px] text-center mt-3 text-[#78746D]">
          {item?.subtitle}
        </Text>
      </View>
    </View>
  );
};

const OnBoarding = () => {
  const navigation = useNavigation();

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };
  // const Skip = ({ isLight, skipLabel, ...props }) => (
  //   <Button
  //     title={"Skip"}
  //     onPress={() => navigation.replace("Login")}
  //     buttonStyle={{
  //       backgroundColor: "red",
  //     }}
  //     containerViewStyle={{
  //       marginVertical: 10,
  //       width: 70,
  //     }}
  //     textStyle={{ color: "#fff" }}
  //     {...props}
  //   >
  //     {skipLabel}
  //   </Button>
  // );

  // const Next = ({ ...props }) => (
  //   <TouchableOpacity
  //     className="w-full bg-black "
  //     title={"Next"}
  //     buttonStyle={{
  //       backgroundColor: "red",
  //     }}
  //     containerViewStyle={{
  //       marginVertical: 10,
  //       width: 70,
  //       backgroundColor: "red",
  //     }}
  //     textStyle={{ color: "#fff" }}
  //     {...props}
  //   >
  //     <Text className="text-white">Next</Text>
  //   </TouchableOpacity>
  // );

  // const Done = ({ ...props }) => (
  //   <Button
  //     title={"Done"}
  //     containerViewStyle={{
  //       marginVertical: 10,
  //       width: 70,
  //       // backgroundColor: backgroundColor(isLight),
  //     }}
  //     //   textStyle={{ color: color(isLight) }}
  //     {...props}
  //   />
  // );

  const Footer = () => {
    return (
      <View
        className="pt-5"
        style={{
          height: height * 0.25,
          // justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {/*  height: 2.5,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 2, */}
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              className={` h-2   mx-1 rounded-md ${
                currentSlideIndex == index
                  ? " w-4 bg-gray-900  "
                  : "w-2 bg-[#D5D4D4]"
              }`}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View className="w-full flex-col my-5" style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace("Login")}
              >
                <LinearGradient
                  colors={["#0E1B24", "#095E67"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.gradient}
                >
                  <Text
                    className="text-white"
                    style={{ fontWeight: "bold", fontSize: 15 }}
                  >
                    GET STARTED
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View className=" gap-1">
              <TouchableOpacity activeOpacity={0.8} onPress={goToNextSlide}>
                <LinearGradient
                  colors={["#0E1B24", "#095E67"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.gradient}
                >
                  <Text
                    className="text-white"
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    NEXT
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-full p-4  border border-[#0E1922] "
                onPress={skip}
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 25,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                  className="text-black "
                >
                  SKIP
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="h-full">
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
        <StatusBar backgroundColor={COLORS.primary} />
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          contentContainerStyle={{ height: height * 0.75 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={slides}
          pagingEnabled
          renderItem={({ item }) => <Slide item={item} />}
        />
        <Footer />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: "70%",
    textAlign: "center",
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 2,
  },
  // btn: {
  //   flex: 1,
  //   height: 50,
  //   borderRadius: 5,
  //   backgroundColor: "#fff",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default OnBoarding;
