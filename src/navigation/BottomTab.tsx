import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { selectProfilePhoto, selectBookmarkCount } from "../features/user/userSlice";

type Props = {
  activeTab: number;
  onTabPress: (index: number) => void;
};

const BottomTab: React.FC<Props> = ({ activeTab, onTabPress }) => {
  const bookmarkCount = useSelector(selectBookmarkCount);
  const profileImage = useSelector(selectProfilePhoto);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onTabPress(0)}>
        <Icon
          name={activeTab === 0 ? "home" : "home-outline"}
          size={26}
          color="black"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onTabPress(1)}>
        <Icon
          name={activeTab === 1 ? "play-circle" : "play-circle-outline"}
          size={26}
          color="black"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onTabPress(2)}>
        <Icon name="add-circle-outline" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onTabPress(3)}>
        <Icon
          name={activeTab === 3 ? "search" : "search-outline"}
          size={26}
          color="black"
        />
      </TouchableOpacity>

      {/* Profile tab — always shows avatar thumbnail + saved badge */}
      <TouchableOpacity onPress={() => onTabPress(4)} style={styles.profileTab}>
        <Image
          source={{ uri: profileImage }}
          style={[
            styles.profileThumb,
            activeTab === 4 && styles.profileThumbActive,
          ]}
        />
        {bookmarkCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{bookmarkCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(BottomTab);

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  profileTab: {
    position: "relative",
  },
  profileThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#ddd",
  },
  profileThumbActive: {
    borderWidth: 2,
    borderColor: "black",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "#e53935",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "white",
    fontSize: 9,
    fontWeight: "bold",
  },
});
