import DescriptionInput from "@/components/HookForm/DescriptionInput";
import TitleInput from "@/components/HookForm/TitleInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import useCreatePost from "@/hooks/qureies/useCreatePost";
import { ImageUri, VoteOption } from "@/types";
import CustomButton from "@/components/CustomButton";
import { useNavigation } from "expo-router";
import PostWriteFooter from "@/components/PostWriteFooter";
import ImagePreviewList from "@/components/imagePreviewList";
import VoteModal from "@/components/VoteModal";
import VoteAttached from "@/components/VoteAttached";

interface FormValues {
  title: string;
  description: string;
  imageUris: ImageUri[];
  isVoteOpen?: boolean;
  voteOptions: VoteOption[];
  isVoteAttached?: boolean;
}

function PostWriteScreen() {
  const createPost = useCreatePost();
  const navigate = useNavigation();
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
      isVoteOpen: false,
      voteOptions: [{ displayPriority: 0, content: "" }],
      isVoteAttached: false,
    },
  });
  const onSubmit = (formValues: FormValues) => {
    createPost.mutate(formValues);
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
        <VoteAttached />
        <ImagePreviewList imageUris={postForm.watch().imageUris} />
      </KeyboardAwareScrollView>
      <PostWriteFooter />
      <VoteModal />
    </FormProvider>
  );
}
const styles = StyleSheet.create({
  container: { margin: 16, gap: 16 },
});
export default PostWriteScreen;
