import DescriptionInput from "@/components/HookForm/DescriptionInput";
import TitleInput from "@/components/HookForm/TitleInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { ImageUri } from "@/types";
import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import useGetPost from "@/hooks/queries/usePost";
import useUpdatePost from "@/hooks/queries/useUpdatePost";

interface FormValues {
  title: string;
  description: string;
  imageUris: ImageUri[];
}

function PostWriteScreen() {
  const { id } = useLocalSearchParams();
  const navigate = useNavigation();

  const { data: post } = useGetPost(Number(id));
  const updatePost = useUpdatePost();

  const postForm = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
    },
  });

  // post 데이터가 로드되면 폼을 재설정
  useEffect(() => {
    if (post) {
      postForm.reset({
        title: post.title,
        description: post.description,
        imageUris: [], // 필요하다면 post의 이미지 데이터로 업데이트
      });
    }
  }, [post]);
  const onSubmit = (formValues: FormValues) => {
    updatePost.mutate(
      { postId: Number(id), body: formValues },
      {
        onSuccess: () => router.back(),
      }
    );
  };
  useEffect(() => {
    navigate.setOptions({
      headerRight: () => (
        <CustomButton
          label="저장"
          size="medium"
          variant="standard"
          onPress={postForm.handleSubmit(onSubmit)}
        />
      ),
    });
  }, []);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <FormProvider {...postForm}>
        <TitleInput />
        <DescriptionInput />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: { margin: 16, gap: 16 },
});
export default PostWriteScreen;
