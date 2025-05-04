import DescriptionInput from "@/components/HookForm/DescriptionInput";
import TitleInput from "@/components/HookForm/TitleInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import useCreatePost from "@/hooks/queries/useCreatePost";
import { ImageUri } from "@/types";
import CustomButton from "@/components/CustomButton";
import { useNavigation } from "expo-router";

interface FormValues {
  title: string;
  description: string;
  imageUris: ImageUri[];
}

function PostWriteScreen() {
  const createPost = useCreatePost();
  const navigate = useNavigation();
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
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
