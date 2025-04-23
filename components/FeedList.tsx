import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native";
import FeedItem from "./FeedItem";
import { colors } from "@/constants";

const dummyData = [
  {
    id: 1,
    userId: 1,
    title: "더미제목",
    description: "더미내용",
    createdAt: "2025-04-02",
    author: {
      id: 1,
      nickname: "더미이름",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 2,
    userId: 1,
    title: "더미제목",
    description: "더미내용",
    createdAt: "2025-04-02",
    author: {
      id: 1,
      nickname: "더미이름",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
];
interface FeedListProps {}

function FeedList({}: FeedListProps) {
  return (
    <FlatList
      data={dummyData}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GREY_200,
    gap: 12,
  },
});

export default FeedList;
