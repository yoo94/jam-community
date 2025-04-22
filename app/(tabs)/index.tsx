import FeedItem from "@/components/FeedItem";
import { SafeAreaView } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <FeedItem
        post={{
          id: 1,
          userId: 1,
          title: "더미제목",
          description: "더미내용",
          createdAt: "",
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
        }}
      />
    </SafeAreaView>
  );
}
