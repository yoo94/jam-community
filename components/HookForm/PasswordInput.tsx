import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import InputField from "../InputField";

function PasswordInput() {
  const { control } = useFormContext(); //useform에서 관리하는 control 객체
  return (
    <Controller
      name="password" //useform에서 관리하는 input 필드 이름
      control={control} //useform에서 관리하는 control 객체
      rules={{
        required: "비밀번호를 입력해주세요.", //useform에서 관리하는 input 필드의 유효성 검사 규칙
        pattern: {
          value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,15}$/,
          message:
            "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자리 이상 15자리 이하여야 하며 공백을 포함할 수 없습니다.", //useform에서 관리하는 input 필드의 유효성 검사 규칙
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <InputField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            onChangeText={onChange} //useform에서 관리하는 input 필드의 값 변경 함수
            value={value} //useform에서 관리하는 input 필드의 값
            error={error?.message} //useform에서 관리하는 input 필드의 에러 메시지
            secureTextEntry={true} //비밀번호 입력 필드
            autoCapitalize="none" //대문자 자동 변환 방지
            autoComplete="password" //비밀번호 자동 완성 방지
            autoCorrect={false} //자동 교정 방지
            textContentType="newPassword" //비밀번호 입력 필드
            returnKeyType="done" //완료 버튼
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({});
export default PasswordInput;
