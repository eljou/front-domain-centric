import { Task } from "data.task.ts";
import { delay } from "../../shared/functions";
import { LoginService } from "../domain/auth-services";
import { DataError } from "../../shared/domain/data-error";

export const makeLoginService = (): LoginService => {
  return (username) =>
    Task.fromLazyPromise<DataError, void>(() => delay(500)).map(() =>
      console.log(`Logged in user: ${username}`)
    );
};
