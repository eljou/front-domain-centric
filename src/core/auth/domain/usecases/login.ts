import { Task } from "data.task.ts";
import { DataError } from "../../../shared/domain/data-error";
import { LoginService } from "../auth-services";

export type LoginUseCase = ReturnType<typeof makeLoginUseCase>;

export function makeLoginUseCase(loginService: LoginService) {
  return (username: string): Task<DataError, void> => {
    return loginService(username);
  };
}
