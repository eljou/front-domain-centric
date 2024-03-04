import { Task } from "data.task.ts";
import { GetUserByIdService } from "../auth-services";
import { DataError } from "../../../shared/domain/data-error";
import { User } from "../user";

export type UserByIdUseCase = ReturnType<typeof makeUserByIdUseCase>;

export function makeUserByIdUseCase(getUserById: GetUserByIdService) {
  return (userId: string): Task<DataError, User> => {
    return getUserById(userId);
  };
}
