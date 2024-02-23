import { Task } from "data.task.ts";
import { DataError } from "../../shared/domain/data-error";
import { Product } from "./product";

export interface ProductRepository {
  get(filter: string): Task<DataError, Product[]>;
}
