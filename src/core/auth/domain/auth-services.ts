import { Task } from "data.task.ts";
import { DataError } from "../../shared/domain/data-error";

export type LoginService = (username: string) => Task<DataError, void>;
