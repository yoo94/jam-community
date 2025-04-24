import { colors } from "@/constants";
import React from "react";
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
}

function InputField({
  label,
  variant = "filled",
  error = "",
  ...props
}: InputFeildProps) {
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
        ]}
      >
        <TextInput
          placeholderTextColor={colors.GREY_500}
          style={styles.input}
          {...props}
        />
      </View>
      {error.length > 0 && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.GREY_700, fontSize: 12, marginBottom: 5 },
  container: {
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  filled: {
    backgroundColor: colors.GREY_100,
  },
  outlined: {},
  standard: {},
  input: {
    fontSize: 16,
    padding: 6,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    marginTop: 5,
  },
  inputError: {
    backgroundColor: colors.RED_100,
  },
});

export default InputField;
