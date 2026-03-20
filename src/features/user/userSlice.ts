import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store/store';

type BookmarkedPost = {
  id: string;
  postImage: string;
  title: string;
};

type UserState = {
  profilePhoto: string;
  bookmarks: BookmarkedPost[];
};

const DEFAULT_PROFILE_IMAGE =
  'https://randomuser.me/api/portraits/women/44.jpg';

const initialState: UserState = {
  profilePhoto: DEFAULT_PROFILE_IMAGE,
  bookmarks: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfilePhoto(state, action: PayloadAction<string>) {
      state.profilePhoto = action.payload;
    },
    addBookmark(state, action: PayloadAction<BookmarkedPost>) {
      if (!state.bookmarks.find(b => b.id === action.payload.id)) {
        state.bookmarks.push(action.payload);
      }
    },
    removeBookmark(state, action: PayloadAction<string>) {
      state.bookmarks = state.bookmarks.filter(b => b.id !== action.payload);
    },
    toggleBookmark(state, action: PayloadAction<BookmarkedPost>) {
      const exists = state.bookmarks.find(b => b.id === action.payload.id);
      if (exists) {
        state.bookmarks = state.bookmarks.filter(
          b => b.id !== action.payload.id,
        );
      } else {
        state.bookmarks.push(action.payload);
      }
    },
  },
});

export const {setProfilePhoto, addBookmark, removeBookmark, toggleBookmark} =
  userSlice.actions;

/* ── Selectors ── */
export const selectProfilePhoto = (state: RootState) =>
  state.user.profilePhoto;
export const selectBookmarks = (state: RootState) => state.user.bookmarks;
export const selectBookmarkCount = (state: RootState) =>
  state.user.bookmarks.length;
export const selectIsBookmarked = (id: string) => (state: RootState) =>
  state.user.bookmarks.some(b => b.id === id);

export default userSlice.reducer;
