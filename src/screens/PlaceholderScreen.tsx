import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
};

const PlaceholderScreen: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default PlaceholderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "black",
  },
});
