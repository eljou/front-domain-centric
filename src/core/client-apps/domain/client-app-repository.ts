import { Task } from "data.task.ts";
import { DataError } from "../../shared/domain/data-error";
import { ClientApp } from "./client-app";

export interface ClientAppsRepository {
  create(data: {
    name: string;
    description: string;
  }): Task<DataError, ClientApp>;
  getByUserId: (accessToken?: string) => Task<DataError, ClientApp[]>;
}
