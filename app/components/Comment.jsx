import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
import { HeartIcon as HeartFill } from "react-native-heroicons/solid";
import { DateTime } from "luxon";
import { formatRelativeTime } from "../api/timeUtils";
import { baseurl } from "../api/user";
import { getCommentReplies } from "../api/Comments";
import { LikeComment } from "../api/Comments";
const Comment = ({ comment, level = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(comment.hasLiked);

  // const [likeNum, setlikeNum] = useState(likesNum);
  function handleLike() {
    if (!isLiked) {
      // likePost(postId);
      LikeComment(comment._id);
      setIsLiked(true);
      // setlikeNum(likeNum + 1);
      console.log("pressed true");
    } else {
      // unLikePost(postId);
      setIsLiked(false);
      // setlikeNum(likeNum - 1);
      console.log("pressed fslde");
    }
  }

  async function test() {
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
  return (
    <View style={styles.commentContainer}>
      <Image source={{ uri: comment.user.photo[0] }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.username}>{comment.user.username}</Text>
          <Text style={styles.time}>
            {formatRelativeTime(comment.createdAt)}
          </Text>
        </View>
        <Text style={styles.commentText}>{comment.comment}</Text>
        <View style={styles.commentActions}>
          <TouchableOpacity>
            <Text style={styles.actionButton}>Reply</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={test}>
            <Text style={styles.actionButton}>
              {showReplies ? "Hide Replies" : `View ${comment.reply} Replies`}
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
        {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
        {showReplies && (
          <View style={styles.repliesContainer}>
            {replies.map((reply) => (
              <View key={reply._id} style={styles.replyContainer}>
                <Image
                  source={{ uri: reply.user.photo[0] }}
                  style={styles.replyAvatar}
                />
                <View style={styles.replyContent}>
                  <View style={styles.replyHeader}>
                    <Text style={styles.replyUsername}>
                      {reply.user.username}
                    </Text>
                    <Text style={styles.replyTime}>
                      {formatRelativeTime(reply.createdAt)}
                    </Text>
                  </View>
                  <Text style={styles.replyText}>{reply.reply}</Text>
                </View>
                <TouchableOpacity style={styles.likeButton}>
                  <HeartOutline color="black" size={18} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
        {isLiked ? (
          <HeartFill color="#00868C" size={18} />
        ) : (
          <HeartOutline color="#00868C" size={18} />
        )}
      </TouchableOpacity>
    </View>
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
});
