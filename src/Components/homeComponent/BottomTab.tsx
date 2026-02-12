import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const BottomTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="home" size={26} color="black" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon name="search-outline" size={26} color="black" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon name="add-circle-outline" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon name="play-outline" size={26} color="black" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon name="person-circle-outline" size={28} color="black" />
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
});
