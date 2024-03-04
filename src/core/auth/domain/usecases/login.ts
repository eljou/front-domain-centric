import { Task } from "data.task.ts";
import { LoginService } from "../auth-services";
import { DataError } from "../../../shared/domain/data-error";
import { User } from "../user";

export type LoginUseCase = ReturnType<typeof makeLoginUseCase>;

export function makeLoginUseCase(loginService: LoginService) {
  return (
    email: string,
    password: string
  ): Task<DataError, { user: User; accessToken: string }> => {
    return loginService(email, password);
  };
}
