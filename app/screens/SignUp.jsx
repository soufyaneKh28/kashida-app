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

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <View className="bg-white h-full  px-3">
      <Image
        source={require("../../assets/images/kashidaMark.png")}
        className=" absolute top-[-200px] left-[-100px]"
      />
      {/* <Image /> */}
      <View className="mt-[250px]">
        <Text className="text-[#3C3A36] font-medium text-[20px] text-center">
          SIgnUPPP
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
        <View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <TouchableOpacity
                className="bg-[#39854B] items-center p-4 rounded-[10px] mt-4 "
                onPress={() => navigation.replace("OnBoarding")}
              >
                <Text className="text-white">Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#39854B] items-center p-4 rounded-[10px] mt-4 "
                onPress={""}
              >
                <Text className="text-white">Create account</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;
