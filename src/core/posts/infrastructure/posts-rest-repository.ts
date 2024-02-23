import { z } from "zod";
import axios, { AxiosError } from "axios";
import { PostsRepository } from "../domain/post-repository";
import { Task } from "data.task.ts";
import { DataError } from "../../shared/domain/data-error";
import { Post } from "../domain/post";
import { pipe } from "ramda";
import { delay } from "../../shared/functions";

export const postsSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export function makePostsRestRepository(): PostsRepository {
  const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  return {
    getByUserId: (userId) =>
      Task.fromLazyPromise(() => delay(1500))
        .chain(() =>
          Task.fromLazyPromise(() => client.get(`/users/${userId}/posts`))
        )
        .rejectMap(
          pipe(
            (ex) =>
              axios.isAxiosError(ex) ? ex : new AxiosError(JSON.stringify(ex)),
            (err: AxiosError): DataError => ({
              kind: "UnexpectedError",
              error: new Error(`HTTP_ERROR: ${err.message}`),
            })
          )
        )
        .chain(({ data }): Task<DataError, Post[]> => {
          const parsed = z.array(postsSchema).safeParse(data);
          return parsed.success
            ? Task.of(parsed.data)
            : Task.rejected({
                kind: "UnexpectedError",
                error: new Error(`HTTP_ERROR: Invalid POST response schema.`),
              });
        }),
  };
}
