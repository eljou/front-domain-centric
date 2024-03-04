import { Task } from "data.task.ts";
import { DataError } from "../../../shared/domain/data-error";
import { ClientAppsRepository } from "../../../client-apps/domain/client-app-repository";
import { ClientApp } from "../client-app";

export type FetchUserAppsUseCase = ReturnType<typeof makeFetchUserAppsUseCase>;

export function makeFetchUserAppsUseCase(clientAppsRepo: ClientAppsRepository) {
  return (): Task<DataError, ClientApp[]> => {
    return clientAppsRepo.getByUserId();
  };
}
