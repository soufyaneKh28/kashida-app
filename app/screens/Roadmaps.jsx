import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import RoadMapCollapse from "../components/RoadMapCollapse";
import { colors } from "../styles/colors";

const Roadmaps = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require("../../assets/images/kashidaOut.png")}
          style={styles.backgroundImage}
        />
        <Text style={styles.title}>Roadmaps</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/roadmap.png")}
            style={styles.roadmapImage}
          />
        </View>

        <RoadMapCollapse />
        <Image
          source={require("../../assets/images/road.png")}
          style={styles.roadImage}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  backgroundImage: {
    position: "absolute",
    top: 10,
    left: -100,
    zIndex: 0,
  },
  title: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  roadmapImage: {
    // Add any specific styles for the roadmap image if needed
  },
  roadImage: {
    width: "100%",
    height: 65,
    marginTop: 80,
  },
});

export default Roadmaps;
