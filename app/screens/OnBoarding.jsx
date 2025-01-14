import React, { useRef, useState } from "react";
import { useNavigation } from "expo-router";
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
import { colors } from "../styles/colors";

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
    <View style={styles.slideContainer}>
      <Image source={item?.image} style={styles.slideImage} />
      <View style={styles.slideTextContainer}>
        <Text style={styles.slideTitle}>{item?.title}</Text>
        <Text style={styles.slideSubtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnBoarding = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index
                  ? styles.indicatorActive
                  : styles.indicatorInactive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentSlideIndex === slides.length - 1 ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.replace("Login")}
            >
              <LinearGradient
                colors={["#0E1B24", "#095E67"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>GET STARTED</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.button}
              >
                <LinearGradient
                  colors={["#0E1B24", "#095E67"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>NEXT</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={skip}
                style={styles.skipButton}
              >
                <Text style={styles.skipButtonText}>SKIP</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={styles.flatListContent}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flatListContent: {
    height: height * 0.75,
  },
  slideContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  slideImage: {
    height: "70%",
    width,
    resizeMode: "contain",
  },
  slideTextContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  slideTitle: {
    maxWidth: 340,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  slideSubtitle: {
    maxWidth: 300,
    textAlign: "center",
    marginTop: 12,
    color: "#78746D",
  },
  footer: {
    height: height * 0.25,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  indicator: {
    height: 8,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  indicatorActive: {
    width: 16,
    backgroundColor: "#0E1922",
  },
  indicatorInactive: {
    width: 8,
    backgroundColor: "#D5D4D4",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonGroup: {
    gap: 4,
  },
  button: {
    height: 50,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0E1922",
  },
  skipButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default OnBoarding;
