import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

import BottomTab from "../Components/homeComponent/BottomTab";
import PostItem from "../Components/homeComponent/PostItem";
import StoryItem from "../Components/homeComponent/StoryItem";
import PlaceholderScreen from "./PlaceholderScreen";
import PostDetailScreen from "./PostDetailScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";

const DRAWER_WIDTH = 270;
const PROFILE_IMAGE = "https://randomuser.me/api/portraits/women/44.jpg";

const stories = [
  { id: "1", name: "Tu historia", image: PROFILE_IMAGE, isMyStory: true },
  { id: "2", name: "beiart", image: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: "3", name: "sunflower", image: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: "4", name: "anais", image: "https://randomuser.me/api/portraits/women/4.jpg" },
];

const USER_NAME = "raul_marin";
const USER_IMAGE = "https://randomuser.me/api/portraits/men/11.jpg";

type ApiPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type FeedPost = {
  id: string;
  username: string;
  userImage: string;
  postImage: string;
  title: string;
  body: string;
};

type Screen = "feed" | "reels" | "newPost" | "search" | "profile" | "settings" | "postDetail";

const TAB_SCREEN_MAP: Record<number, Screen> = {
  0: "feed",
  1: "reels",
  2: "newPost",
  3: "search",
  4: "profile",
};

const TAB_TITLE_MAP: Record<number, string> = {
  1: "Reels",
  2: "New Post",
  3: "Search",
};

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<Screen>("feed");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ApiPost[]>;
      })
      .then((data) => {
        const mapped: FeedPost[] = data.map((post) => ({
          id: String(post.id),
          username: USER_NAME,
          userImage: USER_IMAGE,
          postImage: `https://picsum.photos/600/600?random=${post.id}`,
          title: post.title,
          body: post.body,
        }));
        setPosts(mapped);
      })
      .catch((err: Error) => setPostsError(err.message))
      .finally(() => setPostsLoading(false));
  }, []);

  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.parallel([
      Animated.timing(drawerAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(drawerAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setDrawerVisible(false);
      callback?.();
    });
  };

  const navigateFromDrawer = (screen: Screen) => {
    closeDrawer(() => {
      setCurrentScreen(screen);
      if (screen === "profile") {
        setActiveTab(4);
      } else if (screen === "feed") {
        setActiveTab(0);
      }
    });
  };

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    setCurrentScreen(TAB_SCREEN_MAP[index] ?? "feed");
  };

  const handlePostPress = (post: FeedPost) => {
    setSelectedPost(post);
    setCurrentScreen("postDetail");
  };

  const renderContent = () => {
    if (currentScreen === "postDetail" && selectedPost) {
      return (
        <PostDetailScreen
          post={selectedPost}
          onBack={() => {
            setCurrentScreen("feed");
            setSelectedPost(null);
          }}
        />
      );
    }

    if (
      currentScreen === "reels" ||
      currentScreen === "newPost" ||
      currentScreen === "search"
    ) {
      const title = TAB_TITLE_MAP[activeTab] ?? "";
      return <PlaceholderScreen title={title} />;
    }

    if (currentScreen === "profile") {
      return <ProfileScreen />;
    }

    if (currentScreen === "settings") {
      return (
        <SettingsScreen
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            if (screen === "profile") setActiveTab(4);
          }}
        />
      );
    }

    return (
      <>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={openDrawer} style={styles.drawerBtn}>
            <Icon name="menu-outline" size={28} color="black" />
          </TouchableOpacity>

          <Text style={styles.logo}>Instagram</Text>

          {/* Placeholder to keep title centered */}
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostItem
              username={item.username}
              userImage={item.userImage}
              postImage={item.postImage}
              title={item.title}
              body={item.body}
              onPress={() => handlePostPress(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            postsLoading ? (
              <View style={styles.feedCenter}>
                <ActivityIndicator size="large" color="#0095f6" />
                <Text style={styles.feedStatusText}>Loading posts…</Text>
              </View>
            ) : postsError ? (
              <View style={styles.feedCenter}>
                <Text style={styles.feedErrorText}>Failed to load posts</Text>
                <Text style={styles.feedStatusText}>{postsError}</Text>
              </View>
            ) : null
          }
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header for non-feed screens */}
      {currentScreen !== "feed" && currentScreen !== "postDetail" && (
        <View style={styles.header}>
          <TouchableOpacity onPress={openDrawer} style={styles.drawerBtn}>
            <Icon name="menu-outline" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.logo}>
            {currentScreen === "profile"
              ? "Profile"
              : currentScreen === "settings"
              ? "Settings"
              : currentScreen === "reels"
              ? "Reels"
              : currentScreen === "newPost"
              ? "New Post"
              : currentScreen === "search"
              ? "Search"
              : "Instagram"}
          </Text>
          <View style={styles.drawerBtn} />
        </View>
      )}

      {renderContent()}

      {/* Bottom Tab — hidden on post detail */}
      {currentScreen !== "postDetail" && (
        <BottomTab
          activeTab={activeTab}
          onTabPress={handleTabPress}
          profileImage={PROFILE_IMAGE}
        />
      )}

      {/* Drawer overlay */}
      {drawerVisible && (
        <>
          {/* Backdrop */}
          <Animated.View
            style={[styles.backdrop, { opacity: backdropAnim }]}
            pointerEvents="box-none"
          >
            <TouchableOpacity
              style={StyleSheet.absoluteFill}
              activeOpacity={1}
              onPress={() => closeDrawer()}
            />
          </Animated.View>

          {/* Drawer panel */}
          <Animated.View
            style={[
              styles.drawer,
              { transform: [{ translateX: drawerAnim }] },
            ]}
          >
            {/* Drawer Header */}
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Menu</Text>
              <TouchableOpacity onPress={() => closeDrawer()}>
                <Icon name="close-outline" size={26} color="black" />
              </TouchableOpacity>
            </View>

            {/* Drawer Items */}
            <TouchableOpacity
              style={styles.drawerItem}
              activeOpacity={0.7}
              onPress={() => navigateFromDrawer("profile")}
            >
              <View style={styles.drawerIconWrap}>
                <Icon name="person-outline" size={22} color="#222" />
              </View>
              <Text style={styles.drawerItemText}>Profile</Text>
            </TouchableOpacity>

            <View style={styles.drawerSeparator} />

            <TouchableOpacity
              style={styles.drawerItem}
              activeOpacity={0.7}
              onPress={() => navigateFromDrawer("settings")}
            >
              <View style={styles.drawerIconWrap}>
                <Icon name="settings-outline" size={22} color="#222" />
              </View>
              <Text style={styles.drawerItemText}>Settings</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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

  /* Drawer */
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    zIndex: 10,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "white",
    zIndex: 20,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 4, height: 0 },
    elevation: 16,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
    marginBottom: 8,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
  },
  drawerIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  drawerSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e5e5e5",
    marginHorizontal: 20,
  },
});
