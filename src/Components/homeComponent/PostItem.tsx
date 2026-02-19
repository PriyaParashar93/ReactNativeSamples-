import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  username: string;
  userImage: string;
  postImage: string;
  title?: string;
  body?: string;
  onPress?: () => void;
};

const PostItem: React.FC<Props> = ({ username, userImage, postImage, title, body, onPress }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: userImage }} style={styles.profileImage} />
          <Text style={styles.username}>{username}</Text>
        </View>

        <TouchableOpacity>
          <Icon name="ellipsis-horizontal" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} disabled={!onPress}>
        <Image source={{ uri: postImage }} style={styles.postImage} />
      </TouchableOpacity>

      {/* Actions */}
      <View style={styles.actionRow}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="heart-outline" size={26} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="paper-plane-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Icon name="bookmark-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Like Text */}
      <Text style={styles.likeText}>
        Les gusta a <Text style={styles.bold}>Neoland</Text> y más personas
      </Text>

      {/* Post title & body from API */}
      {title ? (
        <Text style={styles.captionText} numberOfLines={2}>
          <Text style={styles.bold}>{username} </Text>
          {title}
        </Text>
      ) : null}
      {body ? (
        <Text style={styles.bodyText} numberOfLines={3}>
          {body}
        </Text>
      ) : null}

  

      {/* Time */}
      <Text style={styles.timeText}>Hace 2 días</Text>

      <View style={{ height: 1, backgroundColor: "#eee", marginVertical: 5 }} />
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
  postImage: {
    width: "100%",
    height: 350,
    backgroundColor: "#eee",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 10,
    alignItems: "center",
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginRight: 14,
  },
  likeText: {
    paddingHorizontal: 12,
    paddingTop: 8,
    fontSize: 13,
    color: "#111",
  },
  bold: {
    fontWeight: "bold",
  },
  captionText: {
    paddingHorizontal: 12,
    paddingTop: 6,
    fontSize: 13,
    color: "#111",
    lineHeight: 18,
  },
  bodyText: {
    paddingHorizontal: 12,
    paddingTop: 3,
    fontSize: 12,
    color: "#555",
    lineHeight: 17,
  },
  commentText: {
    paddingHorizontal: 12,
    paddingTop: 4,
    fontSize: 13,
    color: "gray",
  },
  addCommentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  commentAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 10,
  },
  addComment: {
    flex: 1,
    color: "gray",
    fontSize: 13,
  },
  emojiRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    marginLeft: 6,
    fontSize: 14,
  },
  timeText: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 12,
    fontSize: 11,
    color: "gray",
  },
});
