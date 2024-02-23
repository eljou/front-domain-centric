import { PropsWithChildren } from "react";
import { AuthPloc, AuthState } from "../../core/auth/presentation/auth-ploc";
import { createContext } from "../shared/context";
import { dependenciesLocator } from "../../core/shared/dependecies";
import { usePlocState } from "../shared/use-ploc-state";

const [AuthContext, useContext] = createContext<
  Pick<AuthPloc, "login" | "logout"> & { state: AuthState }
>();

const authPloc = dependenciesLocator.provideAuthPloc();

function AuthProvider({ children }: PropsWithChildren) {
  const state = usePlocState(authPloc);

  return (
    <AuthContext.Provider
      value={{ login: authPloc.login, logout: authPloc.logout, state }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext();
}

export { useAuth, AuthProvider };
