import { Ploc, makePloc } from "../../shared/presentation/ploc";
import { User } from "../domain/user";
import { LoginUseCase } from "../domain/usecases/login";
import { Task } from "data.task.ts";
import { UserByIdUseCase } from "../domain/usecases/get-user-by-id";
import { LogoutUseCase } from "../domain/usecases/logout";
import { restClient } from "../../shared/rest-client";

export type AuthState =
  | { kind: "user:out" }
  | { kind: "user:loggin-in" }
  | { kind: "user:in"; user: User; accessToken: string }
  | { kind: "user:error"; errorMsg: string };

export const authInitialState: AuthState = { kind: "user:out" };

// ----
export type AuthPloc = Ploc<AuthState> & {
  setLoggedIn: (accessToken: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export function makeAuthPloc(
  loginUseCase: LoginUseCase,
  logoutUseCase: LogoutUseCase,
  getUserById: UserByIdUseCase
): AuthPloc {
  const ploc = makePloc(authInitialState);
  const extractUserFromToken = (token: string): User => {
    const obj = JSON.parse(atob(token.split(".")[1]));
    console.log("🚀 ~ extractUserFromToken ~ obj:", obj);

    return {
      id: obj.id,
      username: obj.username,
      email: obj.email,
      avatar: obj.avatar,
      clientAppIds: obj.clientAppIds,
    } as unknown as User;
  };

  return {
    ...ploc,

    setLoggedIn: async () => {
      try {
        const accessToken = await restClient.callRefresh();
        const user = extractUserFromToken(accessToken);

        await getUserById(user.id)
          .map((user) =>
            ploc.changeState({ kind: "user:in", user, accessToken })
          )
          .orElse((err) =>
            Task.of(
              ploc.changeState({
                kind: "user:error",
                errorMsg: err.error.message,
              })
            )
          )
          .toPromise();
      } catch (error) {
        console.log("user is not logged in");
        // ploc.changeState({ kind: "user:out" });
      }
    },

    login: async (email, password) => {
      ploc.changeState({ kind: "user:loggin-in" });
      await loginUseCase(email, password)
        .map((res) => {
          ploc.changeState({ kind: "user:in", ...res });
        })
        .orElse((err) =>
          Task.of(
            ploc.changeState({
              kind: "user:error",
              errorMsg: err.error.message,
            })
          )
        )
        .toPromise();
    },

    logout: async () => {
      await logoutUseCase()
        .map(() => ploc.changeState({ kind: "user:out" }))
        .orElse((err) =>
          Task.of(
            ploc.changeState({
              kind: "user:error",
              errorMsg: err.error.message,
            })
          )
        )
        .toPromise();
    },
  };
}
