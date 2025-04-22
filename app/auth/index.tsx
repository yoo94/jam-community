import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface indexProps {}

function AuthScreen({}: indexProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton label="이메일 로그인" />
        <Link style={styles.signupText} href={"/"}>
          이메일로 가입하기
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: { width: 130, height: 130 },
  imageContainer: { justifyContent: "center", alignItems: "center", flex: 2 },
  signupText: {
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
});

export default AuthScreen;
