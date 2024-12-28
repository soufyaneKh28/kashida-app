import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import tw from "twrnc";

import {
  EnvelopeIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import UserSearch from "./UserSearch";

const colorBlocks = [
  { id: "1", color: "bg-red-500", height: 100 },
  { id: "2", color: "bg-blue-500", height: 350 },
  { id: "3", color: "bg-green-500", height: 150 },
  { id: "4", color: "bg-yellow-500", height: 180 },
  { id: "5", color: "bg-purple-500", height: 130 },
  { id: "6", color: "bg-pink-500", height: 160 },
  { id: "7", color: "bg-indigo-500", height: 140 },
  { id: "8", color: "bg-teal-500", height: 110 },
  { id: "9", color: "bg-orange-500", height: 170 },
  { id: "10", color: "bg-cyan-500", height: 190 },
];

const SearchByPost = () => {
  const [search, setSearch] = useState("");

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`relative m-1 rounded-lg overflow-hidden`}
      onPress={() => console.log(`Pressed block ${item.id}`)}
    >
      <View className={`${item.color}`} style={{ height: item.height }}>
        <Text style={tw`text-white font-bold text-center mt-2`}>
          Block {item.id}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1  p-4" style={tw``}>
      <MasonryList
        data={colorBlocks}
        renderItem={renderItem}
        numColumns={2}
        containerStyle={tw`-mx-2`}
        columnStyle={tw`px-2`}
      />
    </View>
  );
};

export default SearchByPost;
