import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import useUploadImages from "@/hooks/qureies/useUploadImages";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getFormDataImages } from "@/utills/image";

interface PostWriteFooterProps {}

function PostWriteFooter({}: PostWriteFooterProps) {
  const inset = useSafeAreaInsets();
  const uploadImages = useUploadImages();

  const handleOpenImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
    });
    if (result.canceled) {
      return;
    }
    const formData = getFormDataImages("images", result.assets);
    uploadImages.mutate(formData, {
      onSuccess: (data) => {
        console.log("Image upload success", data);
      },
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
        <Ionicons name={"camera"} size={20} color={colors.BLACK} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GREY_300,
    flexDirection: "row",
    gap: 10,
  },
  footerIcon: {
    backgroundColor: colors.GREY_100,
    padding: 10,
    borderRadius: 5,
  },
});

export default PostWriteFooter;
