import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import type { FeedPost } from "./HomeScreen";

/* ── API types ── */
type ApiComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type Comment = ApiComment & { isLocal?: boolean };

/* ── Props ── */
type Props = {
  post: FeedPost;
  onBack: () => void;
};

const MY_AVATAR = "https://randomuser.me/api/portraits/women/44.jpg";

const PostDetailScreen: React.FC<Props> = ({ post, onBack }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 900) + 100);

  const flatListRef = useRef<FlatList<Comment>>(null);

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ApiComment[]>;
      })
      .then(setComments)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [post.id]);

  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  const handleSend = () => {
    const text = commentText.trim();
    if (!text) return;

    const newComment: Comment = {
      postId: Number(post.id),
      id: Date.now(),
      name: "You",
      email: "",
      body: text,
      isLocal: true,
    };

    setComments((prev) => [...prev, newComment]);
    setCommentText("");
    setTimeout(
      () => flatListRef.current?.scrollToEnd({ animated: true }),
      150
    );
  };

  /* ── Post header rendered inside FlatList ListHeaderComponent ── */
  const PostHeader = () => (
    <>
      {/* User row */}
      <View style={styles.userRow}>
        <Image source={{ uri: post.userImage }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.locationText}>Original Post</Text>
        </View>
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Icon name="ellipsis-horizontal" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Post image */}
      <Image source={{ uri: post.postImage }} style={styles.postImage} />

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
        <TouchableOpacity onPress={() => setSaved((v) => !v)}>
          <Icon
            name={saved ? "bookmark" : "bookmark-outline"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Like count */}
      <Text style={styles.likeCount}>{likeCount.toLocaleString()} likes</Text>

      {/* Caption */}
      <Text style={styles.caption}>
        <Text style={styles.bold}>{post.username} </Text>
        {post.title}
      </Text>

      {/* Body */}
      <Text style={styles.bodyText}>{post.body}</Text>

      {/* Comments section header */}
      <View style={styles.commentsDivider}>
        <Icon name="chatbubble-outline" size={15} color="#888" />
        <Text style={styles.commentsTitle}>
          {loading
            ? "Loading comments…"
            : error
            ? "Comments unavailable"
            : `${comments.length} Comments`}
        </Text>
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" color="#0095f6" />
        </View>
      )}

      {error && !loading && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* ── Fixed header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={styles.backBtn} />
      </View>

      {/* ── Scrollable content (post + comments) ── */}
      <FlatList
        ref={flatListRef}
        data={comments}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={<PostHeader />}
        renderItem={({ item }) => (
          <View
            style={[styles.commentRow, item.isLocal && styles.localCommentRow]}
          >
            {item.isLocal ? (
              <Image source={{ uri: MY_AVATAR }} style={styles.commentAvatar} />
            ) : (
              <View style={styles.commentAvatarPlaceholder}>
                <Icon name="person-circle-outline" size={36} color="#bbb" />
              </View>
            )}

            <View style={styles.commentContent}>
              <View style={styles.commentTopRow}>
                <Text style={styles.commentName}>
                  {item.isLocal ? "You" : item.name}
                </Text>
                {item.email && !item.isLocal && (
                  <Text style={styles.commentEmail}>{item.email}</Text>
                )}
              </View>
              <Text style={styles.commentBody}>{item.body}</Text>
            </View>

            {item.isLocal && (
              <View style={styles.localBadge}>
                <Text style={styles.localBadgeText}>Sent</Text>
              </View>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />

      {/* ── Bottom comment input ── */}
      <View style={styles.inputBar}>
        <Image source={{ uri: MY_AVATAR }} style={styles.inputAvatar} />
        <TextInput
          style={styles.input}
          placeholder="Add a comment…"
          placeholderTextColor="#aaa"
          value={commentText}
          onChangeText={setCommentText}
          multiline
          returnKeyType="default"
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!commentText.trim()}
          style={[
            styles.sendBtn,
            !commentText.trim() && styles.sendBtnDisabled,
          ]}
        >
          <Text style={styles.sendBtnText}>Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  /* ── Header ── */
  header: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
  },
  backBtn: {
    width: 36,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "black",
  },

  /* ── Post section ── */
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: "700",
    color: "black",
  },
  locationText: {
    fontSize: 11,
    color: "#888",
    marginTop: 1,
  },
  postImage: {
    width: "100%",
    height: 380,
    backgroundColor: "#f0f0f0",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginRight: 14,
  },
  likeCount: {
    paddingHorizontal: 12,
    paddingTop: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "black",
  },
  caption: {
    paddingHorizontal: 12,
    paddingTop: 5,
    fontSize: 14,
    color: "#111",
    lineHeight: 20,
  },
  bold: {
    fontWeight: "700",
  },
  bodyText: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 8,
    fontSize: 13,
    color: "#555",
    lineHeight: 19,
  },

  /* ── Comments header ── */
  commentsDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e5e5",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
    backgroundColor: "#fafafa",
  },
  commentsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },
  center: {
    paddingVertical: 20,
    alignItems: "center",
  },
  errorText: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 13,
    color: "#e53935",
  },

  /* ── Comment rows ── */
  listContent: {
    paddingBottom: 12,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  localCommentRow: {
    backgroundColor: "#f0f7ff",
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    marginTop: 2,
  },
  commentAvatarPlaceholder: {
    width: 36,
    height: 36,
    marginRight: 10,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  commentContent: {
    flex: 1,
  },
  commentTopRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 3,
  },
  commentName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
  },
  commentEmail: {
    fontSize: 11,
    color: "#0095f6",
  },
  commentBody: {
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },
  localBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#0095f6",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
    marginTop: 4,
  },
  localBadgeText: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#f0f0f0",
    marginLeft: 58,
  },

  /* ── Comment input bar ── */
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ddd",
    backgroundColor: "white",
    gap: 10,
  },
  inputAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  input: {
    flex: 1,
    minHeight: 38,
    maxHeight: 100,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: "black",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },
  sendBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#0095f6",
    borderRadius: 18,
  },
  sendBtnDisabled: {
    backgroundColor: "#b3d9fb",
  },
  sendBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
});
