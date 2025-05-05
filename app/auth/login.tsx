import FixedBottomCTA from "@/components/FixedBottomCTA";
import { StyleSheet, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import EmailInput from "@/components/HookForm/EmailInput";
import PasswordInput from "@/components/HookForm/PasswordInput";
import PasswordConfirmInput from "@/components/HookForm/PasswordConfirmInput";
import useAuth from "@/hooks/qureies/useAuth";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { loginMutation } = useAuth();

  const loginForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onsubmit = (FormValues: FormValues) => {
    const { email, password } = FormValues;
    loginMutation.mutate({
      email,
      password,
    });
  };
  return (
    <FormProvider {...loginForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedBottomCTA
        label="로그인하기"
        onPress={loginForm.handleSubmit(onsubmit)}
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
