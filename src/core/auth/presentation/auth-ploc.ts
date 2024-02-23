import { Ploc, makePloc } from "../../shared/presentation/ploc";
import { LoginUseCase } from "../domain/usecases/login";

export type AuthState =
  | { kind: "auth:out" }
  | { kind: "auth:in"; username: string }
  | { kind: "auth:loggin-in"; username: string }
  | { kind: "auth:error"; errorMsg: string };

export const authInitialState: AuthState = { kind: "auth:out" };

// ----

export type AuthPloc = Ploc<AuthState> & {
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
};

export function makeAuthPloc(loginUseCase: LoginUseCase): AuthPloc {
  const ploc = makePloc(authInitialState);

  return {
    ...ploc,
    login: async (username) => {
      ploc.changeState({ kind: "auth:loggin-in", username });
      await loginUseCase(username)
        .rejectMap((err) =>
          ploc.changeState({ kind: "auth:error", errorMsg: err.error.message })
        )
        .map(() => ploc.changeState({ kind: "auth:in", username }))
        .toPromise();
    },

    logout: async () => {
      ploc.changeState({ kind: "auth:out" });
    },
  };
}
