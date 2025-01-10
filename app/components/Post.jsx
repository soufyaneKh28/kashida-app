import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  Button,
  Modal,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { formatRelativeTime } from "../api/timeUtils";

import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import PostLike from "./PostLike";
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid";
const { width, height } = Dimensions.get("window");
const Post = ({ post, showModal, handleDetailsRequest }) => {
  const windowWidth = Dimensions.get("window").width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [postData, setPin] = useState(post);

  // console.log("====================================");
  // console.log("poooooooooost", post);
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
    <>
      <View>
        <View className="w-full my-4 px-3">
          {/* post head */}
          <View className=" flex-row justify-between items-center w-full">
            <View className=" flex-row items-center">
              <Image
                source={{
                  uri:
                    postData.user.photo[0] &&
                    postData.user.photo[0].includes("/res.cloudinary.com")
                      ? postData.user.photo[0]
                      : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                }}
                style={{ width: 45, height: 45, borderRadius: 50 }}
              />
              <View className="ms-2">
                <Text className=" font-bold">{postData?.user.username}</Text>
                <Text className=" text-secondary text-[12px]">@joe</Text>
              </View>
            </View>
            <Text className="text-secondary font-semibold">
              {formatRelativeTime(postData?.createdAt)}
            </Text>
          </View>

          {/* Post Content */}
          {/* Post Title */}
          <Text className="mt-3 font-bold text-lg leading-6">
            {postData.title}
          </Text>
          {/* Post Description */}
          <Text
            className="mt-2 font-normal text-gray-700  text-base "
            style={{ lineHeight: 19 }}
          >
            {postData?.description}
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

          <View className=" my-3 flex-row items-center justify-between">
            {/* Like */}
            <View className="flex-row ">
              <PostLike
                likeState={post?.hasLiked}
                likesNum={post?.likes}
                postId={post?._id}
              />

              {/* Comment */}

              <Pressable
                className="flex-row ms-[10px] items-center"
                onPress={() => showModal(post._id)}
              >
                <ChatBubbleOvalLeftIcon color={"#00868C"} size={24} />
                <Text className="text-[#00868C] ms-1 text-xl font-semibold">
                  {post?.comments}
                </Text>
              </Pressable>
            </View>
            {/* Send */}
            <View className=" flex-row ms-3  items-center">
              <Pressable onPress={() => handleDetailsRequest(postData)}>
                <EllipsisHorizontalIcon color={"#00868C"} size={30} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8,
    maxHeight: height * 0.7,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
  },
  reportButton: {
    backgroundColor: "#FFA500",
  },
  cancelButton: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
