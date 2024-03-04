import { Outlet, Route, Routes } from "react-router-dom";
import { AppBar } from "./appbar/app-bar";
import { AuthProvider } from "./auth/auth-provider";
import LoginPage from "./auth/login-page";
import RequireAuth from "./auth/require-auth";
import PostsPage from "./posts/posts-page";
import { CartProvider } from "./cart/cart-context";
import RegisterPage from "./auth/register-page";
import { ShoppingCart } from "./cart/shopping-cart";
import { HomePage } from "./HomePage";
import { ClientAppPage } from "./client-apps/client-app-page";

function Layout() {
  return (
    <CartProvider>
      <AppBar />
      <Outlet />
    </CartProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/app/:id" element={<ClientAppPage />} />
            <Route path="/products" element={<ShoppingCart />} />
            <Route path="/posts" element={<PostsPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
