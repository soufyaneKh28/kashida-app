const baseurl = "http://10.0.2.2:7000";
import axios from "axios";
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
    setIsLoading(true);

    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    const space = await title;

    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      setIsLoading(false); // Set loading to false before returning
      return;
    }

    // Make the GET request using axios
    const response = await axios.get(`${baseurl}/api/k1/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        "Cache-Control": "no-cache", // Disable caching
      },
      params: {
        categories: space, // Send space as query parameter
      },
    });

    // Check if the response is valid
    setPosts(response.data.data.posts.reverse());
    console.log("GetSpacePost===========:", response.data.data.posts);
    console.log("Success", "GetSpacePost retrieved successfully!");

    setIsLoading(false); // Set loading to false once done
  } catch (error) {
    console.error("Error fetching GetSpacePost from:", error);
    setIsLoading(false); // Set loading to false in case of error
    Alert.alert("Error", "Failed to fetch user data. Please try again.");
  }
};
