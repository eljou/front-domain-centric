import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import {
  AppsState,
  appsInitialState,
} from "../../core/client-apps/infrastructure/presentation/apps-ploc";

type AppStore = {
  state: AppsState;
  setState: (newState: AppsState) => void;
};

export const useAppsStore = create<AppStore, [["zustand/devtools", never]]>(
  devtools(
    (set) => ({
      state: appsInitialState,
      setState: (newState) => set((st) => ({ ...st, state: newState })),
    }),
    { name: "Apps" }
  )
);
