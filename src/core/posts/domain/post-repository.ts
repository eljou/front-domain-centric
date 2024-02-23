import { Task } from "data.task.ts";
import { DataError } from "../../shared/domain/data-error";
import { Post } from "./post";

export interface PostsRepository {
  getByUserId: (userId: number) => Task<DataError, Post[]>;
}
