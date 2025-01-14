import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { HeartIcon as HeartFill } from "react-native-heroicons/solid";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
import { formatRelativeTime } from "../api/timeUtils";
import {
  deleteReply,
  LikeReply,
  sendReplyReport,
  unlikeReply,
} from "../api/Comments";

const { width, height } = Dimensions.get("window");
const Reply = ({ reply, userId }) => {
  const [likeNum, setLikesNum] = useState(reply.likes);
  const [isLiked, setIsLiked] = useState(reply.hasLiked);
  const [modalVisible, setModalVisible] = useState(false);
  function handleLike() {
    if (!isLiked) {
      // likePost(postId);

      setIsLiked(true);

      //   LikeComment(comment._id);
      LikeReply(reply._id);
      setLikesNum(likeNum + 1);
      console.log("pressed true");
    } else {
      // unLikePost(postId);
      //   unlikeComment(reply._id);
      setIsLiked(false);
      unlikeReply(reply._id);
      setLikesNum(likeNum - 1);
      console.log("pressed fslde");
    }
  }

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    deleteReply(reply._id);
    setModalVisible(false);
  };

  const handleReport = () => {
    sendReplyReport(reply._id);
    setModalVisible(false);
  };
  return (
    <>
      <Pressable onLongPress={handleLongPress} style={styles.replyContainer}>
        <Image
          source={{ uri: reply.user.photo[0] }}
          style={styles.replyAvatar}
        />
        <View style={styles.replyContent}>
          <View style={styles.replyHeader}>
            <Text style={styles.replyUsername}>{reply.user.username}</Text>
            <Text style={styles.replyTime}>
              {formatRelativeTime(reply.createdAt)}
            </Text>
          </View>
          <Text style={styles.replyText}>{reply.reply}</Text>
        </View>
        <View style={styles.likeButtonContainer}>
          <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
            {isLiked ? (
              <HeartFill color="#00868C" size={18} />
            ) : (
              <HeartOutline color="#00868C" size={18} />
            )}
          </TouchableOpacity>
          <Text>{likeNum}</Text>
        </View>
      </Pressable>
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
              <Text style={styles.modalTitle}>Reply Options</Text>
              {reply.user._id === userId && (
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={handleDelete}
                >
                  <Text style={styles.textStyle}>Delete Reply</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, styles.reportButton]}
                onPress={handleReport}
              >
                <Text style={styles.textStyle}>Report Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Reply;

const styles = StyleSheet.create({
  repliesContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  replyContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "start",
  },
  replyAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  replyContent: {
    flex: 1,
  },
  replyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  replyUsername: {
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 12,
  },
  replyTime: {
    color: "#888",
    fontSize: 10,
  },
  replyText: {
    fontSize: 12,
  },
  likeButtonContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
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
