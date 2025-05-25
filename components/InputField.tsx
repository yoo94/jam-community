import { colors } from "@/constants";
import React, { ForwardedRef, forwardRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TextInputProps,
} from "react-native";

interface InputFeildProps extends TextInputProps {
  label: string;
  variant?: "filled" | "outlined" | "standard";
  error?: string;
  rightChild?: React.ReactNode;
}

function InputField(
  {
    label,
    variant = "filled",
    error = "",
    rightChild = null,
    ...props
  }: InputFeildProps,
  ref?: ForwardedRef<TextInput>
) {
  return (
    <View>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View
        style={[
          styles.container,
          styles[variant],
          Boolean(error) && styles.inputError,
          props.multiline && styles.multiLine,
        ]}
      >
        <TextInput
          ref={ref}
          placeholder={label}
          placeholderTextColor={colors.GREY_500}
          style={[styles.input, styles[`${variant}Text`]]}
          autoCapitalize="none" //대문자 자동 변환 방지
          spellCheck={false}
          autoCorrect={false} //자동 교정 방지
          {...props}
        />
        {rightChild}
      </View>
      {error.length > 0 && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 12,
    color: colors.GREY_700,
    marginBottom: 5,
  },
  filled: {
    backgroundColor: colors.GREY_100,
  },
  standard: {
    borderWidth: 1,
    borderColor: colors.GREY_200,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
  },
  standardText: {
    color: colors.BLACK,
  },
  outlinedText: {
    color: colors.ORANGE_600,
    fontWeight: "bold",
  },
  filledText: {
    color: colors.BLACK,
  },
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  error: {
    fontSize: 12,
    marginTop: 5,
    color: colors.RED_500,
  },
  inputError: {
    backgroundColor: colors.RED_100,
  },
  multiLine: {
    alignItems: "flex-start",
    paddingVertical: 10,
    height: 200,
  },
});

export default forwardRef(InputField);
