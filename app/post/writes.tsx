import DescriptionInput from "@/components/HookForm/DescriptionInput";
import TitleInput from "@/components/HookForm/TitleInput";
import { colors } from "@/constants";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";

interface writesProps {
  title: string;
  description: string;
}

function PostWriteScreen() {
  const postForm = useForm<writesProps>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  return (
    <View style={styles.container}>
      <FormProvider {...postForm}>
        <TitleInput></TitleInput>
        <DescriptionInput></DescriptionInput>
      </FormProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { margin: 16, gap: 16 },
});
export default PostWriteScreen;
