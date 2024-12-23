import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const FollowBtn = ({ followState = false }) => {
  const [isClicked, setisClicked] = useState(followState);
  return isClicked ? (
    <TouchableOpacity
      onPress={() => setisClicked(false)}
      className="bg-secondary w-[120px] h-[41px] gap-3 items-center flex-row justify-center rounded-[5px]"
    >
      <Text className="text-white font-semibold text-lg">Follow</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => setisClicked(true)}
      className="bg-white border-secondary border w-[120px] h-[41px] gap-3 items-center flex-row justify-center rounded-[5px]"
    >
      <Text className=" text-secondary font-semibold text-lg">Unfollow</Text>
    </TouchableOpacity>
  );
};

export default FollowBtn;
