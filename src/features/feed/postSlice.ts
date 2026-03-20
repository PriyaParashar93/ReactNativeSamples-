import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ── Types ── */
type ApiPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type ApiComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
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

export type Comment = ApiComment & { isLocal?: boolean };

const USER_NAME = "raul_marin";
const USER_IMAGE = "https://randomuser.me/api/portraits/men/11.jpg";

/* ── Async Thunks ── */
export const fetchPosts = createAsyncThunk<FeedPost[]>(
  "posts/fetchPosts",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: ApiPost[] = await res.json();
    return data.map((post) => ({
      id: String(post.id),
      username: USER_NAME,
      userImage: USER_IMAGE,
      postImage: `https://picsum.photos/600/600?random=${post.id}`,
      title: post.title,
      body: post.body,
    }));
  }
);

export const fetchComments = createAsyncThunk<
  { postId: string; comments: Comment[] },
  string
>("posts/fetchComments", async (postId) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: ApiComment[] = await res.json();
  return { postId, comments: data };
});

/* ── State ── */
type PostState = {
  posts: FeedPost[];
  loading: boolean;
  error: string | null;
  likedPosts: Record<string, boolean>;
  savedPosts: Record<string, boolean>;
  likeCounts: Record<string, number>;
  comments: Record<string, Comment[]>;
  commentsLoading: Record<string, boolean>;
};

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  likedPosts: {},
  savedPosts: {},
  likeCounts: {},
  comments: {},
  commentsLoading: {},
};

/* ── Slice ── */
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string>) {
      const id = action.payload;
      const wasLiked = state.likedPosts[id] ?? false;
      state.likedPosts[id] = !wasLiked;
      const current = state.likeCounts[id] ?? 0;
      state.likeCounts[id] = wasLiked ? current - 1 : current + 1;
    },
    toggleSave(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.savedPosts[id] = !(state.savedPosts[id] ?? false);
    },
    addComment(
      state,
      action: PayloadAction<{ postId: string; comment: Comment }>
    ) {
      const { postId, comment } = action.payload;
      if (!state.comments[postId]) {
        state.comments[postId] = [];
      }
      state.comments[postId].push(comment);
    },
    initLikeCount(
      state,
      action: PayloadAction<{ postId: string; count: number }>
    ) {
      const { postId, count } = action.payload;
      if (state.likeCounts[postId] === undefined) {
        state.likeCounts[postId] = count;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch posts";
      })
      .addCase(fetchComments.pending, (state, action) => {
        state.commentsLoading[action.meta.arg] = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.commentsLoading[postId] = false;
        // Preserve local comments, replace API ones
        const localComments = (state.comments[postId] ?? []).filter(
          (c) => c.isLocal
        );
        state.comments[postId] = [...comments, ...localComments];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsLoading[action.meta.arg] = false;
      });
  },
});

export const { toggleLike, toggleSave, addComment, initLikeCount } =
  postSlice.actions;

/* ── Selectors ── */
export const selectAllPosts = (state: { posts: PostState }) =>
  state.posts.posts;
export const selectPostsLoading = (state: { posts: PostState }) =>
  state.posts.loading;
export const selectPostsError = (state: { posts: PostState }) =>
  state.posts.error;
export const selectPostById = (id: string) => (state: { posts: PostState }) =>
  state.posts.posts.find((p) => p.id === id);
export const selectIsLiked = (id: string) => (state: { posts: PostState }) =>
  state.posts.likedPosts[id] ?? false;
export const selectIsSaved = (id: string) => (state: { posts: PostState }) =>
  state.posts.savedPosts[id] ?? false;
export const selectLikeCount = (id: string) => (state: { posts: PostState }) =>
  state.posts.likeCounts[id] ?? 0;
export const selectCommentsByPostId =
  (id: string) => (state: { posts: PostState }) =>
    state.posts.comments[id] ?? [];
export const selectCommentsLoading =
  (id: string) => (state: { posts: PostState }) =>
    state.posts.commentsLoading[id] ?? false;
export const selectSavedPostsCount = (state: { posts: PostState }) =>
  Object.values(state.posts.savedPosts).filter(Boolean).length;

export default postSlice.reducer;
