import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Reusing existing custom components
import CustomButton from "../Components/CustomButton";
import StoryItem from "../Components/homeComponent/StoryItem";

const { width } = Dimensions.get("window");
const GRID_SIZE = Math.floor((width - 4) / 3);

const PROFILE_IMAGE = "https://randomuser.me/api/portraits/women/44.jpg";

const highlights = [
  {
    id: "1",
    name: "nature",
    image: "https://picsum.photos/300/300?random=32",
  },
  {
    id: "2",
    name: "travel",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    id: "3",
    name: "foodie",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  }
];

const gridPhotos = [
  {
    id: "1",
    image: "https://picsum.photos/300/300?random=30",
    isPinned: true,
    isVideo: false,
  },
  {
    id: "2",
    image: "https://picsum.photos/300/300?random=31",
    isPinned: true,
    isVideo: true,
  },
  {
    id: "3",
    image: "https://picsum.photos/300/300?random=32",
    isPinned: true,
    isVideo: false,
  },
  {
    id: "4",
    image: "https://picsum.photos/300/300?random=33",
    isPinned: false,
    isVideo: false,
  },
  {
    id: "5",
    image: "https://picsum.photos/300/300?random=34",
    isPinned: false,
    isVideo: true,
  },
  {
    id: "6",
    image: "https://picsum.photos/300/300?random=35",
    isPinned: false,
    isVideo: false,
  },
  {
    id: "7",
    image: "https://picsum.photos/300/300?random=36",
    isPinned: false,
    isVideo: false,
  },
  {
    id: "8",
    image: "https://picsum.photos/300/300?random=37",
    isPinned: false,
    isVideo: false,
  },
  {
    id: "9",
    image: "https://picsum.photos/300/300?random=38",
    isPinned: false,
    isVideo: false,
  },
];

const ProfileScreen: React.FC = () => {
  const [activeGridTab, setActiveGridTab] = useState(0);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* ── Profile Section ── */}
      <View style={styles.profileSection}>
        {/* Avatar with floating note bubble */}
        <View style={styles.avatarArea}>
          
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: PROFILE_IMAGE }} style={styles.avatar} />
            <View style={styles.plusBadge}>
              <Icon name="add" size={13} color="white" />
            </View>
          </View>
        </View>

        {/* Stats column */}
        <View style={styles.statsArea}>
          <Text style={styles.displayName}>Jenny</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statCount}>54</Text>
              <Text style={styles.statLabel}>posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statCount}>100</Text>
              <Text style={styles.statLabel}>followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statCount}>86</Text>
              <Text style={styles.statLabel}>following</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ── Threads Handle ── */}
      <View style={styles.threadsHandle}>
        <Text style={styles.threadsHandleIcon}>@</Text>
        <Text style={styles.threadsHandleText}> priyaparashar9</Text>
      </View>

      {/* ── Action Buttons — reusing CustomButton ── */}
      <View style={styles.actionRow}>
        <CustomButton
          title="Edit profile"
          onPress={() => {}}
          type="outlined"
          style={styles.actionBtn}
        />
        <CustomButton
          title="Share profile"
          onPress={() => {}}
          type="outlined"
          style={styles.actionBtn}
        />
        <TouchableOpacity style={styles.addFriendBtn}>
          <Icon name="person-add-outline" size={18} color="black" />
        </TouchableOpacity>
      </View>

      {/* ── Highlights — reusing StoryItem ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.highlightsContent}
      >
        {/* "New" highlight button */}
        <View style={styles.newHighlightContainer}>
          <View style={styles.newHighlightCircle}>
            <Icon name="add" size={26} color="black" />
          </View>
          <Text style={styles.newHighlightLabel}>New</Text>
        </View>

        {/* Highlight circles — StoryItem reused here */}
        {highlights.map((item) => (
          <StoryItem key={item.id} name={item.name} image={item.image} />
        ))}
      </ScrollView>

      {/* ── Grid Tab Selector ── */}
      <View style={styles.gridTabBar}>
        <TouchableOpacity
          style={[
            styles.gridTabItem,
            activeGridTab === 0 && styles.gridTabActive,
          ]}
          onPress={() => setActiveGridTab(0)}
        >
          <Icon
            name="grid-outline"
            size={22}
            color={activeGridTab === 0 ? "black" : "#aaa"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.gridTabItem,
            activeGridTab === 1 && styles.gridTabActive,
          ]}
          onPress={() => setActiveGridTab(1)}
        >
          <Icon
            name="play-circle-outline"
            size={22}
            color={activeGridTab === 1 ? "black" : "#aaa"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.gridTabItem,
            activeGridTab === 2 && styles.gridTabActive,
          ]}
          onPress={() => setActiveGridTab(2)}
        >
          <Icon
            name="person-outline"
            size={22}
            color={activeGridTab === 2 ? "black" : "#aaa"}
          />
        </TouchableOpacity>
      </View>

      {/* ── Photo Grid ── */}
      <View style={styles.photoGrid}>
        {gridPhotos.map((photo) => (
          <TouchableOpacity key={photo.id} style={styles.gridCell}>
            <Image source={{ uri: photo.image }} style={styles.gridImage} />
            {photo.isPinned && (
              <View style={styles.pinOverlay}>
                <Icon name="pin" size={13} color="white" />
              </View>
            )}
            {photo.isVideo && (
              <View style={styles.playOverlay}>
                <Icon name="play" size={13} color="white" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom padding so last grid row isn't hidden */}
      <View style={{ height: 16 }} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  /* ── Header ── */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerUsername: {
    fontSize: 17,
    fontWeight: "700",
    color: "black",
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff0000",
    marginLeft: 5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  threadsWrapper: {
    position: "relative",
    padding: 2,
  },
  threadsIcon: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "red",
    borderRadius: 8,
    minWidth: 18,
    paddingHorizontal: 3,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  menuIcon: {
    marginLeft: 14,
  },

  /* ── Profile Section ── */
  profileSection: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  avatarArea: {
    alignItems: "center",
    marginRight: 20,
  },
  noteBubble: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
    maxWidth: 95,
  },
  noteText: {
    fontSize: 10,
    color: "#333",
    textAlign: "center",
  },
  avatarWrapper: {
    position: "relative",
    width: 90,
    height: 90,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  plusBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#0095f6",
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  statsArea: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 4,
  },
  displayName: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  statLabel: {
    fontSize: 13,
    color: "black",
  },

  /* ── Threads Handle ── */
  threadsHandle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  threadsHandleIcon: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
  },
  threadsHandleText: {
    fontSize: 14,
    color: "#555",
  },

  /* ── Action Buttons ── */
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 16,
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderColor: "#dbdbdb",
    borderRadius: 8,
  },
  addFriendBtn: {
    width: 40,
    height: 38,
    borderWidth: 1,
    borderColor: "#dbdbdb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ── Highlights ── */
  highlightsContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  newHighlightContainer: {
    width: 75,
    alignItems: "center",
    marginHorizontal: 6,
  },
  newHighlightCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1.5,
    borderColor: "#dbdbdb",
    justifyContent: "center",
    alignItems: "center",
  },
  newHighlightLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#222",
  },

  /* ── Grid Tab Selector ── */
  gridTabBar: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    marginTop: 4,
  },
  gridTabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  gridTabActive: {
    borderBottomColor: "black",
  },

  /* ── Photo Grid ── */
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
  },
  gridCell: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    position: "relative",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  pinOverlay: {
    position: "absolute",
    top: 6,
    right: 6,
  },
  playOverlay: {
    position: "absolute",
    top: 6,
    right: 6,
  },
});
