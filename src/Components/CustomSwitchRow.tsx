import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

type Props = {
  title: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
};

const CustomSwitchRow: React.FC<Props> = ({ title, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

export default CustomSwitchRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
    paddingHorizontal: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
