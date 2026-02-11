import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  title: string;
  onPress: () => void;
  width?: number | string;
  type?: "filled" | "outlined";
  iconName?: string;
  style?: ViewStyle;
};

const CustomButton = (props: Props)  => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      
      style={[
        styles.button,
        props.type === "filled" ? styles.filledButton : styles.outlinedButton,
        props.style,
      ]}
    >
      <Text
        style={[
          styles.text,
          props.type === "outlined" ? styles.outlinedText : styles.filledText,
        ]}
      >
        {props.title}
      </Text>

      {props.iconName && (
        <Icon
          name={props.iconName}
          size={20}
          color={props.type === "outlined" ? "#2F6BFF" : "#fff"}
          style={{ marginLeft: 10 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  filledButton: {
    backgroundColor: "#2F6BFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  outlinedButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#2F6BFF",
  },

  text: {
    fontSize: 16,
    fontWeight: "500",
  },

  filledText: {
    color: "#fff",
  },

  outlinedText: {
    color: "#2F6BFF",
  },
});
