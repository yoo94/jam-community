import InputFeild from "@/components/InputFeild";
import React from "react";
import { StyleSheet, View } from "react-native";

function LoginScreen() {
  return (
    <View style={styles.container}>
      <InputFeild label={"이메일"} placeholder="이메일을 입력해주세요" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 16 },
});

export default LoginScreen;
