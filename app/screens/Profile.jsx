import { View, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("jwtToken"); // Clear the token from SecureStore
    router.replace("navigation/AuthStack");
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button title="log out" onPress={handleLogout} />
    </View>
  );
};

export default Profile;
