import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import InputField from "../InputField";

function PasswordConfirmInput() {
  const { control, getValues } = useFormContext(); //useform에서 관리하는 control 객체와 getValues 함수
  return (
    <Controller
      name="passwordConfirm" //useform에서 관리하는 input 필드 이름
      control={control} //useform에서 관리하는 control 객체
      rules={{
        required: "이전에 입력한 비밀번호를 입력해주세요.", //useform에서 관리하는 input 필드의 유효성 검사 규칙
        validate: {
          passwordMatch: (value) => {
            const password = getValues("password"); //useform에서 관리하는 password 필드의 값
            return value === password || "비밀번호가 일치하지 않습니다."; //비밀번호 확인 필드의 값과 비밀번호 필드의 값이 일치하는지 검사
          },
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <View>
          <InputField
            ref={ref} //useform에서 관리하는 input 필드의 ref
            label="입력한 비밀번호 확인"
            onChangeText={onChange} //useform에서 관리하는 input 필드의 값 변경 함수
            value={value} //useform에서 관리하는 input 필드의 값
            error={error?.message} //useform에서 관리하는 input 필드의 에러 메시지
            secureTextEntry={true} //비밀번호 입력 필드
            returnKeyType="done" //완료 버튼
            textContentType="oneTimeCode" //비밀번호 자동 완성 방지
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({});
export default PasswordConfirmInput;
