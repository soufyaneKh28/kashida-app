import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { CheckIcon, PlusIcon } from "react-native-heroicons/outline";
import { API_URL } from "@env";
import { colors } from "../styles/colors";

const FollowBtn = ({ followState = false, userId }) => {
  const [isClicked, setIsClicked] = useState(followState);

  function Follow() {
    setIsClicked(true);
    FollowUser();
  }

  function UnFollow() {
    setIsClicked(false);
    UnFollowUser();
  }

  const FollowUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/k1/follow/${userId}/follow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to fetch user data.");
      }

      const userData = await response.json();
      console.log("User Data:", userData);
      console.log("User followed");
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Failed to fetch user data. Please try again.");
    }
  };

  const UnFollowUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/k1/follow/${userId}/unfollow`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to fetch user data.");
      }

      console.log("User Unfollowed");
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Failed to fetch user data. Please try again.");
    }
  };

  return (
    <TouchableOpacity
      onPress={isClicked ? UnFollow : Follow}
      style={[
        styles.button,
        isClicked ? styles.followingButton : styles.followButton,
      ]}
    >
      {isClicked ? (
        <CheckIcon size={22} color={colors.secondary} />
      ) : (
        <PlusIcon color="white" size={22} />
      )}
      <Text
        style={[
          styles.buttonText,
          isClicked ? styles.followingText : styles.followText,
        ]}
      >
        {isClicked ? "Following" : "Follow"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 130,
    height: 41,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    gap: 4,
  },
  followButton: {
    backgroundColor: colors.secondary,
  },
  followingButton: {
    backgroundColor: colors.background,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  followText: {
    color: colors.background,
  },
  followingText: {
    color: colors.secondary,
  },
});

export default FollowBtn;
