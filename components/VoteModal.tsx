import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import VoteInput from "./VoteInput";
import { VoteOption } from "@/types";

function VoteModal() {
  const { control, setValue } = useFormContext();
  const [voteOptions, isVoteOpen] = useWatch({
    control,
    name: ["voteOptions", "isVoteOpen"],
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  });
  const handleAppendVote = () => {
    const priorities = voteOptions.map(
      (vote: VoteOption) => vote.displayPriority
    );
    const nextPriority = Math.max(...priorities) + 1;
    append({ displayPriority: nextPriority, content: "" });
  };
  const handleSubmitVote = () => {
    if (voteOptions.length < 2) {
      Alert.alert("투표 항목 부족", "투표 항목은 최소 2개 이상이어야 합니다.");
      return;
    }
    setValue("isVoteOpen", false);
    setValue("isVoteAttached", true);
  };
  return (
    <Modal visible={isVoteOpen} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => setValue("isVoteOpen", false)}
            style={styles.headerLeft}
          >
            <Feather name="arrow-left" size={24} color={colors.BLACK} />
          </Pressable>
          <Text style={styles.headerTtile}>투표</Text>
          <Text style={styles.headerRight} onPress={handleSubmitVote}>
            첨부
          </Text>
        </View>
        <KeyboardAvoidingView contentContainerStyle={{ gap: 12, padding: 16 }}>
          <Pressable onPress={handleAppendVote} style={{ padding: 16 }}>
            <Text style={styles.addVoteText}>+ 항목추가</Text>
          </Pressable>
          {fields.map((field, index) => (
            <VoteInput
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTtile: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK,
  },
  headerRight: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addVoteText: {
    color: colors.GREY_500,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default VoteModal;
