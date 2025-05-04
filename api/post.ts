import axiosInstance from "./axios";
import { CreatePostDto, Post } from "../types";
async function createPost(body: CreatePostDto) {
  const { data } = await axiosInstance.post("posts", body);
  return data;
}
async function getPosts(page = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`posts?page=${page}`);
  return data;
}

async function deletePost(postId: number): Promise<number> {
  const { data } = await axiosInstance.delete(`/posts/${postId}`);
  return data;
}

export { createPost, getPosts, deletePost };
