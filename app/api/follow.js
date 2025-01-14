// import { API_URL } from "./user";
import { API_URL } from "@env";
// getting User followers
export const getMyFollowing = async ({ setUserFollow, setIsLoading }) => {
  try {
    // Retrieve the JWT token from SecureStore
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("jwtToken");
    if (!token) {
      Alert.alert("Error", "No token found. Please log in again.");
      return;
    }

    // Make the GET request
    const response = await fetch(`${API_URL}/api/k1/follow/myFollowings`, {
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
    console.log("User Data:", userData?.data.followingsWithStatus);
    console.log("Success", "User data retrieved successfully!");
    setIsLoading(false);
    // Handle the user data (e.g., update state or UI)
  } catch (error) {
    console.error("Error fetching user data:", error);
    Alert("Error", "Failed to fetch user data. Please try again.");
  }
};
