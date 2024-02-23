import { PropsWithChildren } from "react";
import { PostState } from "../../core/posts/infrastructure/presentation/posts-state";
import { dependenciesLocator } from "../../core/shared/dependecies";
import { createContext } from "../shared/context";
import { usePlocState } from "../shared/use-ploc-state";

const postsPloc = dependenciesLocator.providePostsPloc();

const [PostsCtx, useCtx] = createContext<PostState>();

export const usePostsCtx = () => {
  const state = useCtx();

  return { state, getByUserId: postsPloc.getByUserId };
};

export function PostsProvider({ children }: PropsWithChildren) {
  const state = usePlocState(postsPloc);

  return <PostsCtx.Provider value={state}>{children}</PostsCtx.Provider>;
}
