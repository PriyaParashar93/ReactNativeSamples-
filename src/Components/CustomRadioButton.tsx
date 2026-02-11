import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
};

const CustomRadioButton: React.FC<Props> = ({ label, selected, onPress,style }) => {
  return (
    <TouchableOpacity style={[styles.row,style]} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.outerCircle, selected && styles.outerSelected]}>
        {selected && <View style={styles.innerCircle} />}
      </View>

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  outerCircle: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#2F6BFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  outerSelected: {
    borderWidth: 2,
  },

  innerCircle: {
    width: 12,
    height: 12,
    backgroundColor: "#2F6BFF",
    borderRadius: 50,
  },

  label: {
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
});
