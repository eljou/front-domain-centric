import { PropsWithChildren, useEffect, useMemo } from "react";
import { AuthPloc, AuthState } from "../../core/auth/presentation/auth-ploc";
import { dependenciesLocator } from "../../core/shared/dependecies";
import { createContext } from "../shared/context";
import { usePlocState } from "../shared/use-ploc-state";
import { restClient } from "../../core/shared/rest-client";

const [AuthContext, useContext] = createContext<
  Pick<AuthPloc, "login" | "logout"> & { state: AuthState }
>();

export function AuthProvider({ children }: PropsWithChildren) {
  const authPloc = useMemo(() => dependenciesLocator.provideAuthPloc(), []);
  const state = usePlocState(authPloc);

  useEffect(() => {
    if (state.kind == "user:out") {
      const token = localStorage.getItem("token");
      if (token) {
        restClient.setAuthroizationToken("Bearer", token);
        authPloc.setLoggedIn(token).then(() => {});
      }
    }

    if (state.kind == "user:error") {
      localStorage.removeItem("token");
      restClient.removeAuthorizationToken();
    }

    if (state.kind == "user:in") {
      localStorage.setItem("token", state.accessToken);
      restClient.setAuthroizationToken("Bearer", state.accessToken);
    }
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        login: authPloc.login,
        logout: () => {
          localStorage.removeItem("token");
          restClient.removeAuthorizationToken();
          return authPloc.logout();
        },
        state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = useContext;
