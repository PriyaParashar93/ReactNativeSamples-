import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

import BottomTab from "../navigation/BottomTab";
import FeedScreen from "../features/feed/FeedScreen";
import PlaceholderScreen from "./PlaceholderScreen";
import PostDetailScreen from "./PostDetailScreen";
import ProfileScreen from "../features/profile/ProfileScreen";
import SettingsScreen from "../features/settings/SettingsScreen";

import type { FeedPost } from "../features/feed/postSlice";

const DRAWER_WIDTH = 270;
const PROFILE_IMAGE = "https://randomuser.me/api/portraits/women/44.jpg";

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
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);

  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  const openDrawer = useCallback(() => {
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
  }, [drawerAnim, backdropAnim]);

  const closeDrawer = useCallback(
    (callback?: () => void) => {
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
    },
    [drawerAnim, backdropAnim]
  );

  const navigateFromDrawer = useCallback(
    (screen: Screen) => {
      closeDrawer(() => {
        setCurrentScreen(screen);
        if (screen === "profile") {
          setActiveTab(4);
        } else if (screen === "feed") {
          setActiveTab(0);
        }
      });
    },
    [closeDrawer]
  );

  const handleTabPress = useCallback((index: number) => {
    setActiveTab(index);
    setCurrentScreen(TAB_SCREEN_MAP[index] ?? "feed");
  }, []);

  const handlePostPress = useCallback((post: FeedPost) => {
    setSelectedPost(post);
    setCurrentScreen("postDetail");
  }, []);

  const handleBackFromDetail = useCallback(() => {
    setCurrentScreen("feed");
    setSelectedPost(null);
  }, []);

  const handleSettingsNavigate = useCallback((screen: "profile") => {
    setCurrentScreen(screen);
    if (screen === "profile") setActiveTab(4);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  const renderContent = () => {
    if (currentScreen === "postDetail" && selectedPost) {
      return (
        <PostDetailScreen
          post={selectedPost}
          onBack={handleBackFromDetail}
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
      return <SettingsScreen onNavigate={handleSettingsNavigate} />;
    }

    return (
      <FeedScreen onPostPress={handlePostPress} onOpenDrawer={openDrawer} />
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
          <Animated.View
            style={[styles.backdrop, { opacity: backdropAnim }]}
            pointerEvents="box-none"
          >
            <TouchableOpacity
              style={StyleSheet.absoluteFill}
              activeOpacity={1}
              onPress={handleCloseDrawer}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.drawer,
              { transform: [{ translateX: drawerAnim }] },
            ]}
          >
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Menu</Text>
              <TouchableOpacity onPress={handleCloseDrawer}>
                <Icon name="close-outline" size={26} color="black" />
              </TouchableOpacity>
            </View>

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
