import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AuthRouter from "@/components/AuthRouter";
import { baseUrls } from "@/api/axios";
import { colors } from "@/constants";
import Tab from "@/components/Tab";
import { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import useAuth from "@/hooks/qureies/useAuth";
import PagerView from "react-native-pager-view";
import MyFeedList from "@/components/MyFeedList";
import LikedFeedList from "@/components/LikedFeedList";

export default function MyScreen() {
  const { userInfo } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const pagerRef = useRef<PagerView | null>(null);
  const handlePressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentTab(index);
  };

  return (
    <AuthRouter>
      <View style={styles.header}>
        <Image
          source={
            userInfo.imageUri
              ? {
                  uri: `${
                    Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
                  }/${userInfo.imageUri}`,
                }
              : require("@/assets/images/default-avatar.png")
          }
          style={styles.avatar}
        />
        <CustomButton
          size="medium"
          label="프로필 편집"
          style={{ position: "absolute", right: 16, bottom: 16 }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{userInfo.nickname}</Text>
          <Text style={styles.introduce}>{userInfo.introduce}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <Tab isActive={currentTab === 0} onPress={() => handlePressTab(0)}>
          게시물
        </Tab>
        <Tab isActive={currentTab === 1} onPress={() => handlePressTab(1)}>
          좋아한 게시물
        </Tab>
      </View>
      <PagerView
        ref={pagerRef}
        initialPage={0}
        style={{ flex: 1 }}
        onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
      >
        <MyFeedList key="1" />
        <LikedFeedList key="2" />
      </PagerView>
    </AuthRouter>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 154,
  },
  avatar: {
    position: "absolute",
    top: 77,
    left: 16,
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GREY_500,
  },
  container: {
    marginTop: 77,
  },
  profile: {
    padding: 16,
    gap: 16,
  },
  nickname: {
    fontSize: 24,
    fontWeight: "bold",
  },
  introduce: {
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: "row",
  },
});
