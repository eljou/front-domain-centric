import { dependenciesLocator } from "../../core/shared/dependecies";
import { useZustandPlocState } from "../shared/use-zustand-ploc-state";
import { useAppsStore } from "./client-apps-store";

export const ploc = dependenciesLocator.provideAppsPloc();
export function useClientApps() {
  const state = useZustandPlocState(ploc, useAppsStore);
  const { createApp, setSelectedApp, fetchUserApps } = ploc;

  return { state, createApp, setSelectedApp, fetchUserApps };
}
