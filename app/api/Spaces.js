const baseurl = "http://10.0.2.2:7000";

import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export const GetSpaces = async (setCategories, setIsLoading) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${baseurl}/api/k1/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      // setIsLoading(true);
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch user data.");
    }

    // Parse the JSON response
    const userData = await response.json();
    setCategories(userData?.data.data);
    console.log("Categories:", userData?.data.data);
    console.log("Success", "User data retrieved successfully!");
    setIsLoading(false);
    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Error", "Failed to fetch user data. Please try again.");
  }
};

export const GetSpacePost = async (setPosts, setIsLoading, title) => {
  try {
    // Retrieve the JWT token from SecureStore
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("jwtToken");
    const space = await title;
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(
      `${baseurl}/api/k1/posts?categories=${space}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          "Cache-Control": "no-cache", // Disable caching
        },
      }
    );

    // Check if the response is OK
    if (!response.ok) {
      // setIsLoading(true);
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch GetSpacePost.");
    }

    // Parse the JSON response
    const userData = await response.json();
    setPosts(userData.data.posts);
    console.log("GetSpacePost===========:", userData.data.posts);
    console.log("Success", "GetSpacePost retrieved successfully!");
    setIsLoading(false);
    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error(`"Error fetching GetSpacePost from :`, error);
    alert("Error", "Failed to fetch user data. Please try again.");
  }
};
