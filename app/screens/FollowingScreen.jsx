import React, { useState, useCallback, useEffect } from "react";
import { View, ScrollView, RefreshControl, StyleSheet } from "react-native";
import Category from "../components/Category";
import Pin from "../components/Pin";
import { getUserPosts } from "../api/user";
import { getCategories, getMyFollowing } from "../api/me";
import { CategorySkeleton, PinSkeleton } from "../components/SkeletonLoader";

export default function FollowingScreen({ navigation }) {
  const [followingData, setFollowingData] = useState(null);
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userFollow, setUserFollow] = useState([]);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    getUserPosts(setFollowingData, setIsLoading);
    getCategories(setCategories);
    getMyFollowing(setUserFollow);
  }, []);

  useEffect(() => {
    getUserPosts(setFollowingData, setIsLoading);
    getCategories(setCategories);
    getMyFollowing(setUserFollow);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {[...Array(5)].map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </ScrollView>
          <View style={styles.masonryContainer}>
            <View style={styles.column}>
              {[...Array(3)].map((_, i) => (
                <PinSkeleton key={`left-${i}`} isEven={false} />
              ))}
            </View>
            <View style={styles.column}>
              {[...Array(3)].map((_, i) => (
                <PinSkeleton key={`right-${i}`} isEven={true} />
              ))}
            </View>
          </View>
        </>
      );
    }

    return (
      <>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories?.map((catergory, i) => (
            <Category
              title={catergory.name}
              key={i}
              category={category}
              onPress={() => setCategory(catergory.name)}
            />
          ))}
        </ScrollView>
        <View style={styles.masonryContainer}>
          <View style={styles.column}>
            {followingData
              ?.filter((post) => {
                if (category === "All") return post;
                return post.categories === category;
              })
              .filter((post, i) => i % 2 === 1 && post.photos[0])
              .reverse()
              .map((pin, i) => (
                <Pin
                  title={pin.title}
                  uri={pin.photos[0]}
                  key={i}
                  id={pin._id}
                  pin={pin}
                  isEven={false}
                  navigation={navigation}
                />
              ))}
          </View>
          <View style={styles.column}>
            {followingData
              ?.filter((post) => {
                if (category === "All") return post;
                return post.categories === category;
              })
              .filter((post, i) => i % 2 === 0 && post.photos[0])
              .reverse()
              .map((pin, i) => (
                <Pin
                  title={pin.title}
                  uri={pin.photos[0]}
                  key={i}
                  id={i}
                  pin={pin}
                  isEven={true}
                  navigation={navigation}
                />
              ))}
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
    >
      {renderContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    marginVertical: 12,
  },
  masonryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "49%",
  },
});
