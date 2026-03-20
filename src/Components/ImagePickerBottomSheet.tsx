import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary, ImagePickerResponse} from 'react-native-image-picker';

interface ImagePickerBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (uri: string) => void;
}

const showSettingsDialog = (permissionName: string) => {
  Alert.alert(
    `${permissionName} Permission Required`,
    `You have denied ${permissionName.toLowerCase()} permission. Please go to Settings and enable it manually.`,
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Open Settings', onPress: () => Linking.openSettings()},
    ],
  );
};

const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return true;
  }
  try {
    const alreadyGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (alreadyGranted) {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera to take photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      showSettingsDialog('Camera');
    }

    return false;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const requestGalleryPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return true;
  }
  try {
    const androidVersion = Number(Platform.Version);
    const permission =
      androidVersion >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const alreadyGranted = await PermissionsAndroid.check(permission);
    if (alreadyGranted) {
      return true;
    }

    const granted = await PermissionsAndroid.request(permission, {
      title: 'Gallery Permission',
      message: 'This app needs access to your photos.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      showSettingsDialog('Gallery');
    }

    return false;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const handleResponse = (
  response: ImagePickerResponse,
  onImageSelected: (uri: string) => void,
) => {
  if (response.didCancel) {
    return;
  }
  if (response.errorCode) {
    Alert.alert('Error', response.errorMessage || 'Something went wrong');
    return;
  }
  const uri = response.assets?.[0]?.uri;
  if (uri) {
    onImageSelected(uri);
  }
};

const ImagePickerBottomSheet: React.FC<ImagePickerBottomSheetProps> = ({
  visible,
  onClose,
  onImageSelected,
}) => {
  const handleCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return;
    }
    onClose();
    launchCamera(
      {mediaType: 'photo', quality: 0.8, saveToPhotos: true},
      response => handleResponse(response, onImageSelected),
    );
  };

  const handleGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      return;
    }
    onClose();
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.8},
      response => handleResponse(response, onImageSelected),
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Change Profile Photo</Text>

          <TouchableOpacity style={styles.option} onPress={handleCamera}>
            <View style={styles.iconCircle}>
              <Icon name="camera-outline" size={24} color="#0095f6" />
            </View>
            <Text style={styles.optionText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleGallery}>
            <View style={styles.iconCircle}>
              <Icon name="images-outline" size={24} color="#0095f6" />
            </View>
            <Text style={styles.optionText}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, styles.cancelOption]}
            onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ImagePickerBottomSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  cancelOption: {
    justifyContent: 'center',
    marginTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
    paddingTop: 18,
  },
  cancelText: {
    fontSize: 16,
    color: '#ed4956',
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
});
