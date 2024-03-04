import type { FC } from "react";
import { match } from "ts-pattern";
import { PostState } from "../../core/posts/infrastructure/presentation/posts-state";

const Sidebar: FC<{ state: PostState }> = (props) => {
  const { state } = props;

  return (
    <div>
      <h3>Titles:</h3>
      {match(state)
        .with({ kind: "post:error" }, { kind: "post:idle" }, () => (
          <div>No data</div>
        ))
        .with({ kind: "post:loading" }, () => (
          <div className="flex justify-center items-center">
            <span className="loading loading-bars loading-lg" />
          </div>
        ))
        .with({ kind: "post:ready" }, { kind: "post:refetching" }, (st) =>
          st.posts.map((p) => (
            <p
              key={p.id}
              className="border border-t-0 border-l-0 border-r-0 border-b-orange-600 mb-2"
            >
              {p.title}
            </p>
          ))
        )
        .exhaustive()}
    </div>
  );
};
export default Sidebar;
