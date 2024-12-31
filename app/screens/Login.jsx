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
  StatusBar,
} from "react-native";
import React, { useState } from "react";
// import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  LockClosedIcon,
  EnvelopeIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  EyeSlashIcon,
  EyeIcon,
} from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native";
import { router, useRouter } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import OutlineButton from "../components/OutlineButton";
import { ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";

const Login = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  // const auth = FIREBASE_AUTH;

  // const signIn = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await signInWithEmailAndPassword(auth, email, password);
  //     console.log(response);
  //     // alert("check your email");
  //   } catch (eror) {
  //     console.log(eror);
  //     alert("Sign in failed: " + eror.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const signUp = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     console.log(response);
  //     alert("check your email");
  //   } catch (eror) {
  //     console.log(eror);
  //     alert("Sign in failed: " + eror.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async () => {
    if (email === "" || password === "" || !email.includes("@"))
      return alert("please add valid email and password");
    try {
      const response = await fetch("http://10.0.2.2:7000/api/k1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        // If not OK, throw an error with response details
        const responseBody = await response.json(); // Read response body once

        throw new Error(
          `Error: ${response.status} - ${
            responseBody.message || "Failed to log in"
          }`
        );
      }

      // Only read response body once
      const responseBody = await response.json();

      if (responseBody.token) {
        // console.log(responseBody.user.id);
        console.log("response", responseBody);
        console.log("Token:", responseBody.token);
        // Store JWT token securely using SecureStore
        await SecureStore.setItemAsync("jwtToken", responseBody.token);
        alert("Login successful!");
        // Optionally navigate to home or another screen
        router.replace("navigation/BottomTabs");
        const token = await SecureStore.getItemAsync("jwtToken");
        console.log("token from secure Store", token);
      } else {
        alert("Token not found in response.");
      }
    } catch (error) {
      // console.error("Error during login:", error);
      alert(`Failed to log in, please try again.${error}`);
    }
  };
  console.log("email: ", email);
  console.log("password: ", password);
  return (
    <>
      <StatusBar barStyle={"dark-content"} translucent={true} />
      <ScrollView className=" bg-white">
        <SafeAreaView className="bg-white h-full flex-1 px-3">
          <Image
            source={require("../../assets/images/kashidaMark.png")}
            className=" absolute top-[-200px] left-[-100px]"
          />
          {/* <Image /> */}
          <View className="mt-[250px]">
            <Text className="text-[#3C3A36] font-medium text-[20px] text-center">
              Welcome Artist
            </Text>
            <Text className="text-center text-[#78746D]">
              Enter your Email & Password to Sign in
            </Text>
          </View>
          <KeyboardAvoidingView>
            <View className="mt-10 relative">
              <EnvelopeIcon
                color="#0E1922"
                style={{ position: "absolute", zIndex: 3, top: 12, left: 12 }}
              />
              <TextInput
                placeholder="Your Email"
                className=" bg-[#EFF0F2]  w-full  rounded-[16px] ps-[45px] p-[16px]"
                value={email}
                placeholderTextColor="gray"
                autoCapitalize="none"
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
                placeholderTextColor="gray"
                autoCapitalize="none"
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
            <View
              className="my-6 flex-row mt-2 "
              style={{ justifyContent: "flex-end" }}
            >
              <TouchableOpacity
                className=" py-3"
                onPress={() => console.log("forget password")}
              >
                <Text className="font-bold">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View className=" mt-5">
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <>
                  <CustomButton onPress={handleLogin}>Sign in</CustomButton>
                </>
              )}
            </View>
            <View className="flex flex-row items-center justify-center mt-5 ">
              <View className="w-full ms-3 bg-[#ECEEF2] h-[2px]" />
              <Text className="mx-4">OR</Text>
              <View className="w-[100%] bg-[#ECEEF2] h-[2px]" />
            </View>
            <View className="mt-5">
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
            </View>
            <View className="flex-row justify-center mt-8">
              <Text className="text-[#565656] text-[14px] font-medium">
                Don't Have an Account?
              </Text>
              <TouchableOpacity onPress={() => navigation.push("SignUp")}>
                <Text className="text-[#0E1922] font-black ms-1">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default Login;
