// import { makeLoginService } from "../../auth/data/in-memory-auth-services";
import {
  makeGetUserById,
  makeLogoutService,
  makeRestLoginService,
  makeRestRegisterService,
} from "../../auth/data/rest-auth-services";
import { makeUserByIdUseCase } from "../../auth/domain/usecases/get-user-by-id";
import { makeLoginUseCase } from "../../auth/domain/usecases/login";
import { makeLogoutUseCase } from "../../auth/domain/usecases/logout";
import { makeRegisterUseCase } from "../../auth/domain/usecases/register";
import { AuthPloc, makeAuthPloc } from "../../auth/presentation/auth-ploc";
import {
  RegistrationPloc,
  makeRegistrationPloc,
} from "../../auth/presentation/registration-ploc";
import { makeCartInMemoryRepository } from "../../cart/data/in-memory-cart-repo";
import { makeAddProductToCartUseCase } from "../../cart/domain/use-cases/add-product-to-cart";
import { makeEditQuantityOfCartItemUseCase } from "../../cart/domain/use-cases/edit-quantity-of-cart-item";
import { makeGetCartUseCase } from "../../cart/domain/use-cases/get-cart";
import { makeRemoveProductFromCartUseCase } from "../../cart/domain/use-cases/remove-product-from-cart";
import { CartPloc, makeCartPloc } from "../../cart/presentation/cart-ploc";
import { makeCreateApplication } from "../../client-apps/domain/usecases/create-application";
import { makeFetchUserAppsUseCase } from "../../client-apps/domain/usecases/fetch-user-apps";
import { makeUpdateApplication } from "../../client-apps/domain/usecases/update-application";
import { makeClientAppsRestRepository } from "../../client-apps/infrastructure/client-apps-rest-repository";
import {
  AppsPloc,
  makeAppsPloc,
} from "../../client-apps/infrastructure/presentation/apps-ploc";
// import { ClientAppsPloC } from "../../client-apps/infrastructure/presentation/client-apps-ploc";
import {
  UpdateAppPloC,
  makeUpdateAppPloc,
} from "../../client-apps/infrastructure/presentation/update-app-ploc";

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

function providePostsPloc(): PostsPloc {
  const postsRepository = makePostsRestRepository();
  const getPostsByUser = makeGetPostsByUser(postsRepository);
  return makePostsPloc(getPostsByUser);
}

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

const clientAppsRepo = makeClientAppsRestRepository();

function provideAuthPloc(): AuthPloc {
  const restLoginService = makeRestLoginService();

  const loginUseCase = makeLoginUseCase(restLoginService);
  const logoutUseCase = makeLogoutUseCase(makeLogoutService());
  const authPloc = makeAuthPloc(
    loginUseCase,
    logoutUseCase,
    makeUserByIdUseCase(makeGetUserById())
  );

  return authPloc;
}

function provideAppsPloc(): AppsPloc {
  return makeAppsPloc(
    makeCreateApplication(clientAppsRepo),
    makeFetchUserAppsUseCase(clientAppsRepo)
  );
}

function provideUpdateAppPloc(appsPloc: AppsPloc): UpdateAppPloC {
  return makeUpdateAppPloc(appsPloc, makeUpdateApplication(clientAppsRepo));
}

// function provideClientAppsPloc(): ClientAppsPloC {
//   return new ClientAppsPloC(makeFetchUserAppsUseCase(clientAppsRepo));
// }

function provideRegisterPLoc(): RegistrationPloc {
  return makeRegistrationPloc(makeRegisterUseCase(makeRestRegisterService()));
}

export const dependenciesLocator = {
  provideProductsPloc,
  provideCartPloc,
  providePostsPloc,
  provideAuthPloc,
  provideRegisterPLoc,
  provideAppsPloc,
  provideUpdateAppPloc,
  // provideClientAppsPloc,
};
