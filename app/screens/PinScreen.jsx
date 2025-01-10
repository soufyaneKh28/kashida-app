import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
// import Animated from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
// import { window } from "@/constants/sizes";
// import { renderItem } from "@/utils/render-item";
import {
  ArrowLeftIcon,
  ArrowUpCircleIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { EnvelopeIcon } from "react-native-heroicons/solid";
import { baseurl, getUserPosts } from "../api/user";
import Pin from "../components/Pin";
import { StyleSheet } from "react-native";
import PostLike from "../components/PostLike";
import * as SecureStore from "expo-secure-store";
// import { KeyboardAvoidingView } from "react-native-web";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
const windowWidth = Dimensions.get("window").width;

const defaultDataWith6Colors = [
  { color: "#FF0000" },
  { color: "#00FF00" },
  { color: "#0000FF" },
  { color: "#FFFF00" },
  { color: "#FF00FF" },
  { color: "#00FFFF" },
];

const PinScreen = ({ route }) => {
  const { title, uri, pin } = route.params;
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comment, setComment] = useState();

  const [userData, setUserData] = useState();
  const [loading, setIsLoading] = useState();
  console.log("====================================");
  console.log("pin from pin details", pin);
  console.log("====================================");

  useEffect(() => {
    getUserPosts(setUserData, setIsLoading);

  }, []);
  console.log("====================================");
  console.log("photos", pin.photos);
  console.log("====================================");

  const progress = useSharedValue(0);

  const renderItem =
    ({ rounded }) =>
    ({ item }) =>
      (
        <Image
          source={{
            uri: require("../../assets/images/placeholder.jpg") && item,
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className=" rounded-b-[20px]  shadow-2xl object-fill"
        />
      );



      const handleSubmitComment = async () => {
        // Create form data
    console.log("pressed")
        if (newComment.length === 0)
          return Alert.alert("there is no comment to add please write something");
        const formData = new FormData();
        formData.append("comment", newComment);
    
        try {
          const token = await SecureStore.getItemAsync("jwtToken");
          const response = await axios.post(
            `${baseurl}/api/k1/posts/${pin._id}/comments/`,
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
    
  return (
    <SafeAreaView className=" bg-white flex-1">
      <ScrollView>
        <Carousel
          loop={false}
          width={windowWidth}
          height={500}
          snapEnabled={true}
          pagingEnabled={true}
          autoPlayInterval={1000}
          data={pin.photos}
          style={{
            width: "100%",
            backgroundColor: "black",
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={renderItem({
            rounded: true,
            style: { marginRight: 8 },
          })}
        />
        {/* back arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white w-[41px] h-[41px] items-center justify-center rounded-[16px] mt-[20px] ms-[10px] shadow-2xl absolute z-10"
        >
          <ArrowLeftIcon color={"black"} />
        </TouchableOpacity>
        {/* Pagination Dots */}
        <View className=" flex-row justify-center items-center mt-5">
          {pin.photos.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
        <View className="px-3">
          <View className=" flex-row justify-between items-center">
            {/* Actions */}
            <View className=" mb-5 flex-row">
              {/* Like */}

              <PostLike
                likeState={pin?.hasLiked}
                likesNum={pin?.likes}
                postId={pin?._id}
              />

              {/* Comment */}

              {/* <Pressable className="flex-row ms-3 items-center">
                <ChatBubbleOvalLeftIcon color={"#00868C"} size={30} />
                <Text className="text-[#00868C] ms-1 text-xl font-semibold">
                  20K
                </Text>
              </Pressable> */}

              {/* Send */}
              <View className=" flex-row ms-3  items-center">
                <Pressable>
                  <PaperAirplaneIcon color={"#00868C"} size={24} />
                </Pressable>
              </View>
            </View>
            <Pressable>
              <EllipsisHorizontalIcon color={"#00868C"} size={30} />
            </Pressable>
          </View>
          {/* user */}
          <Pressable
            onPress={() =>
              navigation.push("ProfileOther", {
                id: pin?.user?._id,
              })
            }
          >
            <View className="flex-row items-center">
              <Image
                source={{  uri:pin?.user.photo[0] ? pin?.user.photo[0]: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" }}
                width={35}
                height={35}
                className="rounded-full"
              />
              <Text className="ms-3 text-lg font-semibold">
                {pin?.user.username}
              </Text>
            </View>
          </Pressable>
          {/* post title and Description */}
          <View className="mt-3">
            <Text className="text-black text-2xl font-bold ">{pin?.title}</Text>
            <Text className=" text-base text-textSecondary font-medium ">
              {pin?.description}
            </Text>
          </View>

          {/* Adding Comment */}
  
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            style={styles.inputContainer}
          >

            <TextInput
              style={styles.input}
              value={newComment}
              onChangeText={setNewComment}
              placeholder={"Add a comment..."}
              multiline
              />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSubmitComment} >
              <FontAwesome name="send" size={20} color="#F3FAFF" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
            

    

          <View className="w-full mt-6 mb-3 bg-[#ECEEF2] h-[2px]" />

          <View className="flex-row justify-between">
            {/* first Col */}
            <View className=" w-[50%] px-1   ">
              {userData
                ?.filter((post, i) => i % 2 === 1 && post.id !== pin.id)
                .map((pin, i) => (
                  <Pin
                    title={pin.title}
                    uri={pin.photos[0]}
                    key={i}
                    id={i}
                    pin={pin}
                    isEven={false}
                    navigation={navigation}
                  />
                ))}
            </View>
            {/* second col */}
            <View className=" w-[50%]  px-1   ">
              {userData
                ?.filter((post, i) => i % 2 === 0 && post.id !== pin.id)
                .map((pin, i) => (
                  <Pin
                    title={pin.title}
                    uri={pin.photos[0]}
                    key={i}
                    id={i}
                    pin={pin}
                    isEven={true}
                  />
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#333",
    width: 10,
    height: 10,
  },
  inputContainer: {
    flexDirection: "row",
    
    alignItems: "center",
    marginTop:10
    // borderTopWidth: 1,
    // borderTopColor: "#eee",
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
export default PinScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   gradient: {
//     height: 240,
//     padding: 10,
//     paddingBottom: 20,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     justifyContent: "flex-end",
//   },
//   contentContainer: {
//     height: "90%",
//     width: "100%",
//     position: "absolute",
//     bottom: 0,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     overflow: "hidden",
//     backgroundColor: "#F3FAFF",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 15,
//   },
//   commentsList: {
//     padding: 10,
//   },

 
//   inputAvatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//   },
//   sendBtn: {
//     backgroundColor: "#00868C",
//     padding: 8,
//     marginStart: 10,
//     borderRadius: 50,
//   },
//   noCommentsContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   noCommentText: {
//     textAlign: "center",
//     fontWeight: "800",
//   },
// });
