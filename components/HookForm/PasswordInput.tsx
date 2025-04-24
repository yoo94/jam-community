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
      render={({ field: { onChange, value } }) => (
        <View>
          <InputField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            onChangeText={onChange} //useform에서 관리하는 input 필드의 값 변경 함수
            value={value} //useform에서 관리하는 input 필드의 값
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({});
export default PasswordInput;
