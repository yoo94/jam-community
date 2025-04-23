import FixedBottomCTA from "@/components/FixedBottomCTA";
import CustomButton from "@/components/CustomButton";
import InputFeild from "@/components/InputFeild";
import { colors } from "@/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function LoginScreen() {
  return (
    <>
      <View style={styles.container}>
        <InputFeild label={"이메일"} placeholder="이메일을 입력해주세요" />
        <InputFeild label={"비밀번호"} placeholder="비밀번호를 입력해주세요" />
      </View>
      <FixedBottomCTA label="로그인하기" onPress={() => {}} />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 16, gap: 16 },
});

export default LoginScreen;
