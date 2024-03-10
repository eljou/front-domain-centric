import { Task } from "data.task.ts";
import { Ploc, makePloc } from "../../../shared/presentation/ploc";
import { ClientApp } from "../../domain/client-app";
import { UpdateApplicationUseCase } from "../../domain/usecases/update-application";
import { AppsPloc } from "./apps-ploc";

function enhance<A, B>(a: A, withB: (a: A) => B): A & B {
  return { ...a, ...withB(a) };
}

type UpdateAppState =
  | { kind: "app:update:idle" }
  | { kind: "app:update:updating" }
  | { kind: "app:update:done"; updatedApp: ClientApp }
  | { kind: "app:update:failed"; errorMsg: string };

type PloCFunctions = {
  updateApp: (
    id: string,
    params: { name: string; description: string }
  ) => Promise<void>;
};

export type UpdateAppPloC = ReturnType<typeof makeUpdateAppPloc>;

export const makeUpdateAppPloc = (
  appsPloC: AppsPloc,
  updateApp: UpdateApplicationUseCase
) =>
  enhance<Ploc<UpdateAppState>, PloCFunctions>(
    makePloc<UpdateAppState>({ kind: "app:update:idle" }),
    (ploc) => {
      ploc.subscribe((state) => {
        const appsState = appsPloC.state();
        if (
          appsState.kind == "app:success" &&
          state.kind == "app:update:done"
        ) {
          appsPloC.changeState({
            ...appsState,
            apps: appsState.apps.map((a) =>
              a.id == state.updatedApp.id ? state.updatedApp : a
            ),
          });
        }
      });

      return {
        updateApp: async (id, params) => {
          ploc.changeState({ kind: "app:update:updating" });
          return updateApp({ id, ...params })
            .map((updatedApp) =>
              ploc.changeState({ kind: "app:update:done", updatedApp })
            )
            .orElse((err) =>
              Task.of(
                ploc.changeState({
                  kind: "app:update:failed",
                  errorMsg: err.error.message,
                })
              )
            )
            .toPromise();
        },
      };
    }
  );
