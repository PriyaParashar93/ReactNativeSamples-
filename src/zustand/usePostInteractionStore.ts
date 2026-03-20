import { create } from "zustand";

type BookmarkCollection = {
  id: string;
  name: string;
  postIds: string[];
};

type PostInteractionState = {
  collections: BookmarkCollection[];
  addToCollection: (collectionName: string, postId: string) => void;
  removeFromCollection: (collectionName: string, postId: string) => void;
  createCollection: (name: string) => void;
  getTotalSavedCount: () => number;
  isPostInCollection: (collectionName: string, postId: string) => boolean;
};

export const usePostInteractionStore = create<PostInteractionState>(
  (set, get) => ({
    collections: [
      { id: "default", name: "All Posts", postIds: [] },
    ],

    addToCollection: (collectionName, postId) =>
      set((state) => ({
        collections: state.collections.map((col) =>
          col.name === collectionName && !col.postIds.includes(postId)
            ? { ...col, postIds: [...col.postIds, postId] }
            : col
        ),
      })),

    removeFromCollection: (collectionName, postId) =>
      set((state) => ({
        collections: state.collections.map((col) =>
          col.name === collectionName
            ? { ...col, postIds: col.postIds.filter((id) => id !== postId) }
            : col
        ),
      })),

    createCollection: (name) =>
      set((state) => ({
        collections: [
          ...state.collections,
          { id: String(Date.now()), name, postIds: [] },
        ],
      })),

    getTotalSavedCount: () => {
      const allPostIds = new Set<string>();
      get().collections.forEach((col) =>
        col.postIds.forEach((id) => allPostIds.add(id))
      );
      return allPostIds.size;
    },

    isPostInCollection: (collectionName, postId) => {
      const col = get().collections.find((c) => c.name === collectionName);
      return col ? col.postIds.includes(postId) : false;
    },
  })
);
