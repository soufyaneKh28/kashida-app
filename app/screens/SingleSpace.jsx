import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BackArrow from "../components/BackArrow";
import { LinearGradient } from "expo-linear-gradient";

import SpaceJoinBtn from "../components/SpaceJoinBtn";
import Post from "../components/Post";
import { GetSpacePost } from "../api/Spaces";

import CommentsModal from "../components/CommentsModal";
import { useNavigation } from "@react-navigation/native";

const SingleSpace = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigation = useNavigation();
  const { space, joinStatus } = route.params;

  useEffect(() => {
    GetSpacePost(setPosts, setIsLoading, space.name);
    console.log("====================================");
    console.log("space joinStatus");
    console.log(joinStatus);
    console.log("====================================");
  }, [space]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // pull to refresh
  const onRefresh = useCallback(() => {
    setIsLoading(true);
    wait(2000).then(() => setIsLoading(false));
    // getPostData();
    GetSpacePost(setPosts, setIsLoading, space.name);
  }, []);

  function handleCommentRequest(value) {
    setSelectedPost(value);
    setIsModalVisible(true);
  }
  const renderHeader = () => (
    <View>
      <LinearGradient
        colors={["#04747A", "#0E1922"]}
        locations={[0.1, 1]} // Matching 52.76% and 178.75%
        start={{ x: 0.755, y: 0.3 }}
        end={{ x: 0, y: 1.9 }} // Creates 37-degree angle (tan(37°) ≈ 0.755)
        style={styles.gradient}
      >
        <View className=" flex-row justify-between items-center ">
          <View>
            <Image
              source={require("../../assets/images/diwani.png")}
              width={145}
              height={62}
            />
            <Text className=" text-white">{space.name}</Text>
          </View>
          <SpaceJoinBtn
            spaceName={space.name}
            JoinStatus={joinStatus}
            navigation={navigation}
          />
        </View>
      </LinearGradient>
      <BackArrow navigation={navigation} />
    </View>
  );

  return (
    <SafeAreaView className=" flex-1 bg-white">
      {/* FlatList for Posts */}
      <FlatList
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        data={posts}
        renderItem={(item) => (
          <Post post={item.item} showModal={handleCommentRequest} />
        )}
        contentContainerStyle={{
          width: "100%",
          gap: 10,
          backgroundColor: "white",
        }}
      />
      {/* Comments Modal */}
      {isModalVisible && (
        <CommentsModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          selectedPost={selectedPost}
        />
      )}
    </SafeAreaView>
  );
};

export default SingleSpace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gradient: {
    height: 240,
    padding: 10,
    paddingBottom: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: "flex-end",
  },
  contentContainer: {
    height: "90%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F3FAFF",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  commentsList: {
    padding: 10,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  username: {
    fontWeight: "bold",
    marginRight: 10,
  },
  time: {
    color: "#888",
    fontSize: 12,
  },
  commentText: {
    marginBottom: 5,
  },
  commentActions: {
    flexDirection: "row",
    marginTop: 5,
  },
  actionButton: {
    color: "#888",
    marginRight: 15,
  },
  likeButton: {
    padding: 5,
  },
  repliesContainer: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendBtn: {
    backgroundColor: "#00868C",
    padding: 8,
    marginStart: 10,
    borderRadius: 50,
  },
});
