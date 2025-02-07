import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
import { HeartIcon as HeartFill } from "react-native-heroicons/solid";
import { likePost, unLikePost } from "../api/post";

const PostLike = ({ likeState = false, likesNum = 0, postId }) => {
  const [isLiked, setIsLiked] = useState(likeState);
  const [likeNum, setlikeNum] = useState(likesNum);

  function handleLike() {
    if (!isLiked) {
      likePost(postId);
      setIsLiked(true);
      setlikeNum(likeNum + 1);
      console.log("pressed true");
    } else {
      unLikePost(postId);
      setIsLiked(false);
      setlikeNum(likeNum - 1);
      console.log("pressed fslde");
    }
  }
  return (
    <Pressable className="flex-row  items-center" onPress={handleLike}>
      {isLiked ? (
        <HeartFill color={"#00868C"} size={24} />
      ) : (
        <HeartOutline color={"#00868C"} size={24} />
      )}

      <Text className="text-[#00868C] ms-1 text-xl font-semibold">
        {likeNum}
      </Text>
    </Pressable>
  );
};

export default PostLike;
