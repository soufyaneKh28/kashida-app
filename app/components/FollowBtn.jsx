import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { CheckIcon, PlusIcon } from "react-native-heroicons/outline";
import { baseurl } from "../api/user";
const FollowBtn = ({ followState = false, userId }) => {
  const [isClicked, setisClicked] = useState(followState);

  function Follow() {
    setisClicked(true);
    FollowUser();
  }
  function UnFollow() {
    setisClicked(false);
    UnFollowUser();
  }

  const FollowUser = async () => {
    try {
      // Retrieve the JWT token from SecureStore
      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      // Make the GET request
      const response = await fetch(
        `${baseurl}/api/k1/follow/${userId}/follow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        // setIsLoading(true);
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to fetch user data.");
      }

      // Parse the JSON response
      const userData = await response.json();

      console.log("User Data:", userData);
      console.log("User followed");

      // Handle the user data (e.g., update state or UI)
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error", "Failed to fetch user data. Please try again.");
    }
  };
  const UnFollowUser = async () => {
    try {
      // Retrieve the JWT token from SecureStore
      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      // Make the GET request
      const response = await fetch(
        `${baseurl}/api/k1/follow/${userId}/unfollow`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        // setIsLoading(true);
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to fetch user data.");
      }

      // // Parse the JSON response
      // const userData = await response.json();

      // console.log("User Data:", userData);
      console.log("User Unfollowed");

      // Handle the user data (e.g., update state or UI)
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error", "Failed to fetch user data. Please try again.");
    }
  };

  return isClicked ? (
    <TouchableOpacity
      onPress={UnFollow}
      className="bg-white border-secondary border w-[130px] h-[41px] gap-1 items-center flex-row justify-center rounded-[5px]"
    >
      <CheckIcon size={22} color="#00868C" />
      <Text className=" text-secondary font-semibold text-lg">Following</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={Follow}
      className="bg-secondary w-[130px] h-[41px] gap-1 items-center flex-row justify-center rounded-[5px]"
    >
      <PlusIcon color="white" size={22} />
      <Text className="text-white font-semibold text-lg">Follow</Text>
    </TouchableOpacity>
  );
};

export default FollowBtn;
