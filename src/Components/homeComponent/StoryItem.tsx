import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type Props = {
  name: string;
  image: string;
  isMyStory?: boolean;
};

const StoryItem: React.FC<Props> = ({ name, image, isMyStory }) => {
  return (
    <View style={styles.container}>
      <View style={styles.storyBorder}>
        <Image source={{ uri: image }} style={styles.image} />

        {isMyStory && <View style={styles.plusBadge} />}
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

export default StoryItem;

const styles = StyleSheet.create({
  container: {
    width: 75,
    alignItems: "center",
    marginHorizontal: 6,
  },
  storyBorder: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: "#ff0066",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  name: {
    marginTop: 4,
    fontSize: 12,
    color: "#222",
  },
  plusBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#0095f6",
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
