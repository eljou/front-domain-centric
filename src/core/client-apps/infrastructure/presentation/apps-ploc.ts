import { DataError } from "../../../shared/domain/data-error";
import { Ploc, makePloc } from "../../../shared/presentation/ploc";
import { ClientApp } from "../../domain/client-app";
import { CreateApplication } from "../../domain/usecases/create-application";
import { FetchUserAppsUseCase } from "../../domain/usecases/fetch-user-apps";

export type AppsState =
  | { kind: "app:idle" }
  | { kind: "app:loading" }
  | { kind: "app:error"; errorMsg: string }
  | {
      kind: "app:success" | "app:reloading";
      apps: ClientApp[];
      selectedApp: string | null;
    };

export const appsInitialState: AppsState = { kind: "app:idle" };

export type AppsPloc = Ploc<AppsState> & {
  createApp: (data: { name: string; description?: string }) => Promise<void>;
  fetchUserApps: () => Promise<void>;
  setSelectedApp: (appId: string) => Promise<void>;
};

export function makeAppsPloc(
  createApp: CreateApplication,
  fetchUserAppsUseCase: FetchUserAppsUseCase
): AppsPloc {
  const ploc = makePloc(appsInitialState);
  console.log("🚀 ~ client apps ploc:", ploc.state());

  return {
    ...ploc,
    createApp: async (data) => {
      const state = ploc.state();

      if (state.kind == "app:success")
        ploc.changeState({ ...state, kind: "app:reloading" });
      else ploc.changeState({ kind: "app:loading" });

      await createApp(data)
        .toPromise()
        .then((clientApp) => {
          const newState = ploc.state();

          if (newState.kind == "app:loading")
            return ploc.changeState({
              kind: "app:success",
              apps: [clientApp],
              selectedApp: null,
            });

          if (newState.kind == "app:reloading")
            return ploc.changeState({
              kind: "app:success",
              apps: [...newState.apps, clientApp],
              selectedApp: newState.selectedApp,
            });
        })
        .catch((err) =>
          ploc.changeState({
            kind: "app:error",
            errorMsg: (err as DataError).error.message,
          })
        );
    },

    fetchUserApps: async () => {
      ploc.changeState({ kind: "app:loading" });
      await fetchUserAppsUseCase()
        .toPromise()
        .then((apps) => {
          ploc.changeState({ kind: "app:success", apps, selectedApp: null });
        })
        .catch((err) =>
          ploc.changeState({
            kind: "app:error",
            errorMsg: (err as DataError).error.message,
          })
        );
    },

    setSelectedApp: async (id) => {
      const state = ploc.state();
      if (state.kind == "app:success") {
        ploc.changeState({ ...state, selectedApp: id });
      }
    },
  };
}
