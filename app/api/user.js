// api/userApi.js
import axios from "axios";
// export const API_URL = "http://10.0.2.2:7000";
import { API_URL } from "@env";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

console.log("====================================");
// console.log(" REACT_APP_API_URL", REACT_APP_API_URL);
console.log("====================================");
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
    const response = await axios.get(`${API_URL}/api/k1/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });

    // Set the user data and stop the loading
    setUserData(response.data?.data.posts);
    // console.log("User Posts:", response.data?.data.posts);
    console.log("Success", "User data retrieved successfully!");
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching getUserPosts:", error);
    setIsLoading(false); // Stop loading in case of error
    Alert.alert("Error", "Failed to fetch user posts. Please try again.");
  }
};

// Fetch user profile data
export const getUserProfile = async (setUserProfile, setIsLoading, id) => {
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
    const response = await axios.get(`${API_URL}/api/k1/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });

    // Set the user profile data and stop the loading
    setUserProfile(response.data?.data);
    console.log("User Profile:", response.data?.data);
    console.log("Success", "User data retrieved successfully!");
    setIsLoading(false);
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching getUserProfile:", error);
    setIsLoading(false); // Stop loading in case of error
    Alert.alert("Error", "Failed to fetch user profile. Please try again.");
  }
};

//

export const updateUserProfile = async (userId, updatedData) => {
  try {
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      setIsLoading(false); // Stop loading
      return;
    }
    const formData = new FormData();

    // Append all updated fields to formData
    Object.keys(updatedData).forEach((key) => {
      if (key === "photo" && updatedData[key][0]) {
        // Assuming photo is an array with a single item that is the URI
        const uri = updatedData[key][0];
        const filename = uri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image";
        formData.append("photo", { uri, name: filename, type });
      } else if (key === "birthday") {
        formData.append(key, updatedData[key].toISOString());
      } else {
        formData.append(key, updatedData[key]);
      }
    });

    const response = await fetch(`${API_URL}/users/updateMe`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`, // Assume we have a function to get the auth token
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// getting userFollowers by id

export const getUserFollowers = async (setUserFollow, setIsLoading, id) => {
  try {
    // Retrieve the JWT token from SecureStore
    // setUserFollow([]);
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${API_URL}/api/k1/follow/${id}/followers`, {
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
    setUserFollow(userData?.data.followersWithStatus);
    console.log("User Data:", userData?.data.followersWithStatus);
    console.log("Success", "getUserFollowers retrieved successfully!");
    setIsLoading(false);
    return userData?.data.followersWithStatus;
    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching getUserFollowers:", error);
    Alert("Error", "Failed to fetch getUserFollowers. Please try again.");
  }
};
export const getUserFollowings = async (setUserFollow, setIsLoading, id) => {
  try {
    // Retrieve the JWT token from SecureStore
    console.log("it  starteeeeeeeed");
    // setUserFollow([]);
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${API_URL}/api/k1/follow/${id}/followings`, {
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
    setUserFollow(userData?.data.followingsWithStatus);
    console.log("getUserFollowers Data:", userData?.data.followingsWithStatus);
    console.log("Success", "getUserFollowers retrieved successfully!");
    setIsLoading(false);
    return userData?.data.followingsWithStatus;
    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching getUserFollowers:", error);
    Alert("Error", "Failed to fetch getUserFollowers. Please try again.");
  }
};
export const getlikedposts = async (id) => {
  try {
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${API_URL}/api/k1/likedPosts/${id}`, {
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

    // console.log("getlikedposts Data:", userData?.data.likedPosts);
    console.log("Success", "getlikedposts retrieved successfully!");

    return userData?.data.posts;
    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching getlikedposts:", error);
    Alert("Error", "Failed to fetch getlikedposts. Please try again.");
  }
};

export const getPostsByUser = async (setUserData, setIsLoading, id) => {
  try {
    // Retrieve the JWT token from SecureStore
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");

      return;
    }

    // Make the GET request using Axios
    const response = await axios.get(`${API_URL}/api/k1/posts`, {
      params: { user: id }, // Query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });

    // Handle response data

    console.log(" getPostsByUser:", response.data.data.posts);
    setUserData(response.data?.data.posts);
    console.log("Success", "getPostsByUser retrieved successfully!");
    setIsLoading(false);
    return response.data.data.posts;
  } catch (error) {
    console.error("Error fetching getPostsByUser:", error);
    Alert.alert(
      "Error",
      error.response?.data?.message ||
        "Failed to fetch getPostsByUser. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};


