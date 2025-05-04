import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import InputField from "../InputField";

function TitleInput() {
  const { control, setFocus } = useFormContext(); //useform에서 관리하는 control 객체

  return (
    <Controller
      name="title" //useform에서 관리하는 input 필드 이름
      control={control} //useform에서 관리하는 control 객체
      rules={{
        required: "제목을 입력해주세요.", //useform에서 관리하는 input 필드의 유효성 검사 규칙
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <InputField
            label="제목 입력해주세요."
            onChangeText={onChange} //useform에서 관리하는 input 필드의 값 변경 함수
            value={value} //useform에서 관리하는 input 필드의 값
            error={error?.message} //useform에서 관리하는 input 필드의 에러 메시지
            returnKeyType="next"
            submitBehavior="submit" //다음버튼 눌러도 텍스트창 안내려감
            onSubmitEditing={() => setFocus("Description")} //다음 필드로 포커스 이동
          />
        </View>
      )}
    />
  );
}

export default TitleInput;
