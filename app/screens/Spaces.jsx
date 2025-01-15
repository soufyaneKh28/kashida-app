import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Parallax from "../components/Parallax";
import ParallaxJoin from "../components/ParallaxJoin";
import { GetSpaces } from "../api/Spaces";
import { getMe } from "../api/me";
import { colors } from "../styles/colors";

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [me, setMe] = useState();
  const [followingSpaces, setFollowingSpaces] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    wait(2000).then(() => setIsLoading(false));
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

      console.log("meeeeeeee1", me);
      console.log("meee2", userSpaces);
      console.log("spaces", allSpaces);
      const filteredSpaces = allSpaces.filter((space) =>
        userSpaces.joinedSpaces.some(
          (joinedSpace) => joinedSpace.name === space.name
        )
      );
      setFollowingSpaces(filteredSpaces);
      console.log("Filtered spaces:", filteredSpaces);

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
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        >
          <Image
            source={require("../../assets/images/kashidaOut.png")}
            style={styles.backgroundImage}
          />
          <Text style={styles.title}>Spaces</Text>

          <Text style={styles.sectionTitle}>Following</Text>
          {followingSpaces && followingSpaces.length > 0 ? (
            <ParallaxJoin spaces={followingSpaces} navigation={navigation} />
          ) : (
            <View style={styles.emptyFollowingContainer}>
              <Text style={styles.emptyFollowingText}>
                There are no joined spaces
              </Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>Recommended</Text>

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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    paddingBottom: 500,
  },
  scrollViewContent: {
    paddingBottom: 100,
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
  sectionTitle: {
    fontSize: 18,
    paddingHorizontal: 12,
    color: colors.textSecondary,
    fontWeight: "bold",
    marginTop: 40,
  },
  emptyFollowingContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyFollowingText: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.text,
  },
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
