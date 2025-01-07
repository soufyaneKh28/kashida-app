import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  Button,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import moment from "moment";

import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import PostLike from "./PostLike";
const windowWidth = Dimensions.get("window").width;
const Post = ({ post, showModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [postData, setPin] = useState(post);

  // console.log("====================================");
  // console.log(post);
  // console.log("====================================");
  const renderItem =
    ({ rounded }) =>
    ({ item }) =>
      (
        <Image
          source={{
            uri: item,
          }}
          resizeMode="cover"
          indicator={<ActivityIndicator size={"large"} />}
          style={{ width: "100%", height: "100%" }}
          className="   shadow-2xl object-fill"
        />
      );

  return (
    <View>
      <View className="w-full my-4 px-3">
        {/* post head */}
        <View className=" flex-row justify-between items-center w-full">
          <View className=" flex-row items-center">
            <Image
              source={require("../../assets/images/profile-placeholder.jpg")}
              style={{ width: 45, height: 45 }}
            />
            <View>
              <Text className=" font-bold">{post?.user.username}</Text>
              <Text className=" text-secondary text-[12px]">@joe</Text>
            </View>
          </View>
          <Text className="text-secondary font-semibold">
            {moment(post?.createdAt).fromNow()}
          </Text>
        </View>

        {/* Post Content */}
        {/* Post Title */}
        <Text className="mt-3 font-bold text-lg leading-6">{post.title}</Text>
        {/* Post Description */}
        <Text
          className="mt-2 font-normal text-gray-700  text-base "
          style={{ lineHeight: 19 }}
        >
          {post?.description}
        </Text>

        {/* Images */}
        {postData.photos && postData.photos.length > 0 ? (
          <Carousel
            loop={false}
            width={windowWidth}
            height={350}
            snapEnabled={true}
            pagingEnabled={true}
            autoPlayInterval={1000}
            data={postData.photos}
            style={{
              width: "100%",
              borderRadius: 10,
              marginTop: 10,
            }}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={renderItem({
              rounded: true,
              style: { marginRight: 8 },
            })}
          />
        ) : null}

        {/* Actions */}
        <View className=" my-3 flex-row items-center">
          {/* Like */}

          <PostLike
            likeState={post?.hasLiked}
            likesNum={post?.likes}
            postId={post?._id}
          />

          {/* Comment */}

          <Pressable
            className="flex-row ms-[10px] items-center"
            onPress={() => showModal(true)}
          >
            <ChatBubbleOvalLeftIcon color={"#00868C"} size={24} />
            <Text className="text-[#00868C] ms-1 text-xl font-semibold">
              {post?.comments}
            </Text>
          </Pressable>

          {/* Send */}
          <View className=" flex-row ms-3  items-center">
            <Pressable>
              <PaperAirplaneIcon color={"#00868C"} size={24} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Post;
