import { Task } from "data.task.ts";
import { restClient } from "../../shared/rest-client";
import { ClientAppsRepository } from "../domain/client-app-repository";
import { pipe, tap } from "ramda";
import { DataError } from "../../shared/domain/data-error";

export const makeClientAppsRestRepository = (): ClientAppsRepository => {
  return {
    create: (data) => {
      return Task.fromLazyPromise(() =>
        restClient.mutate("/client-app", {
          mode: "create",
          body: data,
        })
      )
        .chain((res) => Task.fromLazyPromise(() => res.json()))
        .map(pipe(tap((response) => console.log({ response }))))
        .rejectMap(
          (unk): DataError => ({ error: unk as Error, kind: "UnexpectedError" })
        );
    },

    getByUserId: () => {
      return Task.fromLazyPromise(() => restClient.query("/user/apps"))
        .chain((res) => Task.fromLazyPromise(() => res.json()))
        .map(pipe(tap((response) => console.log({ response }))))
        .rejectMap(
          (unk): DataError => ({ error: unk as Error, kind: "UnexpectedError" })
        );
    },

    updateById: (id, params) =>
      Task.fromLazyPromise(() =>
        restClient.mutate(`/client-app/${id}`, { mode: "update", body: params })
      )
        .chain((res) => Task.fromLazyPromise(() => res.json()))
        .map(pipe(tap((response) => console.log({ response }))))
        .rejectMap(
          (unk): DataError => ({ error: unk as Error, kind: "UnexpectedError" })
        ),
  };
};
