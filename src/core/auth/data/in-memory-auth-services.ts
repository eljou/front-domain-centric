import { Task } from "data.task.ts";
import { delay } from "../../shared/functions";
import { LoginService } from "../domain/auth-services";
import { DataError } from "../../shared/domain/data-error";

export const makeLoginService = (): LoginService => {
  return (email) =>
    Task.fromLazyPromise<DataError, void>(() => delay(500)).map(() => ({
      accessToken: "dummytoken",
      user: {
        id: "1",
        avatar: "http://avatar.com",
        clientAppIds: [],
        email,
        username: "Jhon",
      },
    }));
};
