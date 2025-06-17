import { baseUrls } from "@/api/axios";
import CustomButton from "@/components/CustomButton";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import IntroduceInput from "@/components/IntroduceInput";
import NicknameInput from "@/components/NicknameInput";
import { colors } from "@/constants";
import useAuth from "@/hooks/qureies/useAuth";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Image, Platform, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

type FormValues = {
  nickname: string;
  introduce: string;
};

export default function ProfileUpdateScreen() {
  const { userInfo, profileMutation } = useAuth();
  const profileForm = useForm<FormValues>({
    defaultValues: {
      nickname: userInfo.nickname,
      introduce: userInfo.introduce,
    },
  });

  const onSubmit = (formValues: FormValues) => {
    profileMutation.mutate(formValues, {
      onSuccess: () =>
        Toast.show({
          type: "success",
          text1: "저장되었습니다.",
        }),
    });
  };

  return (
    <FormProvider {...profileForm}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              userInfo.imageUri
                ? {
                    uri: `${
                      Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
                    }/${userInfo.imageUri}`,
                  }
                : require("@/assets/images/default-profile.png")
            }
            style={styles.avatar}
          />
          <CustomButton
            size="medium"
            variant="outlined"
            label="프로필이미지 변경"
            style={{ position: "absolute", right: 0, bottom: 0 }}
            onPress={() => router.push("/profile/avatar")}
          />
        </View>
        <View style={styles.inputContainer}>
          <NicknameInput />
          <IntroduceInput />
        </View>
      </View>

      <FixedBottomCTA
        label="저장"
        onPress={profileForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 16,
    position: "relative",
  },
  avatar: {
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GREY_500,
  },
  inputContainer: {
    gap: 16,
  },
});
