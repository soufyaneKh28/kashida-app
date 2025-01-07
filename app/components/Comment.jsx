import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
const Comment = ({ comment, level = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <View style={[styles.commentContainer, { marginLeft: level * 20 }]}>
      <Image source={{ uri: comment.avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.username}>{comment.username}</Text>
          <Text style={styles.time}>{comment.time}</Text>
        </View>
        <Text style={styles.commentText}>{comment.text}</Text>
        <View style={styles.commentActions}>
          <TouchableOpacity>
            <Text style={styles.actionButton}>Reply</Text>
          </TouchableOpacity>
          {comment.replies && comment.replies.length > 0 && (
            <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
              <Text style={styles.actionButton}>
                {showReplies
                  ? "Hide Replies"
                  : `View Replies (${comment.replies.length})`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {showReplies && comment.replies && (
          <View style={styles.repliesContainer}>
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} level={level + 1} />
            ))}
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.likeButton}>
        <HeartOutline color="black" size={20} />
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
