import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import InputField from "../InputField";

function DescriptionInput() {
  const { control } = useFormContext(); //useform에서 관리하는 control 객체

  return (
    <Controller
      name="Description" //useform에서 관리하는 input 필드 이름
      control={control} //useform에서 관리하는 control 객체
      rules={{
        required: "내용을 입력해주세요.", //useform에서 관리하는 input 필드의 유효성 검사 규칙
        minLength: {
          value: 5,
          message: "내용을 5자 이상으로 입력해주세요.", //useform에서 관리하는 input 필드의 유효성 검사 규칙
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <View>
          <InputField
            ref={ref}
            label="내용을 입력해주세요."
            onChangeText={onChange} //useform에서 관리하는 input 필드의 값 변경 함수
            value={value} //useform에서 관리하는 input 필드의 값
            error={error?.message} //useform에서 관리하는 input 필드의 에러 메시지
            returnKeyType="next"
            multiline={true} //다음버튼 눌러도 텍스트창 안내려감
          />
        </View>
      )}
    />
  );
}

export default DescriptionInput;
