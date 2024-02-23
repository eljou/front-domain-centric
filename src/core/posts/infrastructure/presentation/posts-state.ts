import { Post } from "../../domain/post";

type PostsIdle = { kind: "post:idle" };
type PostsLoading = { kind: "post:loading" };
type PostsReady = {
  kind: "post:ready" | "post:refetching";
  posts: Post[];
  totalPosts: number;
};
type PostsError = { kind: "post:error"; errMsg: string };

export type PostState = PostsIdle | PostsLoading | PostsReady | PostsError;

export const postInitialState: PostState = { kind: "post:idle" };
