import DescriptionInput from "@/components/HookForm/DescriptionInput";
import TitleInput from "@/components/HookForm/TitleInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { ImageUri } from "@/types";
import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import useGetPost from "@/hooks/qureies/usePost";
import useUpdatePost from "@/hooks/qureies/useUpdatePost";
import ImagePreviewList from "@/components/imagePreviewList";
import PostWriteFooter from "@/components/PostWriteFooter";

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
        imageUris: post.imageUris, // 필요하다면 post의 이미지 데이터로 업데이트
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
    <FormProvider {...postForm}>
      <KeyboardAwareScrollView style={styles.container}>
        <TitleInput />
        <DescriptionInput />
        <ImagePreviewList imageUris={postForm.watch().imageUris} />
      </KeyboardAwareScrollView>
      <PostWriteFooter />
    </FormProvider>
  );
}
const styles = StyleSheet.create({
  container: { margin: 16, gap: 16 },
});
export default PostWriteScreen;
