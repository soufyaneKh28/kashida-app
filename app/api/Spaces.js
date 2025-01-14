// const API_URL = "http://10.0.2.2:7000";
import { API_URL } from "@env";
import axios from "axios";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export const GetSpaces = async (setCategories, setIsLoading) => {
  try {
    // Retrieve the JWT token from SecureStore
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${API_URL}/api/k1/category`, {
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
    return userData;
    // console.log("Categories:", userData?.data.data);
    console.log("Success", "GetSpaces retrieved successfully!");
    // setIsLoading(false);
    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching GetSpaces:", error);
    alert("Error", "Failed to fetch GetSpaces. Please try again.");
  }
};

export const GetSpacePost = async (setPosts, setIsLoading, title) => {
  // try {
  //   setIsLoading(true);

  //   // Retrieve the JWT token from SecureStore
  //   const token = await SecureStore.getItemAsync("jwtToken");
  //   const space = await title;

  //   if (!token) {
  //     Alert.alert("Error", "No token found. Please log in again.");
  //     setIsLoading(false); // Set loading to false before returning
  //     return;
  //   }

  //   // Make the GET request using axios
  //   const response = await axios.get(`${API_URL}/api/k1/posts`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`, // Add the token to the Authorization header
  //       "Cache-Control": "no-cache", // Disable caching
  //     },
  //     params: {
  //       categories: title, // Send space as query parameter
  //     },
  //   });

  //   // Check if the response is valid
  //   console.log("GetSpacePost===========:", response.data.data.posts);
  //   setPosts(response.data.posts?.reverse());
  //   console.log("Success", "GetSpacePost retrieved successfully!");
  //   setIsLoading(false); // Set loading to false once done
  //   return response;
  // } catch (error) {
  //   console.error("Error fetching GetSpacePost from:", error);
  //   setIsLoading(false); // Set loading to false in case of error
  //   Alert.alert("Error", "Failed to fetch GetSpacePost  Please try again.");
  // }
  try {
    // Retrieve the JWT token from SecureStore
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(
      `${API_URL}/api/k1/posts?categories=${title}`,
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
    console.log("GetSpacePost===========:", userData.data.posts);
    setPosts(userData.data.posts.reverse());
    console.log("Success", "GetSpacePost retrieved successfully!");
    setIsLoading(false); // Set loading to false once done
    return response;
    // console.log("Categories:", userData?.data.data);
    console.log("Success", "GetSpaces retrieved successfully!");
    // setIsLoading(false);
    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching GetSpaces:", error);
    alert("Error", "Failed to fetch GetSpaces. Please try again.");
  }
};

export const joinSpace = async (space) => {
  const url = `${API_URL}/api/k1/users/joinSpace`; // Replace BASE_URL with your actual base URL
  const token = await SecureStore.getItemAsync("jwtToken");
  try {
    const response = await axios.post(
      url,
      { categoryName: space },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );

    console.log("Success:", response.data);
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error(
        "Server Error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No Response:", error.request);
    } else {
      // Something else caused the error
      console.error("Error:", error.message);
    }
  }
};
// export const UnjoinSpace = async (space) => {
//   const url = `${API_URL}/api/k1/users/unjoinSpace`; // Replace BASE_URL with your actual base URL
//   const token = await SecureStore.getItemAsync("jwtToken");
//   try {
//     const response = await axios.delete(
//       url,
//       { categoryName: space },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//         },
//       }
//     );

//     console.log("Success:", response.data);
//   } catch (error) {
//     if (error.response) {
//       // Server responded with a status code outside the 2xx range
//       console.error(
//         "Server Error:",
//         error.response.status,
//         error.response.data
//       );
//     } else if (error.request) {
//       // Request was made but no response was received
//       console.error("No Response:", error.request);
//     } else {
//       // Something else caused the error
//       console.error("Error:", error.message);
//     }
//   }
// };

export const UnjoinSpace = async (space) => {
  try {
    // Retrieve the JWT token from SecureStore

    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${API_URL}/api/k1/users/unjoinSpace`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
      body: JSON.stringify({ categoryName: space }), // Convert JavaScript object to JSON string
    });

    // Check if the response is OK
    if (!response.ok) {
      // setIsLoading(true);
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch user data.");
    }

    // Parse the JSON response
    const userData = await response.json();

    console.log("Categories:", userData?.data);
    console.log("Success", "User data retrieved successfully!");

    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Error", "Failed to fetch user data. Please try again.");
  }
};
