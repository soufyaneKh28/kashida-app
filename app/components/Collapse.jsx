import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Collapse = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const height = useSharedValue(0);
  const rotation = useSharedValue(0); // For rotating the arrow
  const [contentHeight, setContentHeight] = useState(0);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);

    // Animate height
    height.value = isExpanded ? 0 : contentHeight;

    // Animate arrow rotation
    rotation.value = isExpanded ? 0 : 180; // Rotate to 180° when expanded
  };

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, { duration: 300 }),
    };
  });

  const animatedRotationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(`${rotation.value}deg`, { duration: 300 }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      {/* Header with Arrow */}
      <TouchableOpacity onPress={toggleCollapse} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={[styles.icon, animatedRotationStyle]}>
          <ChevronDownIcon color="#008087" />
        </Animated.View>
      </TouchableOpacity>

      {/* Collapsible Content */}
      <Animated.View style={[styles.content, animatedHeightStyle]}>
        <View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setContentHeight(height); // Store the content's full height
          }}
          style={styles.innerContent}
        >
          <Text style={styles.text}>{children}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default Collapse;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F3FAFF",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#008087",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    overflow: "hidden",
  },
  innerContent: {
    position: "absolute", // Ensure content takes full space for measurement
    width: "100%",
  },
  text: {
    padding: 10,
    fontSize: 14,
    color: "#333",
  },
});
