import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, TextInputProps, View } from "react-native";
import InputField from "../InputField";

interface PasswordInputProps {
  submitBehavior?: TextInputProps["submitBehavior"]; //submitBehavior prop 추가
} //submitBehavior prop 추가

function PasswordInput({
  submitBehavior = "blurAndSubmit",
}: PasswordInputProps) {
  const { control, setFocus } = useFormContext(); //useform에서 관리하는 control 객체
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
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <View>
          <InputField
            ref={ref} //useform에서 관리하는 input 필드의 ref
            label="비밀번호를 입력해주세요"
            onChangeText={onChange} //useform에서 관리하는 input 필드의 값 변경 함수
            value={value} //useform에서 관리하는 input 필드의 값
            error={error?.message} //useform에서 관리하는 input 필드의 에러 메시지
            secureTextEntry={true} //비밀번호 입력 필드
            autoComplete="password" //비밀번호 자동 완성 방지
            returnKeyType="done" //완료 버튼
            textContentType="oneTimeCode" //비밀번호 자동 완성 방지
            submitBehavior={submitBehavior} //다음버튼 눌러도 텍스트창 안내려감
            onSubmitEditing={
              () => setFocus("passwordConfirm") //다음 필드로 포커스 이동
            }
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({});
export default PasswordInput;
