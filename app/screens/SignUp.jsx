import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  ActivityIndicatorBase,
  Button,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
// import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  LockClosedIcon,
  EnvelopeIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  EyeSlashIcon,
  UserCircleIcon,
  UserIcon,
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native";
import { router, useRouter } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";
import OutlineButton from "../components/OutlineButton";
import CustomButton from "../components/CustomButton";
import { ScrollView } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store"; // Import expo-secure-store
const SignUp = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("http://10.0.2.2:7000/api/k1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          passwordConfirm,
        }),
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        // If not OK, throw an error with response details
        const responseBody = await response.json(); // Read response body once
        throw new Error(
          `Error: ${response.status} - ${
            responseBody.message || "Failed to sign up"
          }`
        );
      }

      // Only read response body once
      const responseBody = await response.json();
      if (responseBody.token) {
        console.log("Token:", responseBody.token);
        // Store JWT token securely using SecureStore
        await SecureStore.setItemAsync("jwtToken", responseBody.token);
        alert("User successfully signed up!");
        router.replace("navigation/BottomTabs");
      } else {
        alert("Token not found in response.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Failed to sign up, please try again.");
    }
  };
  console.log("username:", username);
  console.log("email:", email);
  console.log("password:", password);
  console.log("Confirm:", passwordConfirm);
  return (
    <ScrollView className=" bg-white">
      <SafeAreaView className="bg-white h-full   relative">
        <Image
          source={require("../../assets/images/kashidaMark.png")}
          className=" absolute top-[-200px] left-[-100px]"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white w-[41px] h-[41px] items-center justify-center rounded-[16px] mt-[20px] ms-[10px] shadow-2xl absolute "
        >
          <ArrowLeftIcon color={"black"} />
        </TouchableOpacity>
        {/* <Image /> */}
        <View className="px-3">
          <View className="mt-[250px]">
            <Text className="text-[#3C3A36] font-medium text-[20px] text-center">
              Welcome Artist
            </Text>
            <Text className="text-center text-[#78746D]">
              Sign up and enjoy our community
            </Text>
          </View>
          <KeyboardAvoidingView>
            {/* Start of input fields */}
            <View className="mt-10 relative">
              <UserIcon
                color="#0E1922"
                style={{ position: "absolute", zIndex: 3, top: 12, left: 12 }}
              />
              <TextInput
                placeholder="Username"
                className=" bg-[#EFF0F2]  w-full  rounded-[16px] ps-[45px] p-[16px]"
                value={username}
                autoCapitalize="none"
                placeholderTextColor="gray"
                onChangeText={(text) => setUsername(text)}
                keyboardType="default"
              />
            </View>
            <View className="mt-3 relative">
              <EnvelopeIcon
                color="#0E1922"
                style={{ position: "absolute", zIndex: 3, top: 12, left: 12 }}
              />
              <TextInput
                placeholder="Your Email"
                className=" bg-[#EFF0F2]  w-full  rounded-[16px] ps-[45px] p-[16px]"
                value={email}
                autoCapitalize="none"
                placeholderTextColor="gray"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
              />
            </View>

            <View className="mt-3 relative">
              <LockClosedIcon
                color="#0E1922"
                style={{ position: "absolute", zIndex: 3, top: 12, left: 12 }}
              />
              <TextInput
                secureTextEntry={!isPasswordVisible}
                placeholder="Your Password"
                autoCapitalize="none"
                placeholderTextColor="gray"
                className=" bg-[#EFF0F2]  w-full  rounded-[16px] ps-[45px] p-[16px]"
                value={password}
                onChangeText={(text) => setPassword(text)}
                keyboardType="default"
                // This hides the password text
              />

              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{ position: "absolute", zIndex: 3, top: 12, right: 12 }}
              >
                {isPasswordVisible ? (
                  <EyeIcon size={24} color="#888" />
                ) : (
                  <EyeSlashIcon size={24} color="#888" />
                )}
              </TouchableOpacity>
            </View>
            <View className="mt-3 relative">
              <LockClosedIcon
                color="#0E1922"
                style={{ position: "absolute", zIndex: 3, top: 12, left: 12 }}
              />
              <TextInput
                secureTextEntry={!isPasswordVisible}
                placeholder="Confirm Password"
                autoCapitalize="none"
                placeholderTextColor="gray"
                className=" bg-[#EFF0F2]  w-full  rounded-[16px] ps-[45px] p-[16px]"
                value={passwordConfirm}
                onChangeText={(text) => setPasswordConfirm(text)}
                keyboardType="default"
                // This hides the password text
              />

              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{ position: "absolute", zIndex: 3, top: 12, right: 12 }}
              >
                {isPasswordVisible ? (
                  <EyeIcon size={24} color="#888" />
                ) : (
                  <EyeSlashIcon size={24} color="#888" />
                )}
              </TouchableOpacity>
            </View>

            {/* end of input fields */}
            {/* terms and condition start */}
            <Text className="text-center text-[#78746D] px-3 leading-6 mt-3">
              By continuing you agree to our{" "}
              <Text className="text-[#0E1922] font-bold">Terms of Service</Text>{" "}
              and
              <Text className="text-[#0E1922] font-bold"> Privacy Policy</Text>
            </Text>
            <View className=" mt-3">
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <>
                  <CustomButton onPress={handleSignup}>
                    Create Account
                  </CustomButton>
                </>
              )}
            </View>
            {/* <View className="flex flex-row items-center justify-center mt-5 ">
          <View className="w-full ms-3 bg-[#ECEEF2] h-[2px]" />
          <Text className="mx-4">OR</Text>
          <View className="w-[100%] bg-[#ECEEF2] h-[2px]" />
          </View> */}
            {/* <View className="mt-5">
          <OutlineButton>
          <Image
          className=" mx-3"
          source={require("../../assets/images/google.png")}
          />
          <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            }}
            className="text-black "
            >
            Sign In With Google
            </Text>
            </OutlineButton>
            </View> */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-[#565656] text-[14px] font-medium">
                Already Have an Account?
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack("")}>
                <Text className="text-[#0E1922] font-black ms-1">Sign In</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
