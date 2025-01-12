import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

const baseurl = "https://kashida-app-dep.onrender.com";
// getting User followers
export const getMyFollowers = async (setUserFollow, setIsLoading) => {
  try {
    // Retrieve the JWT token from SecureStore
    setUserFollow([]);
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(
      `${baseurl}/api/k1/follow/myFollowers`,
      {
        method: "GET",
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
    setUserFollow(userData?.data.followersWithStatus);
    console.log("User Data:", userData?.data.followersWithStatus);
    console.log("Success", "User data retrieved successfully!");
    setIsLoading(false);
    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    Alert("Error", "Failed to fetch user data. Please try again.");
  }
};
// getting User followers
export const getMyFollowing = async (setUserFollow) => {
  try {
    // Retrieve the JWT token from SecureStore

    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(
      `${baseurl}/api/k1/follow/myFollowings`,
      {
        method: "GET",
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
    setUserFollow(userData?.data.followingsWithStatus);
    console.log("User Data:", userData?.data.followingsWithStatus);
    console.log("Success", "User data retrieved successfully!");

    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    Alert("Error", "Failed to fetch user data. Please try again.");
  }
};

// getting user profile info
export const getMe = async (setMe, setIsLoading) => {
  try {
    // Retrieve the JWT token from SecureStore
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${baseurl}/api/k1/users/me`, {
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
    const me = await response.json();
    setMe(me?.data);
    console.log("User MEeee:", me.data);
    return me;
    console.log("Success", "User data retrieved successfully!");
    // setIsLoading(false);
    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching getMe:", error);
    alert("Error", "Failed to fetch getMe. Please try again.");
  }
};

// getting My posts

// export const getMyPosts = async (setUserData, setIsLoading, id) => {
//   try {
//     // Retrieve the JWT token from SecureStore
//     setIsLoading(true);
//     const token = await SecureStore.getItemAsync("jwtToken");
//     if (!token) {
//       Alert.alert("Error", "No token found. Please log in again.");
//       return;
//     }

//     // Make the GET request
//     const response = await fetch(`${baseurl}/api/k1/posts?user=${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//       },
//     });

//     // Check if the response is OK
//     if (!response.ok) {
//       // setIsLoading(true);
//       const errorResponse = await response.json();
//       throw new Error(errorResponse.message || "Failed to fetch user data.");
//     }

//     // Parse the JSON response
//     const userData = await response.json();
//     setUserData(userData.data.posts);
//     console.log("User Dataaaaaa:", userData.data.posts);
//     console.log("Success", "User data retrieved successfully!");
//     setIsLoading(false);
//     return userData;
//     // Handle the user data (e.g., update state or UI)
//   } catch (error) {
//     console.error("Error fetching getMyPosts:", error);
//     alert("Error", "Failed to fetch getMyPosts Please try again.");
//     setIsLoading(false);
//   }
// };
export const getMyPosts = async (setUserData, setIsLoading, id) => {
  try {
    setIsLoading(true);

    // Retrieve the JWT token from SecureStore
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      setIsLoading(false);
      return;
    }

    // Make the GET request using Axios
    const response = await axios.get(`${baseurl}/api/k1/posts`, {
      params: { user: id }, // Query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });

    // Handle response data
    setUserData(response.data.data.posts);
    console.log("User poooooooostsssssss:", response.data.data.posts);
    console.log("Success", "User data retrieved successfully!");
    return response.data.data.posts;
  } catch (error) {
    console.error("Error fetching getMyPosts:", error);
    Alert.alert(
      "Error",
      error.response?.data?.message ||
        "Failed to fetch posts. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};
// getting Categories

// getting user profile screen data
export const getCategories = async (setCategories) => {
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
    console.log("User Data:", userData?.data.data);
    console.log("Success", "User data retrieved successfully!");

    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Error", "Failed to fetch user data. Please try again.");
  }
};
