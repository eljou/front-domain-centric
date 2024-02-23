import { makeLoginService } from "../../auth/data/in-memory-auth-services";
import { makeLoginUseCase } from "../../auth/domain/usecases/login";
import { AuthPloc, makeAuthPloc } from "../../auth/presentation/auth-ploc";
import { makeCartInMemoryRepository } from "../../cart/data/in-memory-cart-repo";
import { makeAddProductToCartUseCase } from "../../cart/domain/use-cases/add-product-to-cart";
import { makeEditQuantityOfCartItemUseCase } from "../../cart/domain/use-cases/edit-quantity-of-cart-item";
import { makeGetCartUseCase } from "../../cart/domain/use-cases/get-cart";
import { makeRemoveProductFromCartUseCase } from "../../cart/domain/use-cases/remove-product-from-cart";
import { CartPloc, makeCartPloc } from "../../cart/presentation/cart-ploc";
import { makeGetPostsByUser } from "../../posts/domain/usecases/get-posts-by-user";
import { makePostsRestRepository } from "../../posts/infrastructure/posts-rest-repository";
import {
  PostsPloc,
  makePostsPloc,
} from "../../posts/infrastructure/presentation/posts-ploc";
import { makeProductInMemoryRepository } from "../../product/data/in-memory-product-repo";
import { makeGetProductsUseCase } from "../../product/domain/use-cases/get-products";
import {
  ProductsPloc,
  makeProductsPloc,
} from "../../product/presentation/products-ploc";

function provideProductsPloc(): ProductsPloc {
  const productRepository = makeProductInMemoryRepository();
  const getProductsUseCase = makeGetProductsUseCase(productRepository);
  const productsPloc = makeProductsPloc(getProductsUseCase);

  return productsPloc;
}

function provideCartPloc(): CartPloc {
  const cartRepository = makeCartInMemoryRepository();
  const getCartUseCase = makeGetCartUseCase(cartRepository);
  const addProductToCartUseCase = makeAddProductToCartUseCase(cartRepository);
  const removeItemFromCartUseCase =
    makeRemoveProductFromCartUseCase(cartRepository);
  const editQuantityOfCartItemUseCase =
    makeEditQuantityOfCartItemUseCase(cartRepository);
  const cartPloc = makeCartPloc(
    getCartUseCase,
    addProductToCartUseCase,
    removeItemFromCartUseCase,
    editQuantityOfCartItemUseCase
  );

  return cartPloc;
}

function provideAuthPloc(): AuthPloc {
  const loginService = makeLoginService();
  const loginUseCase = makeLoginUseCase(loginService);
  const authPloc = makeAuthPloc(loginUseCase);

  return authPloc;
}

function providePostsPloc(): PostsPloc {
  const postsRepository = makePostsRestRepository();
  const getPostsByUser = makeGetPostsByUser(postsRepository);
  return makePostsPloc(getPostsByUser);
}

export const dependenciesLocator = {
  provideProductsPloc,
  provideCartPloc,
  provideAuthPloc,
  providePostsPloc,
};
