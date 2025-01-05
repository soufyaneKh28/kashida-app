// api/userApi.js
import axios from "axios";
const baseurl = "http://10.0.2.2:7000";

import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export const getUserPosts = async (setUserData, setIsLoading) => {
  try {
    setIsLoading(true);

    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      setIsLoading(false); // Stop loading
      return;
    }

    // Make the GET request using axios
    const response = await axios.get(`${baseurl}/api/k1/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });

    // Set the user data and stop the loading
    setUserData(response.data?.data.posts);
    console.log("User Posts:", response.data?.data.posts);
    console.log("Success", "User data retrieved successfully!");
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching getUserPosts:", error);
    setIsLoading(false); // Stop loading in case of error
    Alert.alert("Error", "Failed to fetch user posts. Please try again.");
  }
};

// Fetch user profile data
export const getUserProfile = async ({ setUserProfile, setIsLoading, id }) => {
  try {
    setIsLoading(true);

    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      setIsLoading(false); // Stop loading
      return;
    }

    // Make the GET request using axios
    const response = await axios.get(`${baseurl}/api/k1/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });

    // Set the user profile data and stop the loading
    setUserProfile(response.data?.data.data);
    console.log("User Profile:", response.data?.data.data);
    console.log("Success", "User data retrieved successfully!");
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching getUserProfile:", error);
    setIsLoading(false); // Stop loading in case of error
    Alert.alert("Error", "Failed to fetch user profile. Please try again.");
  }
};

// 
