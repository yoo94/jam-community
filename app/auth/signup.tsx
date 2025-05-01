import FixedBottomCTA from "@/components/FixedBottomCTA";
import { StyleSheet, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import EmailInput from "@/components/HookForm/EmailInput";
import PasswordInput from "@/components/HookForm/PasswordInput";
import PasswordConfirmInput from "@/components/HookForm/PasswordConfirmInput";

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignupScreen() {
  const sighnupForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const onsubmit = (FormValues: FormValues) => {
    console.log(FormValues);
  };
  return (
    <FormProvider {...sighnupForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput submitBehavior="submit" />
        <PasswordConfirmInput />
      </View>
      <FixedBottomCTA
        label="회원가입하기"
        onPress={sighnupForm.handleSubmit(onsubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
