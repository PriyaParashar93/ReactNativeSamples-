import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  activeTab: number;
  onTabPress: (index: number) => void;
  profileImage?: string;
};

const BottomTab: React.FC<Props> = ({ activeTab, onTabPress, profileImage }) => {
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

      {/* Profile tab — shows avatar thumbnail when on profile tab */}
      <TouchableOpacity onPress={() => onTabPress(4)}>
        {profileImage && activeTab === 4 ? (
          <Image source={{ uri: profileImage }} style={styles.profileThumb} />
        ) : (
          <Icon
            name={activeTab === 4 ? "person-circle" : "person-circle-outline"}
            size={28}
            color="black"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;

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
  profileThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "black",
  },
});
