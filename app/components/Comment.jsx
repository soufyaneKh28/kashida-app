import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HeartIcon as HeartFill } from "react-native-heroicons/solid";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
import { DateTime } from "luxon";
import { formatRelativeTime } from "../api/timeUtils";
import { baseurl } from "../api/user";
import {
  deleteComment,
  getCommentReplies,
  sendCommentReport,
  unlikeComment,
} from "../api/Comments";
import { LikeComment } from "../api/Comments";
import Reply from "./Reply";

const { width, height } = Dimensions.get("window");
const Comment = ({ comment, userId, onReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(comment.hasLiked);
  const [likeNum, setlikeNum] = useState(comment.likes);
  const [likeNumReplies, setLikeNumReplies] = useState(0);
  const [replyingTo, setReplyingTo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // const [likeNum, setlikeNum] = useState(likesNum);
  function handleLike() {
    if (!isLiked) {
      // likePost(postId);

      setIsLiked(true);

      LikeComment(comment._id);

      setlikeNum(likeNum + 1);
      console.log("pressed true");
    } else {
      // unLikePost(postId);
      unlikeComment(comment._id);
      setIsLiked(false);
      setlikeNum(likeNum - 1);
      console.log("pressed fslde");
    }
  }
  // Showiing Replies
  async function handleShowReplies() {
    if (showReplies) {
      setShowReplies(false);
    } else if (replies && replies.length > 0) {
      setShowReplies(true);
    } else {
      setIsLoading(true);
      const data = await getCommentReplies(setReplies, comment._id);
      // setReplies(data)
      setReplies(data.replies);
      setIsLoading(false);
      setShowReplies(true);
      // console.log("====================================");
      // console.log("replies grom comment com", data.replies);
      // console.log("replies from state com", replies);
      // console.log("====================================");
    }
  }

  const handleReply = async (comment) => {
    setReplyingTo(comment);
    console.log("replying to", comment);
    onReply(comment);
  };

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    deleteComment(comment._id);

    setModalVisible(false);
  };

  const handleReport = () => {
    sendCommentReport(comment._id);
    setModalVisible(false);
  };
  return (
    <>
      <Pressable onLongPress={handleLongPress} style={styles.commentContainer}>
        <Image
          source={{
            uri: comment.user.photo[0]
              ? comment.user.photo[0]
              : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
          }}
          style={styles.avatar}
        />
        <View style={styles.commentContent}>
          <View style={styles.commentHeader}>
            <Text style={styles.username}>{comment.user.username}</Text>
            <Text style={styles.time}>
              {formatRelativeTime(comment.createdAt)}
            </Text>
          </View>
          <Text style={styles.commentText}>{comment.comment}</Text>
          <View style={styles.commentActions}>
            <TouchableOpacity onPress={() => handleReply(comment)}>
              <Text style={styles.actionButton}>Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShowReplies}>
              {(comment.reply > 0 || replies.length > 0) && (
                <Text style={styles.actionButton}>
                  {showReplies
                    ? "Hide Replies"
                    : `View ${comment.reply} Replies`}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
          {showReplies && (
            <View style={styles.repliesContainer}>
              {replies.map((reply) => (
                <Reply reply={reply} key={reply._id} userId={userId} />
              ))}
            </View>
          )}
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
              <Text style={styles.modalTitle}>Comment Options</Text>
              {comment.user._id === userId && (
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={handleDelete}
                >
                  <Text style={styles.textStyle}>Delete Comment</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, styles.reportButton]}
                onPress={handleReport}
              >
                <Text style={styles.textStyle}>Report Comment</Text>
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

export default Comment;

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
  inputContainer: {
    flexDirection: "row",
    padding: 10,
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
    paddingVertical: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
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
