import { baseUrls } from "@/api/axios";
import { ImageUri } from "@/types";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from "react-native";

interface imagePreviewListProps {
  imageUris: ImageUri[];
}

function imagePreviewList({ imageUris = [] }: imagePreviewListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {imageUris.map(({ uri }, index) => {
        const imageUri = `${
          Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
        }/${uri}`;
        return (
          <Pressable
            style={styles.imageContainer}
            key={uri + index}
            onPress={() =>
              router.push({
                pathname: "/imagePreview",
                params: { uri: imageUri },
              })
            }
          >
            <Image style={styles.image} source={{ uri: imageUri }} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 5, flexGrow: 1 },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default imagePreviewList;
