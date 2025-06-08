import axiosInstance from "./axios";
import { CreatePostDto, CreateVoteDto, Post, VoteOption } from "../types";
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

async function getPost(postId: number): Promise<Post> {
  const { data } = await axiosInstance.get(`posts/${postId}`);
  return data;
}
async function getMyPosts(page = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/posts/my?page=${page}`);

  return data;
}

async function getLikedPosts(page = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/likes?page=${page}`);

  return data;
}

type UpdatePostDto = {
  postId: number;
  body: CreatePostDto;
};
async function updatePost({ postId, body }: UpdatePostDto): Promise<number> {
  const { data } = await axiosInstance.patch(`posts/${postId}`, body);
  return data;
}

async function createVote({
  postId,
  voteOptionId,
}: CreateVoteDto): Promise<{ postId: number; voteOption: VoteOption }> {
  const { data } = await axiosInstance.post(
    `/posts/${postId}/vote/${voteOptionId}`
  );

  return data;
}

async function likePost(id: number): Promise<number> {
  const { data } = await axiosInstance.post(`/likes/${id}`);

  return data;
}

export {
  createPost,
  getPosts,
  getMyPosts,
  getLikedPosts,
  deletePost,
  getPost,
  updatePost,
  createVote,
  likePost,
};
