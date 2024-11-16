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
} from "react-native";
import React, { useState } from "react";
// import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  LockClosedIcon,
  EnvelopeIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <SafeAreaView className="bg-white h-full  px-3">
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
            color="#39854B"
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
            color="#39854B"
            style={{ position: "absolute", zIndex: 3, top: 12, left: 12 }}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Your Password"
            autoCapitalize="none"
            className=" bg-[#EFF0F2]  w-full  rounded-[16px] ps-[45px] p-3"
            value={password}
            onChangeText={(text) => setPassword(text)}
            keyboardType="default"
            // This hides the password text
          />
        </View>
        <View className=" mt-3">
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <CustomButton text={"Sign in"} onPress={""} />
            </>
          )}
        </View>
        <View className="flex flex-row items-center justify-center mt-5 ">
          <View className="w-full ms-3 bg-[#ECEEF2] h-[2px]" />
          <Text className="mx-4">OR</Text>
          <View className="w-[100%] bg-[#ECEEF2] h-[2px]" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
