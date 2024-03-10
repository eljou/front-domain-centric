import { Task } from "data.task.ts";
import { LogoutService } from "../auth-services";
import { DataError } from "../../../shared/domain/data-error";

export type LogoutUseCase = ReturnType<typeof makeLogoutUseCase>;

export function makeLogoutUseCase(logoutService: LogoutService) {
  return (): Task<DataError, void> => {
    return logoutService();
  };
}
