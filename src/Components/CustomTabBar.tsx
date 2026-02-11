import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

type Props = {
  tabs: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const CustomTabBar: React.FC<Props> = ({ tabs, selectedIndex, onSelect }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tabs.map((tab, index) => {
        const isSelected = selectedIndex === index;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.tab, isSelected && styles.selectedTab]}
            onPress={() => onSelect(index)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isSelected && styles.selectedText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,  
    height: 40,  
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginRight: 10,
  },

  selectedTab: {
    backgroundColor: "#E3EDFF",
  },

  tabText: {
    fontSize: 14,
    color: "#444",
  },

  selectedText: {
    color: "#2F6BFF",
    fontWeight: "bold",
  },
});
