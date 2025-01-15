import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import FollowComponent from "../components/FollowComponent";
import { getMyFollowers, getMyFollowing } from "../api/me";
import { colors } from "../styles/colors";

const FollowsScreen = ({ navigation, route }) => {
  const { title, mainUserId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [userFollow, setUserFollow] = useState([]);
  const [screenTitle, setScreenTitle] = useState(title);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    wait(2000).then(() => setIsLoading(false));
    if (title === "follower") {
      getMyFollowers(setUserFollow, setIsLoading);
    } else {
      setIsLoading(true);
      getMyFollowing(setUserFollow);
      setIsLoading(false);
    }
  }, [title]);

  useEffect(() => {
    if (title === "follower") {
      getMyFollowers(setUserFollow, setIsLoading);
    } else {
      setIsLoading(true);
      getMyFollowing(setUserFollow);
      setIsLoading(false);
    }
  }, [title]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <ArrowLeftIcon color={colors.text} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <>
            {userFollow?.map((user) => (
              <FollowComponent
                key={user._id}
                user={user}
                followState={user?.isFollowing}
                navigation={navigation}
                title={screenTitle}
                mainUserId={mainUserId}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    backgroundColor: colors.background,
    width: 41,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginTop: 20,
    marginLeft: 10,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    zIndex: 10,
  },
  titleContainer: {
    width: "100%",
    marginTop: 25,
  },
  titleText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: colors.text,
  },
  scrollView: {
    flex: 1,
    marginTop: 32,
  },
  scrollViewContent: {
    padding: 12,
  },
});

export default FollowsScreen;
