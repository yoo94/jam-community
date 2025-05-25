import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import InputField from "./InputField";
import { useFormContext, useWatch } from "react-hook-form";
import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

function VoteAttached() {
  const { control, setValue, resetField } = useFormContext();
  const [isVoteAttached] = useWatch({ control, name: ["isVoteAttached"] });

  return (
    <>
      {isVoteAttached && (
        <InputField
          label={""}
          variant="outlined"
          editable={false}
          value="투표가 첨부 되었습니다."
          rightChild={
            <Pressable
              onPress={() => {
                setValue("isVoteAttached", false);
                resetField("voteOptions");
              }}
              style={{ padding: 8 }}
            >
              <Ionicons name="close" size={20} color={colors.BLACK} />
            </Pressable>
          }
        ></InputField>
      )}
    </>
  );
}

const styles = StyleSheet.create({});

export default VoteAttached;
