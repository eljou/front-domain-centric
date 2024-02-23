import { Task } from "data.task.ts";
import { DataError } from "../../shared/domain/data-error";

import { Cart } from "./cart";

export interface CartRepository {
  get(): Task<DataError, Cart>;
  save(cart: Cart): Task<DataError, boolean>;
}
