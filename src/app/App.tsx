import { AppBar } from "./appbar/app-bar";
import CartDrawer from "./cart/cart-drawer";
import ProductList from "./products/product-list";
import { Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/auth-provider";
import LoginPage from "./auth/login-page";
import RequireAuth from "./auth/require-auth";
import PostsPage from "./posts/posts-page";
import { PostsProvider } from "./posts/posts-context";
import { CartProvider } from "./cart/cart-context";

function ShoppingCart() {
  return (
    <main className="mx-auto my-0 w-5/6">
      <CartDrawer>
        <div>
          <ProductList />
        </div>
      </CartDrawer>
    </main>
  );
}

function Layout() {
  return (
    <CartProvider>
      <AppBar />
      <Outlet />
    </CartProvider>
  );
}

function PublicPage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/products" element={<ShoppingCart />} />
            <Route
              path="/posts"
              element={
                <PostsProvider>
                  <PostsPage />
                </PostsProvider>
              }
            />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
