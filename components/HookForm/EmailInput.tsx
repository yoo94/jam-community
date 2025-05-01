import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import InputField from "../InputField";

function EmailInput() {
  const { control } = useFormContext(); //useform에서 관리하는 control 객체
  return (
    <Controller
      name="email" //useform에서 관리하는 input 필드 이름
      control={control} //useform에서 관리하는 control 객체
      rules={{
        required: "이메일을 입력해주세요.", //useform에서 관리하는 input 필드의 유효성 검사 규칙
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "이메일 형식이 아닙니다.", //useform에서 관리하는 input 필드의 유효성 검사 규칙
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <InputField
            label="이메일"
            placeholder="이메일을 입력해주세요."
            onChangeText={onChange} //useform에서 관리하는 input 필드의 값 변경 함수
            value={value} //useform에서 관리하는 input 필드의 값
            error={error?.message} //useform에서 관리하는 input 필드의 에러 메시지
            autoCapitalize="none" //대문자 자동 변환 방지
            autoComplete="email" //이메일 자동 완성 방지
            autoCorrect={false} //자동 교정 방지
            textContentType="emailAddress" //이메일 입력 필드
            keyboardType="email-address" //이메일 입력 필드
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({});

export default EmailInput;
