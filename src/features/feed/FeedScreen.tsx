import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectAllPosts,
  selectPostsLoading,
  selectPostsError,
  type FeedPost,
} from "./postSlice";
import PostItem from "./components/PostItem";
import StoryItem from "./components/StoryItem";
import type { AppDispatch } from "../../store/store";

const PROFILE_IMAGE = "https://randomuser.me/api/portraits/women/44.jpg";

const stories = [
  { id: "1", name: "Tu historia", image: PROFILE_IMAGE, isMyStory: true },
  { id: "2", name: "beiart", image: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: "3", name: "sunflower", image: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: "4", name: "anais", image: "https://randomuser.me/api/portraits/women/4.jpg" },
];

const POST_HEIGHT = 530; // approximate height of PostItem

type Props = {
  onPostPress: (post: FeedPost) => void;
  onOpenDrawer: () => void;
};

const FeedScreen: React.FC<Props> = ({ onPostPress, onOpenDrawer }) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectAllPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const handlePostPress = useCallback(
    (post: FeedPost) => {
      onPostPress(post);
    },
    [onPostPress]
  );

  const renderPost = useCallback(
    ({ item }: { item: FeedPost }) => (
      <PostItem
        postId={item.id}
        username={item.username}
        userImage={item.userImage}
        postImage={item.postImage}
        title={item.title}
        body={item.body}
        onPress={() => handlePostPress(item)}
      />
    ),
    [handlePostPress]
  );

  const keyExtractor = useCallback((item: FeedPost) => item.id, []);

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: POST_HEIGHT,
      offset: POST_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onOpenDrawer} style={styles.drawerBtn}>
          <Icon name="menu-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.drawerBtn} />
      </View>

      {/* Feed */}
      <FlatList
        ListHeaderComponent={
          <View style={styles.storyContainer}>
            <FlatList
              data={stories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <StoryItem
                  name={item.name}
                  image={item.image}
                  isMyStory={item.isMyStory}
                />
              )}
            />
          </View>
        }
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        windowSize={5}
        maxToRenderPerBatch={5}
        getItemLayout={getItemLayout}
        ListEmptyComponent={
          loading ? (
            <View style={styles.feedCenter}>
              <ActivityIndicator size="large" color="#0095f6" />
              <Text style={styles.feedStatusText}>Loading posts…</Text>
            </View>
          ) : error ? (
            <View style={styles.feedCenter}>
              <Text style={styles.feedErrorText}>Failed to load posts</Text>
              <Text style={styles.feedStatusText}>{error}</Text>
            </View>
          ) : null
        }
      />
    </>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  header: {
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  drawerBtn: {
    width: 36,
    alignItems: "center",
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  storyContainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  feedCenter: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    gap: 10,
  },
  feedStatusText: {
    fontSize: 14,
    color: "#888",
  },
  feedErrorText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#e53935",
  },
});
