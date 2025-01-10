import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  RefreshControl,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BackArrow from "../components/BackArrow";
import { LinearGradient } from "expo-linear-gradient";

import SpaceJoinBtn from "../components/SpaceJoinBtn";
import Post from "../components/Post";
import { GetSpacePost } from "../api/Spaces";

import CommentsModal from "../components/CommentsModal";
import { useNavigation } from "@react-navigation/native";
import { getMe } from "../api/me";
import { deletePost } from "../api/post";
const { width, height } = Dimensions.get("window");
const SingleSpace = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const [me, setMe] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { space, joinStatus } = route.params;

  useEffect(() => {
    async function data() {
      GetSpacePost(setPosts, setIsLoading, space.name);
      const myData = await getMe(setMe, setIsLoading);
      console.log("====================================");
      console.log("meeeeeeeeeeeeeeee");
      // console.log(myData.data.data);
      setMe(myData.data.data);
      console.log("====================================");
    }
    data();
  }, [space]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // pull to refresh
  const onRefresh = useCallback(() => {
    setIsLoading(true);
    getMe(setMe, setIsLoading);
    wait(2000).then(() => setIsLoading(false));
    // getPostData();
    GetSpacePost(setPosts, setIsLoading, space.name);
  }, []);

  function handleCommentRequest(value) {
    setSelectedPost(value);
    setIsModalVisible(true);
  }

  function handleDetailsRequest(value) {
    setSelectedPost(value);
    console.log("====================================");
    console.log("presseds");
    console.log("====================================");
    setModalVisible(true);
  }
  const handleDelete = (selectedPost) => {
    console.log("====================================");
    console.log("slected post", selectedPost._id);
    console.log("====================================");
    deletePost(selectedPost._id);
    setModalVisible(false);
    setSelectedPost(null);
  };

  const handleReport = () => {
    onReport(comment._id);
    setModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

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
              source={{ uri: space.logo[0] }}
              resizeMode="contain"
              width={145}
              height={65}
            />
            <Text className=" text-white text-center font-bold">
              {space.name}
            </Text>
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
          <Post
            post={item.item}
            userId={me._id}
            handleDetailsRequest={handleDetailsRequest}
            showModal={handleCommentRequest}
          />
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
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          style={{ justifyContent: "center" }}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(11, 11, 11, 0.51)",
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Post Options</Text>
                {selectedPost?.user?._id === me?._id && (
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDelete(selectedPost)}
                  >
                    <Text style={styles.textStyle}>Delete Post</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.button, styles.reportButton]}
                  onPress={handleReport}
                >
                  <Text style={styles.textStyle}>Report Post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleCancel}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
