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
import { router } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";
import OutlineButton from "../components/OutlineButton";
import CustomButton from "../components/CustomButton";
import { ScrollView } from "react-native";

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <ScrollView className=" bg-white">
      <SafeAreaView className="bg-white h-full  px-3 relative">
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
              className=" bg-[#EFF0F2]  w-full  rounded-[16px] ps-[45px] p-3"
              value={email}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>
          <View className="mt-3 relative">
            <EnvelopeIcon
              color="#0E1922"
              style={{ position: "absolute", zIndex: 3, top: 12, left: 12 }}
            />
            <TextInput
              placeholder="Your Email"
              className=" bg-[#EFF0F2]  w-full  rounded-[16px] ps-[45px] p-3"
              value={email}
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
              autoCapitalize="none"
              className=" bg-[#EFF0F2]  w-full  rounded-[16px] ps-[45px] p-3"
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
              className=" bg-[#EFF0F2]  w-full  rounded-[16px] ps-[45px] p-3"
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
                <CustomButton onPress={""}>Create Account</CustomButton>
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
