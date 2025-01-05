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
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BackArrow from "../components/BackArrow";
import { LinearGradient } from "expo-linear-gradient";
import { CheckBadgeIcon } from "react-native-heroicons/solid";
import SpaceJoinBtn from "../components/SpaceJoinBtn";
import Post from "../components/Post";
import { GetSpacePost } from "../api/Spaces";

const SingleSpace = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

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

  const renderHeader = () => (
    <View clas>
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

  return (
    <SafeAreaView className=" flex-1 bg-white">
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={renderHeader}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          data={posts}
          style={{ width: "100%" }}
          renderItem={(item) => <Post post={item.item} />}
          contentContainerStyle={{
            gap: 10,
            backgroundColor: "white",
          }}
        />
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
});
