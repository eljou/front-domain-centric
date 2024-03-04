import { Task } from "data.task.ts";
import { DataError } from "../../shared/domain/data-error";
import { User } from "./user";

type BackendUser = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  clientAppIds: string[];
};

export type LoginService = (
  email: string,
  password: string
) => Task<DataError, { user: BackendUser; accessToken: string }>;

export type RegisterService = (
  username: string,
  email: string,
  password: string
) => Task<DataError, BackendUser>;

export type GetUserByIdService = (userId: string) => Task<DataError, User>;
