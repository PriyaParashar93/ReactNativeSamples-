# Redux, Zustand & State Management

 ## Tasks Completed

 ### 1. Redux Toolkit Integration
  - Configured Redux store using @reduxjs/toolkit at src/store/store.ts
  - Wrapped the app with <Provider> in index.js

###  2. Post Slice (postSlice)
  - Async thunks: fetchPosts and fetchComments from JSONPlaceholder API
  - Reducers: toggleLike, toggleSave, addComment, initLikeCount
  - Selectors: selectAllPosts, selectIsLiked, selectIsSaved, selectLikeCount, selectSavedPostsCount, etc.
  - Manages: posts list, loading/error states, liked/saved posts, like counts, and comments

###  3. Zustand Store (usePostInteractionStore)
  - Bookmark collections system with addToCollection, removeFromCollection, createCollection
  - Default "All Posts" collection
  - getTotalSavedCount using Set-based deduplication across collections
  - isPostInCollection checker

###  4. Feed Screen with Redux
  - FeedScreen fetches posts via dispatch(fetchPosts()) on mount
  - Handles loading spinner and error states
  - Each PostItem uses Redux for like/save state and Zustand for bookmark collections

##  5. Post Detail Screen
  - Displays full post with comments fetched from API via fetchComments
  - Like, save, and comment functionality wired to Redux
  - Add local comments with addComment action
  - Keyboard-aware input with auto-scroll to latest comment

 ### 6. Navigation & Screen Architecture
  - BottomTab component with 5 tabs: Home, Reels, New Post, Search, Profile
  - HomeScreen manages screen routing with animated side drawer
  - Drawer navigation to Profile and Settings screens
  - Tab-to-screen mapping with header updates

 ### 7. Profile Screen
  - Instagram-style profile layout with avatar, stats (posts, followers, following)
  - Story highlights section with "New" highlight option
  - Grid/Reels/Tagged tab selector
  - Photo grid with pin and video overlays
  - Saved count from Zustand store

 ### 8. Settings Screen
  - Navigation to Profile from Settings

###  Packages Added

  - @reduxjs/toolkit
  - react-redux
  - zustand
