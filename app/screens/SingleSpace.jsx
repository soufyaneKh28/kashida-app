import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Button,
  Modal,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BackArrow from "../components/BackArrow";
import { LinearGradient } from "expo-linear-gradient";
import { CheckBadgeIcon } from "react-native-heroicons/solid";
import SpaceJoinBtn from "../components/SpaceJoinBtn";
import Post from "../components/Post";
import { GetSpacePost } from "../api/Spaces";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";

import Comment from "../components/Comment";
const comments = [
  {
    id: "1",
    username: "user1",
    avatar: "https://via.placeholder.com/40",
    time: "2h",
    text: "This is a comment",
    replies: [
      {
        id: "1-1",
        username: "user2",
        avatar: "https://via.placeholder.com/40",
        time: "1h",
        text: "This is a reply",
      },
    ],
  },
  {
    id: "2",
    username: "user3",
    avatar: "https://via.placeholder.com/40",
    time: "1h",
    text: "Another comment",
    replies: [],
  },
  {
    id: "3",
    username: "user1",
    avatar: "https://via.placeholder.com/40",
    time: "2h",
    text: "This is a comment",
    replies: [
      {
        id: "1-1",
        username: "user2",
        avatar: "https://via.placeholder.com/40",
        time: "1h",
        text: "This is a reply",
      },
    ],
  },
  {
    id: "4",
    username: "user3",
    avatar: "https://via.placeholder.com/40",
    time: "1h",
    text: "Another comment",
    replies: [],
  },
  {
    id: "5",
    username: "user1",
    avatar: "https://via.placeholder.com/40",
    time: "2h",
    text: "This is a comment",
    replies: [
      {
        id: "1-1",
        username: "user2",
        avatar: "https://via.placeholder.com/40",
        time: "1h",
        text: "This is a reply",
      },
    ],
  },
  {
    id: "6",
    username: "user3",
    avatar: "https://via.placeholder.com/40",
    time: "1h",
    text: "Another comment",
    replies: [],
  },
];

const SingleSpace = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const { space } = route.params;

  useEffect(() => {
    GetSpacePost(setPosts, setIsLoading, space.name);
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

  // rendering Comments inside the FlatList
  const renderComment = ({ item }) => <Comment comment={item} />;
  // Render heeader ontop of the Flat List
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
          <SpaceJoinBtn />
        </View>
      </LinearGradient>
      <BackArrow navigation={navigation} />
    </View>
  );

  function CommentsModal() {
    return (
      <View className=" ">
        <Modal
          animationType="slide"
          backdropColor="black"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
          visible={isModalVisible}
          style={{}}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(11, 11, 11, 0.51)" }}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Comments</Text>
              <FlatList
                data={comments}
                renderItem={renderComment}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.commentsList}
              />
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
                style={styles.inputContainer}
              >
                <Image
                  source={{ uri: "https://via.placeholder.com/32" }}
                  style={styles.inputAvatar}
                />
                <TextInput
                  placeholder="Add a comment..."
                  style={styles.input}
                  multiline
                />
                <TouchableOpacity style={styles.sendBtn}>
                  <FontAwesome name="send" size={20} color="#F3FAFF" />
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

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
          <Post post={item.item} showModal={setIsModalVisible} />
        )}
        contentContainerStyle={{
          gap: 10,
          backgroundColor: "white",
        }}
      />
      {/* Comments Modal */}
      <CommentsModal />
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
