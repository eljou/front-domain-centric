import { useAuth } from "../auth/auth-provider";
import { useClientApps } from "./use-client-apps";

export function useSelectedClientApp() {
  const auth = useAuth();
  const clientApps = useClientApps();

  if (auth.state.kind != "user:in") return null;
  if (clientApps.state.kind != "app:success") return null;
  const clientAppState = clientApps.state;
  return clientAppState.apps.find((xs) => xs.id === clientAppState.selectedApp);
}
