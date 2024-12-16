import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  Cog6ToothIcon,
  PencilIcon,
  ShareIcon,
} from "react-native-heroicons/solid";
const Profile = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("jwtToken"); // Clear the token from SecureStore
    router.replace("navigation/AuthStack");
  };
  return (
    <SafeAreaView className=" bg-white ">
      <ScrollView className="">
        <Image
          source={require("../../assets/images/kashidaOut.png")}
          className=" absolute top-[50px] z-0 left-[-100px]"
        />
        <View className="items-center mt-6">
          <Image
            source={{ uri: "https://picsum.photos/id/22/200" }}
            width={142}
            height={142}
            className="rounded-full"
          />
          <Text className="text-2xl font-bold mt-3 text-dark">
            Youssef Khaled
          </Text>
          {/* username / role */}
          <View className="flex-row my-2 ">
            <Text className=" text-lg text-textSecondary">
              @Abderahman-al3orabi
            </Text>
            <View className="w-[2px] mx-4 bg-secLight"></View>
            <Text className="text-lg text-textSecondary">Co-founder</Text>
          </View>
          {/* bio */}
          <Text className="text-xl max-w-[250px] text-center my-2 text-textSecondary">
            Graphic Designer, Calligrapher and Dreamer
          </Text>
        </View>

        {/* Actions */}
        <View className="flex-row justify-center gap-2">
          {/* edit profile */}
          <TouchableOpacity className="bg-secondary w-[170px] h-[41px] gap-3 items-center flex-row justify-center rounded-[5px]">
            <PencilIcon color="white" size={22} />
            <Text className="text-white text-lg">Edit Profile</Text>
          </TouchableOpacity>

          {/* settings */}
          <TouchableOpacity className=" bg-secLight w-[41px] h-[41px] py-3 gap-3 items-center flex-row justify-center rounded-[5px]">
            <Cog6ToothIcon color="white" />
          </TouchableOpacity>
          {/* Share */}
          <TouchableOpacity className=" bg-secLight w-[41px] h-[41px] py-3 gap-3 items-center flex-row justify-center rounded-[5px]">
            <ShareIcon color="white" />
          </TouchableOpacity>
        </View>

        <View className=" my-5 flex-row justify-center items-center gap-10 px-6">
          {/* posts */}
          <View className=" items-center">
            {/* number */}
            <Text className=" text-2xl text-secLight font-bold">1000</Text>
            {/* text */}
            <Text className="text-base  text-textSecondary ">Posts</Text>
          </View>

          {/* separator */}
          <View className="w-[1px] h-[29px] bg-slate-300" />

          {/* Followers */}
          <View className=" items-center">
            {/* number */}
            <Text className=" text-2xl text-secLight font-bold">500k</Text>
            {/* text */}
            <Text className="text-base  text-textSecondary ">Followers</Text>
          </View>

          {/* separator */}
          <View className="w-[1px] h-[29px] bg-slate-300" />

          {/* Following */}
          <View className=" items-center">
            {/* number */}
            <Text className=" text-2xl text-secLight font-bold">1</Text>
            {/* text */}
            <Text className="text-base  text-textSecondary ">Following</Text>
          </View>
        </View>
        <Button title="log out" onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
