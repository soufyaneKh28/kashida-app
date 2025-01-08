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

const CommentsModal = ({ selectedPost, isModalVisible, setIsModalVisible }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    getUserComments(setComments, setIsLoading, selectedPost);
    console.log("====================================");
    console.log("Commments", comments);
    console.log("====================================");
  }, [selectedPost, isModalVisible]);
  const renderComment = ({ item }) => <Comment comment={item} />;

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
  const handleSubmit = async () => {
    // Create form data
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
      setComments([
        ...comments,
        {
          _id: "2",
          photo: [],
          comment: newComment,
          user: {
            _id: "6733cc60cd36dbdde4faf94e",
            username: "admin",
            photo: [
              "https://res.cloudinary.com/deqhvrlww/image/upload/v1736243832/l2rjkrxpsjrj5uly5ao6.jpg",
            ],
          },
          post: "677ab8402b7ba85eccb63a2b",

          likes: 0,
          reply: 0,
          createdAt: "just now",
          __v: 0,
          hasLiked: false,
        },
      ]);
      setNewComment(""); // Clear the input after successful submission
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to submit comment");
    }
  };
  console.log(newComment);
  return (
    <View className=" ">
      <Modal
        animationType="slide"
        backdropColor="black"
        transparent={true}
        onRequestClose={CloseModal}
        visible={isModalVisible}
        style={{}}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(11, 11, 11, 0.51)" }}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Comments</Text>
            <Text className="bg-red-200 w-full text-black ">
              {selectedPost}
            </Text>
            {isLoading ? (
              <View className=" flex-1 justify-center items-center">
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
                source={{ uri: "https://via.placeholder.com/32" }}
                style={styles.inputAvatar}
              />
              <TextInput
                placeholder="Add a comment..."
                style={styles.input}
                value={newComment}
                onChangeText={setNewComment}
                multiline
              />
              <TouchableOpacity style={styles.sendBtn} onPress={handleSubmit}>
                <FontAwesome name="send" size={20} color="#F3FAFF" />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </View>
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
