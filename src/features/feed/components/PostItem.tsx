import React, { useCallback } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLike,
  toggleSave,
  selectIsLiked,
  selectIsSaved,
  selectLikeCount,
} from "../postSlice";
import { toggleBookmark } from "../../user/userSlice";
import { usePostInteractionStore } from "../../../zustand/usePostInteractionStore";
import type { AppDispatch } from "../../../store/store";

type Props = {
  postId: string;
  username: string;
  userImage: string;
  postImage: string;
  title?: string;
  body?: string;
  onPress?: () => void;
};

const PostItem: React.FC<Props> = ({
  postId,
  username,
  userImage,
  postImage,
  title,
  body,
  onPress,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const liked = useSelector(selectIsLiked(postId));
  const saved = useSelector(selectIsSaved(postId));
  const likeCount = useSelector(selectLikeCount(postId));
  const { addToCollection, removeFromCollection } = usePostInteractionStore();

  const handleLike = useCallback(() => {
    dispatch(toggleLike(postId));
  }, [dispatch, postId]);

  const handleSave = useCallback(() => {
    dispatch(toggleSave(postId));
    dispatch(
      toggleBookmark({
        id: postId,
        postImage: postImage,
        title: title ?? "",
      })
    );
    if (!saved) {
      addToCollection("All Posts", postId);
    } else {
      removeFromCollection("All Posts", postId);
    }
  }, [dispatch, postId, postImage, title, saved, addToCollection, removeFromCollection]);

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
          <TouchableOpacity style={styles.iconBtn} onPress={handleLike}>
            <Icon
              name={liked ? "heart" : "heart-outline"}
              size={26}
              color={liked ? "#e53935" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="paper-plane-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSave}>
          <Icon
            name={saved ? "bookmark" : "bookmark-outline"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Like Count */}
      {likeCount > 0 ? (
        <Text style={styles.likeText}>
          {likeCount.toLocaleString()} {likeCount === 1 ? "like" : "likes"}
        </Text>
      ) : (
        <Text style={styles.likeText}>
          Les gusta a <Text style={styles.bold}>Neoland</Text> y más personas
        </Text>
      )}

      {/* Post title & body */}
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

export default React.memo(PostItem);

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
  timeText: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 12,
    fontSize: 11,
    color: "gray",
  },
});
