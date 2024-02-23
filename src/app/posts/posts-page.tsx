import { useEffect, type FC } from "react";
import { match } from "ts-pattern";
import { Post } from "../../core/posts/domain/post";
import { PostState } from "../../core/posts/infrastructure/presentation/posts-state";
import { usePostsCtx } from "./posts-context";
import Sidebar from "./sidebar";

function PostsPage() {
  const { state, getByUserId } = usePostsCtx();

  useEffect(() => {
    getByUserId(1);
  }, []);

  return (
    <div className="flex">
      <div className="basis-3/4">
        <PostsContent state={state} />
      </div>
      <div className="divider divider-horizontal"></div>

      <div className="basis-1/4">
        <Sidebar />
      </div>
    </div>
  );
}

const PostsContent: FC<{ state: PostState }> = ({ state }) => {
  return (
    <div className="mx-auto w-[80%]">
      {match(state)
        .with({ kind: "post:idle" }, () => <div>No data</div>)
        .with({ kind: "post:loading" }, () => (
          <div className="flex justify-center items-center">
            <span className="loading loading-infinity loading-lg" />
          </div>
        ))
        .with({ kind: "post:error" }, (st) => (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! {st.errMsg}</span>
          </div>
        ))
        .with({ kind: "post:ready" }, { kind: "post:refetching" }, (st) => (
          <div className="flex flex-col">
            <h2 className="h-8">
              Got <b>{st.totalPosts}</b> total posts:
              {st.kind === "post:refetching" && (
                <span className="loading loading-dots loading-md" />
              )}
            </h2>
            <div className="divider"></div>
            {st.posts.map((p) => (
              <PostItem key={p.id} post={p} />
            ))}
          </div>
        ))
        .exhaustive()}
    </div>
  );
};

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="card w-[100%] bg-base-100 shadow-xl m-2">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default PostsPage;
