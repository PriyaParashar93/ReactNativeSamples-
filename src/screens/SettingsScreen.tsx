import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  onNavigate: (screen: "profile") => void;
};

const options = [
  { id: "profile", label: "Profile", icon: "person-outline", color: "#222" },
  { id: "faq", label: "FAQ", icon: "help-circle-outline", color: "#222" },
  { id: "logout", label: "Logout", icon: "log-out-outline", color: "#e53935" },
] as const;

const SettingsScreen: React.FC<Props> = ({ onNavigate }) => {
  const handlePress = (id: string) => {
    if (id === "profile") {
      onNavigate("profile");
    } else if (id === "faq") {
      Alert.alert(
        "FAQ",
        "Frequently Asked Questions\n\n• How do I change my password?\n  Go to Profile → Edit → Security.\n\n• How do I delete my account?\n  Contact support.\n\n• Can I download my data?\n  Yes, from Settings → Privacy.",
        [{ text: "OK" }]
      );
    } else if (id === "logout") {
      Alert.alert("Logout", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => {} },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Options */}
      <View style={styles.list}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.row,
              index < options.length - 1 && styles.rowBorder,
            ]}
            activeOpacity={0.7}
            onPress={() => handlePress(option.id)}
          >
            <View style={styles.rowLeft}>
              <View
                style={[
                  styles.iconWrap,
                  option.id === "logout" && styles.iconWrapRed,
                ]}
              >
                <Icon name={option.icon} size={22} color={option.color} />
              </View>
              <Text
                style={[styles.label, option.id === "logout" && styles.labelRed]}
              >
                {option.label}
              </Text>
            </View>

            {option.id !== "logout" && (
              <Icon name="chevron-forward-outline" size={18} color="#aaa" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  titleRow: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "black",
  },
  list: {
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapRed: {
    backgroundColor: "#fdecea",
  },
  label: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  labelRed: {
    color: "#e53935",
  },
});
