import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

// const API_URL = "http://10.0.2.2:7000";
import { API_URL } from "@env";
export const likePost = async (id) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${API_URL}/api/k1/posts/${id}/likePost`, {
      method: "POST",
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

    console.log("User Data:", userData);
    console.log("post Liked");

    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Error", "Failed to fetch user data. Please try again.");
  }
};
export const unLikePost = async (id) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${API_URL}/api/k1/posts/${id}/unlikePost`, {
      method: "DELETE",
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

    console.log("User Data:", userData);
    console.log("Post UnLiked");

    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Error", "Failed to fetch user data. Please try again.");
  }
};
export const deletePost = async (id) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${API_URL}/api/k1/posts/${id}`, {
      method: "DELETE",
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
    // const userData = await response.json();

    // console.log("User Data:", userData);
    console.log("Post deleted");
    Alert.alert("Post Deleted ");
    // Handle te user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Error", "Failed to fetch user data. Please try again.");
  }
};


export const sendPostReport = async (reportId) => {
  try {
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    const response = await fetch(`${API_URL}/api/k1/posts/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add Authorization header if needed
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        reportType: "post",
        reportId: reportId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    Alert.alert("Report sent successfully");
    return data;
  } catch (error) {
    console.error("Error sending report:", error);
    throw error;
  }
};
