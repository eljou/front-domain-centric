import { Task } from "data.task.ts";
import { ProductRepository } from "../product-repository";
import { DataError } from "../../../shared/domain/data-error";
import { Product } from "../product";

export type GetProductsUseCase = ReturnType<typeof makeGetProductsUseCase>;
export function makeGetProductsUseCase(productRepository: ProductRepository) {
  return (filter: string): Task<DataError, Product[]> =>
    productRepository.get(filter);
}
