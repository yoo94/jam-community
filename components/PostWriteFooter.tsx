import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import useUploadImages from "@/hooks/qureies/useUploadImages";
import { getFormDataImages } from "@/utills/image";
import { useFormContext, useWatch } from "react-hook-form";

interface PostWriteFooterProps {}

function PostWriteFooter({}: PostWriteFooterProps) {
  const inset = useSafeAreaInsets();
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({
    control,
    name: ["imageUris"],
  });

  const uploadImages = useUploadImages();

  const addImageUris = (uris: string[]) => {
    if (uris.length + imageUris.length > 5) {
      Alert.alert("이미지 개수 초과", "사진은 최대 5장까지 업로드 가능합니다.");
      return;
    }
    if (imageUris.length === 0) {
    }
    setValue("imageUris", [...uris.map((uri) => ({ uri })), ...imageUris]);
  };

  const handleOpenImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
    });
    if (result.canceled) {
      return;
    }
    const formData = getFormDataImages("images", result.assets);
    uploadImages.mutate(formData, {
      onSuccess: (data: string[]) => addImageUris(data),
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
