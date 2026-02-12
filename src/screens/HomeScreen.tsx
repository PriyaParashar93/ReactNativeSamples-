import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PostItem from "../Components/homeComponent/PostItem";
import BottomTab from "../Components/homeComponent/BottomTab";
import StoryItem from "../Components/homeComponent/StoryItem";
import { SafeAreaView } from "react-native-safe-area-context";

const stories = [
  {
    id: "1",
    name: "Tu historia",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    isMyStory: true,
  },
  {
    id: "2",
    name: "beiart",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    name: "sunflower",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "4",
    name: "anais",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

const posts = [
  {
    id: "1",
    username: "raul_marin",
    userImage: "https://randomuser.me/api/portraits/men/11.jpg",
    postImage: "https://picsum.photos/600/600?random=1",
  },
  {
    id: "2",
    username: "raul_marin",
    userImage: "https://randomuser.me/api/portraits/men/11.jpg",
    postImage: "https://picsum.photos/600/600?random=2",
  },
];

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>

        {/* <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerBtn}>
            <Icon name="heart-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerBtn}>
            <Icon name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
        </View> */}
      </View>

      {/* Feed */}
      <FlatList
        ListHeaderComponent={
          <View style={styles.storyContainer}>
            <FlatList
              data={stories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <StoryItem
                  name={item.name}
                  image={item.image}
                  isMyStory={item.isMyStory}
                />
              )}
            />
          </View>
        }
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem
            username={item.username}
            userImage={item.userImage}
            postImage={item.postImage}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Tab */}
      <BottomTab />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerBtn: {
    marginLeft: 15,
  },
  storyContainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
});
