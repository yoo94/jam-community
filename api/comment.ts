import { CreateCommentDto } from "@/types";
import axiosInstance from "./axios";
async function CreateComment(body: CreateCommentDto) {
  const { data } = await axiosInstance.post("/comments", body);
  return data;
}

async function DeleteComment(id: number) {
  const { data } = await axiosInstance.delete(`/comments/${id}`);
  return data;
}

export { CreateComment, DeleteComment };
