// const baseurl = "http://10.0.2.2:7000";
import axios from "axios";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { baseurl } from "./user";

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
    // console.log("User Comments:", response.data?.data.comments);
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
// export const LikeComment = async (id) => {
//   try {
//     // Retrieve the JWT token from SecureStore
//     const token = await SecureStore.getItemAsync("jwtToken");
//     if (!token) {
//       Alert.alert("Error", "No token found. Please log in again.");

//       return;
//     }

//     // Make the GET request using axios
//     const response = await axios.post(
//       `${baseurl}/api/k1/comments/${id}/LikeComment`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//         },
//       }
//     );

//     // Set the comments data and stop the loading

//     console.log("Comment liked");
//     console.log("Success", "Replies data retrieved successfully!");

//     // return response.data.data;
//   } catch (error) {
//     console.error("Error fetching LikeComment:", error);
//     // Stop loading in case of error
//     Alert.alert("Error", "Failed to fetch Comment Replies. Please try again.");
//   }
// };

export const LikeComment = async (id) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(
      `${baseurl}/api/k1/comments/${id}/LikeComment`,
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
    console.log("post Liked");

    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Error", "Failed to fetch user data. Please try again.");
  }
};

export const unlikeComment = async (id) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(
      `${baseurl}/api/k1/comments/${id}/unlikeComment`,
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

    // Parse the JSON response
    const userData = await response.json();

    console.log("User Data:", userData);
    console.log("Comment Unliked");

    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Error", "Failed to fetch user data. Please try again.");
  }
};

export const LikeReply = async (id) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${baseurl}/api/k1/replies/${id}/likeReply`, {
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

export const unlikeReply = async (id) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(
      `${baseurl}/api/k1/replies/${id}/unlikeReply`,
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

    // Parse the JSON response
    const userData = await response.json();

    console.log("User Data:", userData);
    console.log("Comment Unliked");

    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Error", "Failed to fetch user data. Please try again.");
  }
};

export const deleteComment = async (id) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${baseurl}/api/k1/comments/${id}`, {
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
      throw new Error(errorResponse.message || "Failed to deleteComment data.");
    }

    // Parse the JSON response
    // const userData = await response.json();

    // console.log("User Data:", userData);
    Alert.alert("Comment Deleted Succssfully");
    console.log("Comment Deleted");

    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching deleteComment:", error);
    alert("Error", "Failed to fetch deleteComment. Please try again.");
  }
};

export const deleteReply = async (id) => {
  try {
    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${baseurl}/api/k1/replies/${id}`, {
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
      throw new Error(errorResponse.message || "Failed to deleteComment data.");
    }

    // Parse the JSON response
    // const userData = await response.json();

    // console.log("User Data:", userData);
    Alert.alert("Reply Deleted Succssfully");
    console.log("Reply Deleted");

    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching deleteComment:", error);
    alert("Error", "Failed to fetch deleteComment. Please try again.");
  }
};
