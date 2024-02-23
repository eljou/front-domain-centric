import { Ploc, makePloc } from "../../../shared/presentation/ploc";
import { GetPostsByUserUseCase } from "../../domain/usecases/get-posts-by-user";
import { PostState, postInitialState } from "./posts-state";

export type PostsPloc = Ploc<PostState> & {
  getByUserId: (userId: number) => void;
};

export function makePostsPloc(
  getPostsByUser: GetPostsByUserUseCase
): PostsPloc {
  const ploc = makePloc(postInitialState);

  return {
    ...ploc,

    getByUserId: (userId) => {
      Promise.resolve(ploc.state())
        .then((st) =>
          ploc.changeState(
            st.kind == "post:ready"
              ? { ...st, kind: "post:refetching" }
              : { kind: "post:loading" }
          )
        )
        .then(() => getPostsByUser(userId).toPromise())
        .then((res) =>
          ploc.changeState({
            kind: "post:ready",
            totalPosts: res.length,
            posts: res,
          })
        )
        .catch((err) =>
          ploc.changeState({ kind: "post:error", errMsg: err.error.message })
        );
    },
  };
}
