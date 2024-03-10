import { Task } from "data.task.ts";
import {
  GetUserByIdService,
  LoginService,
  LogoutService,
  RegisterService,
} from "../domain/auth-services";
import { DataError } from "../../shared/domain/data-error";
import { restClient } from "../../shared/rest-client";
import { User } from "../domain/user";

export const makeLogoutService = (): LogoutService => {
  return () =>
    Task.fromLazyPromise(() => {
      return restClient
        .mutate("/user/logout", {
          mode: "create",
          body: {},
        })
        .then(() => {});
    }).rejectMap(
      (unk): DataError => ({ error: unk as Error, kind: "UnexpectedError" })
    );
};

export const makeRestLoginService = (): LoginService => {
  return (email, password) => {
    return Task.fromLazyPromise(async () => {
      const response = await restClient.mutate("/user/login", {
        mode: "create",
        body: { email, password },
      });
      const accessToken = response.headers.get("authorization");
      if (!accessToken)
        throw new Error("No access token supplied from backend");

      const user = (await response.json()) as User;
      return { user, accessToken };
    }).rejectMap(
      (unk): DataError => ({ error: unk as Error, kind: "UnexpectedError" })
    );
  };
};

export const makeRestRegisterService = (): RegisterService => {
  return (username, email, password) => {
    return Task.fromLazyPromise(() =>
      restClient
        .mutate("/user/register", {
          mode: "create",
          body: { username, email, password },
        })
        .then((res) => res.json())
    ).rejectMap(
      (unk): DataError => ({ error: unk as Error, kind: "UnexpectedError" })
    );
  };
};

export const makeGetUserById = (): GetUserByIdService => {
  return (userId) => {
    return Task.fromLazyPromise(() =>
      restClient.query("/user").then((res) => res.json())
    )
      .chain(
        (user): Task<Error, User> =>
          user.id != userId
            ? Task.rejected(new Error("Invalid userId"))
            : Task.of(user)
      )
      .rejectMap(
        (unk): DataError => ({ error: unk as Error, kind: "UnexpectedError" })
      );
  };
};
