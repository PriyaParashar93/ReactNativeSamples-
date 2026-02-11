import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
    
type Props = {
  label: string;
  checked: boolean;
  onPress: () => void;
  style?: ViewStyle;
};

const CustomCheckBox: React.FC<Props> = ({ label, checked, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.row, style]} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.box, checked && styles.checkedBox]}>
        {checked && <Icon name="checkmark" size={16} color="white" />}
      </View>

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  box: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#2F6BFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  checkedBox: {
    backgroundColor: "#2F6BFF",
  },

  label: {
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
});
