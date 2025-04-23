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
}

function InputField({ label, variant = "filled", ...props }: InputFeildProps) {
  return (
    <View>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={[styles.container, styles[variant]]}>
        <TextInput
          placeholderTextColor={colors.GREY_500}
          style={styles.input}
          {...props}
        />
      </View>
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
});

export default InputField;
