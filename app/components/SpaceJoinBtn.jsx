import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CheckBadgeIcon, PlusIcon } from "react-native-heroicons/solid";

const SpaceJoinBtn = ({ JoinStatus }) => {
  const [join, setJoin] = useState(false);
  return join ? (
    <TouchableOpacity
      style={{ flexDirection: "row", justifyContent: "center" }}
      onPress={() => setJoin(false)}
      className=" w-[150px] border border-white h-[50px] flex-row  rounded-full items-center justify-center"
    >
      <CheckBadgeIcon color="white" />
      <Text className=" text-center text-lg ms-3 text-white">Joined</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={{ flexDirection: "row", justifyContent: "center" }}
      onPress={() => setJoin(true)}
      className=" w-[150px] bg-[#00868C] shadow-xl h-[50px] flex-row  rounded-full items-center justify-center"
    >
      <PlusIcon color="white" />
      <Text className=" text-center text-lg ms-3 font-semibold text-white">
        Join
      </Text>
    </TouchableOpacity>
  );
};

export default SpaceJoinBtn;
