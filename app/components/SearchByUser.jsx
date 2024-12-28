import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  EnvelopeIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import UserSearch from "./UserSearch";

const SearchByUser = () => {
  const [search, setSearch] = useState("");
  return (
    <View className="bg-white flex-1 px-3">
      <View className="mt-10 relative">
        <MagnifyingGlassIcon
          color="#0E1922"
          style={{ position: "absolute", zIndex: 3, top: 14, left: 12 }}
        />
        <TextInput
          placeholder="Search"
          className=" bg-[#EFF0F2]  w-full  rounded-[16px] ps-[45px] p-[16px]"
          value={search}
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={(text) => setSearch(text)}
          keyboardType="email-address"
        />
      </View>
      <ScrollView>
        <UserSearch />
      </ScrollView>
    </View>
  );
};

export default SearchByUser;
