# Camera, Gallery Integration & Redux Persistence

##  Tasks Completed

###  1. BottomSheet Component - Image Picker
  - Created a reusable ImagePickerBottomSheet component using React Native Modal
  - Options: Take Photo (Camera) and Choose from Gallery
  - Slide-up animation with backdrop dismiss and cancel button

###  2. Camera & Gallery Permissions
  - Android: Runtime permissions using PermissionsAndroid (supports Android 10 & 13+)
-     - **CAMERA, READ_MEDIA_IMAGES, READ_EXTERNAL_STORAGE**
  - iOS: Added NSCameraUsageDescription and NSPhotoLibraryUsageDescription in Info.plist
  - Permission flow: Request permission → If denied with "Don't ask again" → Show Settings dialog via
  Linking.openSettings()

###  3. Profile Photo Update
  - Tapping the + badge on profile avatar opens the BottomSheet
  - Selected image updates the profile photo across the app in real-time
  - Profile photo is reflected in both ProfileScreen and BottomTab via Redux

###  4. Redux User Slice (userSlice)
  - Manages profilePhoto (URI) and bookmarks (array of saved posts)
  - Actions: setProfilePhoto, addBookmark, removeBookmark, toggleBookmark
  - Selectors: selectProfilePhoto, selectBookmarks, selectBookmarkCount, selectIsBookmarked

  ### 5. Redux Persist with AsyncStorage
  - Integrated redux-persist + @react-native-async-storage/async-storage
  - User slice (profile photo & bookmarks) persists across app kills
  - Wrapped app with PersistGate for rehydration on launch

###  6. Bookmark Integration
  - Saving a post dispatches toggleBookmark to Redux from both PostItem and PostDetailScreen
  - Bookmark count badge displayed on profile tab in BottomBar

###  Packages Added

  - react-native-image-picker
  - react-native-permissions
  - @react-native-async-storage/async-storage
  - redux-persist

  ### Bug Fixes

  - Fixed bookmark count doubling (was counting from both postSlice and userSlice)
  - Fixed state loss on app kill by persisting user data to AsyncStorage
