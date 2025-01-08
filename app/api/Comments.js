const baseurl = "http://10.0.2.2:7000";
import axios from "axios";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export const getUserComments = async (setCommentsData, setIsLoading, id) => {
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
    const response = await axios.get(`${baseurl}/api/k1/posts/${id}/comments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });

    // Set the comments data and stop the loading
    setCommentsData(response.data?.data.comments);
    console.log("User Comments:", response.data?.data.comments);
    console.log("Success", "Comments data retrieved successfully!");
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching getUserComments:", error);
    setIsLoading(false); // Stop loading in case of error
    Alert.alert("Error", "Failed to fetch user comments. Please try again.");
  }
};
export const getCommentReplies = async (setIsLoading, id) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      setIsLoading(false); // Stop loading
      return;
    }

    // Make the GET request using axios
    const response = await axios.get(
      `${baseurl}/api/k1/comments/${id}/replies`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );

    // Set the comments data and stop the loading

    console.log("Comment Replies:", response.data?.data.replies);
    console.log("Success", "Replies data retrieved successfully!");

    return response.data.data;
  } catch (error) {
    console.error("Error fetching getCommentReplies:", error);
    // Stop loading in case of error
    Alert.alert("Error", "Failed to fetch Comment Replies. Please try again.");
  }
};
export const LikeComment = async (id) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");

      return;
    }

    // Make the GET request using axios
    const response = await axios.patch(
      `${baseurl}/api/k1/comments/${id}/like`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );

    // Set the comments data and stop the loading

    console.log("Comment liked");
    console.log("Success", "Replies data retrieved successfully!");

    // return response.data.data;
  } catch (error) {
    console.error("Error fetching LikeComment:", error);
    // Stop loading in case of error
    Alert.alert("Error", "Failed to fetch Comment Replies. Please try again.");
  }
};
export const AddComment = async (comment) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");

      return;
    }

    // Make the GET request using axios
    const response = await axios.patch(
      `${baseurl}/api/k1/comments/${id}/like`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );

    // Set the comments data and stop the loading

    console.log("Comment liked");
    console.log("Success", "Replies data retrieved successfully!");

    // return response.data.data;
  } catch (error) {
    console.error("Error fetching LikeComment:", error);
    // Stop loading in case of error
    Alert.alert("Error", "Failed to fetch Comment Replies. Please try again.");
  }
};
