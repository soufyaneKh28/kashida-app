import {
  View,
  Text,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getUserComments } from "../api/Comments";
import { baseurl } from "../api/user";
import axios from "axios";

import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { getMe } from "../api/me";
import BackArrow from "./BackArrow";
import { ChevronLeftIcon } from "react-native-heroicons/solid";

const CommentsModal = ({
  selectedPost,
  isModalVisible,
  setIsModalVisible,
  navigation,
}) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [me, setMe] = useState();
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  useEffect(() => {
    getMe(setMe, setIsLoading);
    getUserComments(setComments, setIsLoading, selectedPost);
    console.log("====================================");
    console.log("user info", me);

    console.log("====================================");
  }, [selectedPost, isModalVisible]);
  const renderComment = ({ item }) => (
    <Comment comment={item} userId={me._id} onReply={handleReply} />
  );

  function CloseModal() {
    setIsModalVisible(false);
    // setComments([]);
  }

  //   {
  //     "_id": "677cf4f478922096f37152f4",
  //     "photo": [],
  //     "comment": "this is a comment",
  //     "user": {
  //         "_id": "6733cc60cd36dbdde4faf94e",
  //         "username": "admin",
  //         "photo": [
  //             "https://res.cloudinary.com/deqhvrlww/image/upload/v1736243832/l2rjkrxpsjrj5uly5ao6.jpg"
  //         ]
  //     },
  //     "post": "677ab8402b7ba85eccb63a2b",
  //     "updatedAt": "2025-01-07T08:58:46.593Z",
  //     "likes": 0,
  //     "reply": 0,
  //     "createdAt": "2025-01-07T09:33:40.123Z",
  //     "__v": 0,
  //     "hasLiked": false
  // },

  const handleReply = (comment) => {
    setReplyingTo(comment);
    // console.log("replying to", replyingTo);
    setNewComment(`@${comment.user.username} `);
  };

  function handleSubmit() {
    if (replyingTo) {
      handleSubmitReply();
    } else {
      handleSubmitComment();
    }
  }

  const handleSubmitComment = async () => {
    // Create form data

    if (newComment.length === 0)
      return Alert.alert("there is no comment to add please write something");
    const formData = new FormData();
    formData.append("comment", newComment);

    try {
      const token = await SecureStore.getItemAsync("jwtToken");
      const response = await axios.post(
        `${baseurl}/api/k1/posts/${selectedPost}/comments/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );

      console.log("Response:", response.data);
      Alert.alert("Success", "Comment submitted successfully");
      // setComments([
      //   ...comments,
      //   {
      //     _id: "2",
      //     photo: [],
      //     comment: newComment,
      //     user: {
      //       _id: "6733cc60cd36dbdde4faf94e",
      //       username: "admin",
      //       photo: [me.photo[0]],
      //     },
      //     post: "677ab8402b7ba85eccb63a2b",

      //     likes: 0,
      //     reply: 0,
      //     createdAt: 0,
      //     __v: 0,
      //     hasLiked: false,
      //   },
      // ]);
      setNewComment(""); // Clear the input after successful submission
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to submit comment");
    }
  };

  const handleSubmitReply = async () => {
    // Validate input
    if (newComment.length === 0)
      return Alert.alert("There is no comment to add. Please write something");

    try {
      const token = await SecureStore.getItemAsync("jwtToken");

      const response = await axios.post(
        `${baseurl}/api/k1/comments/${replyingTo._id}/replies/`,
        { reply: newComment }, // Send raw JSON data in the request body
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type to JSON
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );

      console.log("Response:", response.data);
      Alert.alert("Success", "Comment submitted successfully");

      // Optional: Update comments (uncomment and adjust as needed)
      // setComments([
      //   ...comments,
      //   {
      //     _id: "2",
      //     photo: [],
      //     comment: newComment,
      //     user: {
      //       _id: "6733cc60cd36dbdde4faf94e",
      //       username: "admin",
      //       photo: [
      //         "https://res.cloudinary.com/deqhvrlww/image/upload/v1736243832/l2rjkrxpsjrj5uly5ao6.jpg",
      //       ],
      //     },
      //     post: "677ab8402b7ba85eccb63a2b",
      //     likes: 0,
      //     reply: 0,
      //     createdAt: "just now",
      //     __v: 0,
      //     hasLiked: false,
      //   },
      // ]);

      setReplyingTo(null);
      setNewComment(""); // Clear the input after successful submission
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to submit comment");
    }
  };
  console.log(newComment);
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        transparent={true}
        onRequestClose={CloseModal}
        visible={isModalVisible}
        style={{
          backgroundColor: "rgba(11, 11, 11, 0.51)",
        }}
      >
        <View style={{ backgroundColor: "rgba(11, 11, 11, 0.51)", flex: 1 }}>
          <SafeAreaView
            style={[
              styles.contentContainer,
              {
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginTop: "auto", // This pushes the content to the bottom
                maxHeight: "90%", // Don't take full height
              },
            ]}
          >
            {/* Visual indicator for swipe */}
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: "#ccc",
                borderRadius: 2,
                alignSelf: "center",
                marginVertical: 10,
              }}
            />
            <View style={{}}>
              <View style={{ position: "absolute", zIndex: 100, top: 5 }}>
                <TouchableOpacity style={{ padding: 5 }} onPress={CloseModal}>
                  <ChevronLeftIcon size={30} color={"black"} />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Comments</Text>
            </View>
            {/* <Text className="bg-red-200 w-full text-black">{selectedPost}</Text> */}

            {isLoading ? (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size={"large"} />
              </View>
            ) : comments && comments.length > 0 ? (
              <FlatList
                data={comments}
                renderItem={renderComment}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.commentsList}
              />
            ) : (
              <View style={styles.noCommentsContainer}>
                <Text style={styles.noCommentText}>There is no Comments</Text>
              </View>
            )}

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
              style={styles.inputContainer}
            >
              <Image
                source={{
                  uri:
                    me?.photo[0] ||
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                }}
                style={styles.inputAvatar}
              />
              <TextInput
                style={styles.input}
                value={newComment}
                onChangeText={setNewComment}
                placeholder={
                  replyingTo ? "Write a reply..." : "Add a comment..."
                }
                multiline
              />
              <TouchableOpacity style={styles.sendBtn} onPress={handleSubmit}>
                <FontAwesome name="send" size={20} color="#F3FAFF" />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CommentsModal;

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
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: "auto", // This makes it stick to the bottom
    maxHeight: "90%", // Don't take full height
    paddingHorizontal: 16,
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

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    // paddingBottom: 100,
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
  noCommentsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCommentText: {
    textAlign: "center",
    fontWeight: "800",
  },
});
