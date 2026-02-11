import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  isRoundedBorder?: boolean;
  iconName?: string;

};

const CustomInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  error,
  isRoundedBorder,
  iconName = "person-outline",
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, error ? styles.errorBorder : styles.normalBorder,  { borderRadius: isRoundedBorder ? 25 : 10 }]}>
        
        {/* ✅ Left Icon */}
        <Icon name={iconName} size={18} color={error ? "red" : "gray"} />

        {/* ✅ TextInput */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
        />
      </View>

      {/* ✅ Error Text */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
        width: "100%",

  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 45,
        width: "100%",

  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  normalBorder: {
    borderColor: "gray",
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    marginTop: 5,
    color: "red",
    fontSize: 14,
  },
});
