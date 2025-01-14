import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

export const SkeletonLoader = ({ width, height, style }) => {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      style={[
        { width, height, backgroundColor: "#f3faff", overflow: "hidden" },
        style,
      ]}
    >
      <AnimatedLG
        colors={["#f3faff", "#cae8ff", "#f3faff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

export const CategorySkeleton = () => (
  <View style={styles.categorySkeleton}>
    <SkeletonLoader width={80} height={30} style={styles.categoryLoader} />
  </View>
);

export const PinSkeleton = ({ isEven }) => (
  <View style={[styles.pinSkeleton, isEven ? { marginTop: 16 } : {}]}>
    <SkeletonLoader
      width="100%"
      height={isEven ? 180 : 220}
      style={styles.pinImage}
    />
    <SkeletonLoader width={100} height={16} style={styles.pinTitle} />
  </View>
);

const styles = StyleSheet.create({
  categorySkeleton: {
    marginRight: 8,
  },
  categoryLoader: {
    borderRadius: 15,
  },
  pinSkeleton: {
    marginBottom: 16,
  },
  pinImage: {
    borderRadius: 16,
    marginBottom: 8,
  },
  pinTitle: {
    borderRadius: 4,
  },
});
