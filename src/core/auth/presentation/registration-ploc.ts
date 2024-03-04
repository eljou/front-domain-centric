import { Ploc, makePloc } from "../../shared/presentation/ploc";
import { User } from "../domain/user";
import { RegisterUseCase } from "../domain/usecases/register";

export type RegistrationState =
  | { kind: "registration:idle" }
  | { kind: "registration:loading" }
  | { kind: "registration:done"; user: User }
  | { kind: "registration:error"; errorMsg: string };

export const registrationInitialState: RegistrationState = {
  kind: "registration:idle",
};

// ----

export type RegistrationPloc = Ploc<RegistrationState> & {
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
};

export function makeRegistrationPloc(
  registerUserUseCase: RegisterUseCase
): RegistrationPloc {
  const ploc = makePloc(registrationInitialState);

  return {
    ...ploc,
    register: async (username, email, password) => {
      ploc.changeState({ kind: "registration:loading" });

      await registerUserUseCase(username, email, password)
        .map((user) => ploc.changeState({ kind: "registration:done", user }))
        .rejectMap((err) =>
          ploc.changeState({
            kind: "registration:error",
            errorMsg: err.error.message,
          })
        )
        .toPromise();
    },
  };
}
